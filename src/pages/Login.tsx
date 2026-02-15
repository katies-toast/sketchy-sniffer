import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const upcomingFeatures = [
  {
    title: "Your own account",
    description:
      "Create a profile to save your activity and pick up right where you left off.",
  },
  {
    title: "Listing history",
    description:
      "Keep a record of every listing you've sniffed so you can revisit results and track what you've looked at over time.",
  },
  {
    title: "Personalized insights",
    description:
      "Over time, we'll identify the patterns you tend to fall for and surface insights tailored to your habits and blind spots.",
  },
  {
    title: "Learning that fits you",
    description:
      "Get quizzes, tips, and prompts shaped around your personality and the types of scams you're most likely to encounter.",
  },
];

const Login = () => {
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-10 px-4 py-10 md:py-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Coming Soon
          </h1>
          <p className="mx-auto mt-3 max-w-md font-body text-base text-muted-foreground">
            We're building something exciting. Accounts and personalized features are on the way.
          </p>
        </div>

        {/* What's coming */}
        <Card className="sketchy-border space-y-5 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            What we're working on
          </h2>
          <div className="space-y-4">
            {upcomingFeatures.map((feature) => (
              <div key={feature.title} className="rounded-md border-2 border-foreground/20 p-4">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-1 font-body text-sm text-foreground/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* In the meantime */}
        <Card className="sketchy-border space-y-3 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            In the meantime
          </h2>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            You can still use SketchySniffer right now without an account. Paste any Kijiji listing and get a full analysis, complete with red flags, a risk score, and a quiz to sharpen your instincts.
          </p>
        </Card>

        {/* CTA */}
        <Link to="/" className="block">
          <Button
            className="tactile-btn w-full py-6 font-heading text-lg font-bold uppercase tracking-wide"
            size="lg"
          >
            👃 Sniff a listing
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default Login;
