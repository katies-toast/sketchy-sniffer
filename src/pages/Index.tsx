import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ScoreRadialChart from "@/components/ScoreRadialChart";
import RedFlagAccordion from "@/components/RedFlagAccordion";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";
import { analyzeUrl } from "@/lib/api";
import type { AnalysisResponse } from "@/types/analysis";
import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";

function isValidUrl(text: string): boolean {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const riskLabelMap: Record<string, string> = {
  low: "Low risk",
  medium: "Moderate risk",
  high: "High risk",
};

const riskColorMap: Record<string, string> = {
  low: "text-primary",
  medium: "text-[hsl(45,100%,40%)]",
  high: "text-destructive",
};

const riskStrokeMap: Record<string, string> = {
  low: "hsl(var(--primary))",
  medium: "hsl(45,100%,40%)",
  high: "hsl(var(--destructive))",
};

const Index = () => {
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");

  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [decision, setDecision] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      setApiError(null);
      setDecision(null);
      return;
    }

    let cancelled = false;

    const fetchAnalysis = async () => {
      setLoading(true);
      setApiError(null);
      setData(null);
      setDecision(null);
      try {
        const result = await analyzeUrl(url);
        console.log("API response:", JSON.stringify(result, null, 2));
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) setApiError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAnalysis();
    return () => { cancelled = true; };
  }, [url]);

  const handleSniff = () => {
    const trimmed = link.trim();

    if (!trimmed) {
      setError("Please enter a listing link to sniff.");
      return;
    }

    if (!isValidUrl(trimmed)) {
      setError("That doesn't look like a valid link. Please enter a full URL.");
      return;
    }

    setError(null);
    navigate(`/?url=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSniff();
    }
  };

  // Welcome / input view
  if (!url) {
    return (
      <div className="min-h-screen bg-background paper-texture">
        <Navbar />

        <main className="container mx-auto flex flex-col items-center px-4 py-16 md:py-24">
          {/* Hero */}
          <div className="mb-10 text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Sniff out scams<br />
              <span className="text-primary">before you meet up.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md font-body text-base text-muted-foreground md:text-lg">
              Paste a Kijiji listing link and we'll sniff it for sketchiness.
            </p>
          </div>

          {/* Input area */}
          <div className="w-full max-w-xl space-y-4">
            <div className="sketchy-border overflow-hidden bg-card">
              <input
                type="text"
                value={link}
                onChange={(e) => { setLink(e.target.value); setError(null); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSniff(); } }}
                placeholder="Paste a Kijiji listing link here…"
                className="w-full bg-transparent px-5 py-4 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none md:text-lg"
              />
            </div>

            {error && (
              <p className="text-center font-body text-sm text-secondary">{error}</p>
            )}

            <Button
              onClick={handleSniff}
              className="tactile-btn w-full py-6 font-heading text-lg font-bold uppercase tracking-wide"
              size="lg"
            >
              👃 Sniff it
            </Button>

            <p className="text-center font-body text-xs text-muted-foreground">
              We don't make decisions for you. We help you think through them.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Loading view
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

  // Error view
  if (apiError || !data) {
    return (
      <div className="min-h-screen bg-background paper-texture">
        <Navbar />
        <main className="container mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-20 text-center">
          <p className="font-heading text-4xl">(´•︵•`)</p>
          <p className="font-heading text-xl font-bold text-foreground">Something went wrong</p>
          <p className="font-body text-sm text-muted-foreground">{apiError || "No data returned."}</p>
          <Button onClick={() => navigate("/")} className="tactile-btn font-heading font-bold uppercase tracking-wide">
            👃 Try again
          </Button>
        </main>
      </div>
    );
  }

  // Results view
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-8 px-4 py-10 md:py-14">
        {/* Score Card */}
        {data.risk && (
          <Card className="sketchy-border grid grid-cols-1 gap-4 bg-card p-4 md:grid-cols-[1fr_auto] md:p-6">
            {/* Left — Score + Risk Summary */}
            <div className="flex flex-col items-center gap-4 rounded-md border border-border bg-background/50 p-4">
              <div className="flex-shrink-0">
                <ScoreRadialChart score={data.risk.score ?? 0} color={riskStrokeMap[data.risk.level]} />
              </div>
              <div className="text-center">
                <h2 className={`font-heading text-2xl font-bold ${riskColorMap[data.risk.level] || "text-secondary"}`}>
                  {riskLabelMap[data.risk.level] || data.risk.level}
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-foreground/80">
                  {data.risk.summary}
                </p>
              </div>
            </div>

            {/* Right — Listing Info */}
            <div className="flex flex-col gap-4 md:w-64">
              {/* Title + Price */}
              <div className="rounded-md border border-border bg-background/50 p-4">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {data.listing?.title}
                </h3>
                {data.listing?.price && (
                  <p className="mt-1 font-heading text-xl font-bold text-primary">
                    ${data.listing.price.amount.toLocaleString()} {data.listing.price.currency}
                  </p>
                )}
              </div>

              {/* Description (scrollable, fixed height) */}
              <div className="max-h-48 overflow-y-auto rounded-md border border-border bg-background/50 p-4">
                <h4 className="font-heading text-lg font-bold text-foreground pb-1">Description</h4>
                <p className="font-body text-sm leading-relaxed text-foreground/80">
                  {data.listing?.description}
                </p>
              </div>
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

export default Index;
