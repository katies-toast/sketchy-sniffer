import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const steps = [
  {
    number: "1",
    title: "Paste a listing link",
    description:
      "Copy the URL of a Kijiji listing you're interested in and paste it into SketchySniffer.",
  },
  {
    number: "2",
    title: "We sniff it out",
    description:
      "Our system scrapes the listing and runs it through two layers of detection, including instant rule checks and AI-powered analysis.",
  },
  {
    number: "3",
    title: "Review the results",
    description:
      "You get a risk score, a breakdown of red flags, and a short quiz to help you think critically about the listing.",
  },
];

const redFlagCategories = [
  {
    title: "Price red flags",
    items: [
      "Price significantly below market value for the item",
      "Unrealistically large price drops (e.g. $850 → $400)",
    ],
  },
  {
    title: "Description red flags",
    items: [
      "Pressure language like \"must sell today\" or \"act fast\"",
      "Requests to communicate off-platform (WhatsApp, Telegram, email)",
      "Requests for deposits or payment before meeting",
      "Unusual payment methods like gift cards, crypto, or wire transfers",
      "Vague descriptions that lack real details about the item",
      "Title and description that don't match",
    ],
  },
  {
    title: "Seller red flags",
    items: [
      "Brand new accounts with only 1 or 2 listings",
    ],
  },
  {
    title: "Image red flags",
    items: [
      "No photos at all",
      "Only a single photo for a high-value item",
      "Stock or manufacturer photos instead of real ones",
    ],
  },
  {
    title: "Payment & listing red flags",
    items: [
      "Cash not accepted for in-person sales",
      "Very short listing duration (creating fake urgency)",
      "Paid promotion on suspiciously cheap items",
    ],
  },
];

const biases = [
  {
    name: "Scarcity",
    example: "\"Only one left!\" or \"Rare find\"",
    question: "Is it truly rare, or is the seller creating artificial scarcity?",
  },
  {
    name: "Urgency",
    example: "\"Must sell today\" or \"Moving tomorrow\"",
    question: "Why does it need to happen so quickly? Would a real seller pressure you?",
  },
  {
    name: "Anchoring",
    example: "A big price drop shown front and centre",
    question: "Is the current price actually fair, or does it just look good next to the \"original\"?",
  },
  {
    name: "Authority",
    example: "Overly professional language or brand-name dropping",
    question: "Does polished language make you trust this seller more than you should?",
  },
  {
    name: "Loss aversion",
    example: "\"Someone else is interested\" or \"Don't miss out\"",
    question: "What would you actually lose by waiting to verify?",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-10 px-4 py-10 md:py-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            How it Works
          </h1>
          <p className="mx-auto mt-3 max-w-md font-body text-base text-muted-foreground">
            SketchySniffer helps you spot red flags in marketplace listings before you meet up with a stranger.
          </p>
        </div>

        {/* Steps */}
        <Card className="sketchy-border space-y-6 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Three simple steps
          </h2>
          <div className="space-y-5">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-primary font-heading text-lg font-bold text-primary-foreground">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-body text-sm text-foreground/80">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Two layers */}
        <Card className="sketchy-border space-y-5 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Two layers of detection
          </h2>
          <div className="space-y-4">
            <div className="rounded-md border-2 border-foreground/20 p-4">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Layer 1: Instant checks
              </h3>
              <p className="mt-1 font-body text-sm text-foreground/80">
                The moment you submit a link, we run a set of rules against the listing data. Things like "does it have photos?", "is the seller brand new?", or "does the description mention gift cards?" These have clear yes or no answers, so we check them instantly.
              </p>
            </div>
            <div className="rounded-md border-2 border-foreground/20 p-4">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Layer 2: AI analysis
              </h3>
              <p className="mt-1 font-body text-sm text-foreground/80">
                Next, an AI model reviews the full listing with context. It handles the judgment calls that rules can't, like whether the price is actually fair for that type of item, whether the description feels vague or suspicious, or whether the overall deal seems too good to be true.
              </p>
            </div>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            By combining both approaches, we get the speed and reliability of hard rules with the nuance of AI.
          </p>
        </Card>

        {/* What we look for */}
        <Card className="sketchy-border space-y-5 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            What we look for
          </h2>
          <p className="font-body text-sm text-foreground/80">
            We check for 17+ red flags across five categories. Here are some of them:
          </p>
          <div className="space-y-4">
            {redFlagCategories.map((cat) => (
              <div key={cat.title}>
                <h3 className="font-heading text-base font-bold text-secondary">
                  {cat.title}
                </h3>
                <ul className="mt-1.5 list-inside list-disc space-y-1 font-body text-sm text-foreground/80">
                  {cat.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        {/* Cognitive biases */}
        <Card className="sketchy-border space-y-5 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Psychological tricks we flag
          </h2>
          <p className="font-body text-sm text-foreground/80">
            Scammers don't just lie, they also exploit how your brain works. We flag common psychological tricks so you can recognize when you're being nudged.
          </p>
          <div className="space-y-4">
            {biases.map((bias) => (
              <div key={bias.name} className="rounded-md border-2 border-foreground/20 p-4">
                <h3 className="font-heading text-base font-bold text-foreground">
                  {bias.name}
                </h3>
                <p className="mt-1 font-body text-sm italic text-foreground/60">
                  {bias.example}
                </p>
                <p className="mt-1.5 font-body text-sm text-foreground/80">
                  {bias.question}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Risk score */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            The risk score
          </h2>
          <p className="font-body text-sm text-foreground/80">
            Every listing gets a score from 0 to 100 based on the red flags we find. More severe flags weigh more heavily.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-primary" />
              <span className="font-body text-sm text-foreground/80">
                <span className="font-bold">0 to 33, Low risk.</span> No major red flags. Proceed with normal caution.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-[hsl(45,100%,65%)]" />
              <span className="font-body text-sm text-foreground/80">
                <span className="font-bold">34 to 66, Moderate risk.</span> Some concerning signals. Verify before committing.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-full bg-destructive" />
              <span className="font-body text-sm text-foreground/80">
                <span className="font-bold">67 to 100, High risk.</span> Multiple red flags. We'd recommend walking away.
              </span>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <Card className="sketchy-border space-y-3 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            We don't decide for you
          </h2>
          <p className="font-body text-sm text-foreground/80">
            SketchySniffer is a tool to help you think more critically about listings, not a guarantee. We surface the signals, but the final call is always yours. Trust your gut, do your research, and stay safe out there.
          </p>
        </Card>

        {/* CTA */}
        <Link to="/" className="block">
          <Button
            className="tactile-btn w-full py-6 font-heading text-lg font-bold uppercase tracking-wide"
            size="lg"
          >
            👃 Try it out
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default HowItWorks;
