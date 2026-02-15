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
  const url = new URLSearchParams(location.search).get("url");

  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decision, setDecision] = useState<string | null>(null);

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
        console.log("API response:", JSON.stringify(result, null, 2));
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
            <Mirage size="300" speed="2.5" color="hsl(var(--primary))" />
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
          <Button onClick={() => navigate("/")} className="tactile-btn font-heading font-bold uppercase tracking-wide">
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
        {data.risk && (
          <Card className="sketchy-border flex flex-col items-center gap-6 bg-card p-6 md:flex-row md:items-start md:gap-8">
            <div className="relative flex-shrink-0">
              <ScoreRadialChart score={data.risk.score ?? 0} />
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
        )}

        {/* Findings */}
        {data.findings?.length > 0 && (
          <RedFlagAccordion flags={data.findings} />
        )}

        {/* Quiz */}
        {data.quiz?.questions?.length > 0 && (
          <MultipleChoiceQuiz questions={data.quiz.questions} />
        )}

        {/* Decision Card */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            After review… what do you want to do?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className={`tactile-btn flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-wide ${decision === "proceed" ? "bg-primary text-primary-foreground" : "bg-transparent text-primary"}`}
              onClick={() => setDecision("proceed")}
            >
              Proceed carefully
            </button>
            <button
              className={`tactile-btn flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-wide ${decision === "ask" ? "bg-[hsl(200,60%,45%)] text-white" : "bg-transparent text-[hsl(200,60%,45%)]"}`}
              onClick={() => setDecision("ask")}
            >
              Ask seller questions
            </button>
            <button
              className={`tactile-btn flex-1 rounded-md px-4 py-2.5 text-sm font-bold uppercase tracking-wide ${decision === "avoid" ? "bg-destructive text-destructive-foreground" : "bg-transparent text-destructive"}`}
              onClick={() => setDecision("avoid")}
            >
              Avoid this listing
            </button>
          </div>
          {decision && (
            <p className="text-center font-body text-sm text-muted-foreground">
              Trust your judgement. You've done your research.
            </p>
          )}
        </Card>

        {/* Sniff Again */}
        <Button
          onClick={() => navigate("/")}
          className="tactile-btn w-full py-6 font-heading text-lg font-bold uppercase tracking-wide"
          size="lg"
        >
          👃 Sniff another?
        </Button>
      </main>
    </div>
  );
};

export default Result;
