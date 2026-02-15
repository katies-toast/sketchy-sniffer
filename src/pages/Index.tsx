import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleSniff = () => {
    if (!link.trim()) return;
    navigate("/result", { state: { url: link.trim() } });
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
            Paste a marketplace listing link and we'll score it for sketchiness — plus explain the red flags.
          </p>
        </div>

        {/* Input area */}
        <div className="w-full max-w-xl space-y-4">
          <div className="sketchy-border overflow-hidden bg-card">
            <textarea
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste a Kijiji or Marketplace listing link…"
              className="w-full resize-none bg-transparent px-5 py-4 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none md:text-lg"
              rows={3}
            />
          </div>

          <Button
            onClick={handleSniff}
            className="sniff-pulse sketchy-border w-full py-6 font-heading text-lg font-bold"
            size="lg"
          >
            👃 Sniff it
          </Button>

          <p className="text-center font-body text-xs text-muted-foreground">
            We don't store your link. This is just a quick safety check.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
