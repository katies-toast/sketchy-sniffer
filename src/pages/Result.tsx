import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ScoreRadialChart from "@/components/ScoreRadialChart";
import RedFlagAccordion from "@/components/RedFlagAccordion";
import ReflectionPrompts from "@/components/ReflectionPrompts";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";
import { analyzeUrl } from "@/lib/api";
import type { AnalysisResponse } from "@/types/analysis";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";

const riskLabelMap: Record<string, string> = {
  low: "Low risk",
  medium: "Moderate risk",
  high: "High risk",
};

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = (location.state as { url?: string })?.url;

  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      navigate("/");
      return;
    }

    let cancelled = false;

    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await analyzeUrl(url);
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAnalysis();
    return () => { cancelled = true; };
  }, [url, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background paper-texture">
        <Navbar />
        <main className="container mx-auto flex max-w-2xl flex-col items-center px-4 py-20">
          <div className="space-y-4 text-center">
            <Mirage size="60" speed="2.5" color="black" />
            <p className="font-heading text-xl font-bold text-foreground">Sniffing…</p>
            <p className="font-body text-sm text-muted-foreground">Analyzing the listing for red flags and sketchy patterns.</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background paper-texture">
        <Navbar />
        <main className="container mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-20 text-center">
          <p className="font-heading text-4xl">(´•︵•`)</p>
          <p className="font-heading text-xl font-bold text-foreground">Something went wrong</p>
          <p className="font-body text-sm text-muted-foreground">{error || "No data returned."}</p>
          <Button onClick={() => navigate("/")} className="sketchy-border font-heading font-bold">
            👃 Try again
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-8 px-4 py-10 md:py-14">
        {/* Score Card */}
        <Card className="sketchy-border flex flex-col items-center gap-6 bg-card p-6 md:flex-row md:items-start md:gap-8">
          <div className="relative flex-shrink-0">
            <ScoreRadialChart score={data.risk.score} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-heading text-2xl font-bold text-secondary">
              {riskLabelMap[data.risk.level] || data.risk.level}
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground/80">
              {data.risk.summary}
            </p>
          </div>
        </Card>

        {/* Findings */}
        <RedFlagAccordion flags={data.findings} />

        {/* Reflection Prompts */}
        {/* <ReflectionPrompts prompts={data.reflection_prompts} /> */}

        {/* Quiz */}
        {data.quiz.questions.length > 0 && (
          <MultipleChoiceQuiz questions={data.quiz.questions} />
        )}

        {/* Decision Card */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            After review… what do you want to do?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="sketchy-border-light flex-1 font-heading font-bold">
              Proceed carefully
            </Button>
            <Button variant="outline" className="sketchy-border-light flex-1 font-heading font-bold">
              Ask seller questions
            </Button>
            <Button variant="destructive" className="sketchy-border-light flex-1 font-heading font-bold">
              Avoid this listing
            </Button>
          </div>
        </Card>

        {/* Sniff Again */}
        <Button
          onClick={() => navigate("/")}
          className="sniff-pulse sketchy-border w-full py-6 font-heading text-lg font-bold"
          size="lg"
        >
          👃 Sniff again
        </Button>
      </main>
    </div>
  );
};

export default Result;
