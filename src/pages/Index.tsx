import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

function isValidUrl(text: string): boolean {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const Index = () => {
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    navigate("/result", { state: { url: trimmed } });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSniff();
    }
  };

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
            <textarea
              value={link}
              onChange={(e) => { setLink(e.target.value); setError(null); }}
              onKeyDown={handleKeyDown}
              placeholder="Paste a Kijiji listing link here…"
              className="w-full resize-none bg-transparent px-5 py-4 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none md:text-lg"
              rows={1}
            />
          </div>

          {error && (
            <p className="text-center font-body text-sm text-secondary">{error}</p>
          )}

          <Button
            onClick={handleSniff}
            className="sniff-pulse sketchy-border w-full py-6 font-heading text-lg font-bold"
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
};

export default Index;
