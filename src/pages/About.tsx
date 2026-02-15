import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-10 px-4 py-10 md:py-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            About SketchySniffer
          </h1>
          <p className="mx-auto mt-3 max-w-md font-body text-base text-muted-foreground">
            We built this tool because buying from strangers online shouldn't feel like a gamble.
          </p>
        </div>

        {/* The problem */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            The problem
          </h2>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            Online marketplaces like Kijiji and Facebook Marketplace are full of great deals, but they're also full of scammers. The excitement of finding a bargain can override your caution, and in the rush to secure it, you might overlook red flags or ignore the feeling that something is "too good to be true."
          </p>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            That split-second decision to send a deposit or meet up with a stranger can put you at real financial or physical risk. And most people don't have a reliable way to pause, check, and think it through.
          </p>
        </Card>

        {/* Our mission */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Our mission
          </h2>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            SketchySniffer is an AI-powered decision reflection tool for online marketplace interactions. We analyze listings for common scam patterns, flag the psychological tricks being used against you, and give you the information you need to make a clear-headed choice.
          </p>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            But we don't stop at detection. After showing you what we found, we walk you through a short set of questions based on the red flags in your listing. The goal is to help you build the habit of thinking critically about deals, not just on our platform, but everywhere.
          </p>
        </Card>

        {/* Why this matters */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Why this matters
          </h2>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            AI is rapidly becoming embedded in our daily lives. Most tools use it to think for you, to automate decisions and remove you from the process. We think that's backwards.
          </p>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            Instead of replacing critical thinking, we use AI to support it. You stay in control, but now with awareness. You learn to recognize red flags, understand emotional triggers, and pause before acting on impulse.
          </p>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            Our goal is not automation of judgment, but cultivation of it.
          </p>
        </Card>

        {/* What you get */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            What you get
          </h2>
          <ul className="list-inside list-disc space-y-2 font-body text-sm text-foreground/80">
            <li>A risk score that tells you how sketchy a listing looks at a glance</li>
            <li>Clear explanations of the specific red flags we detected</li>
            <li>Insight into the cognitive biases a listing may be triggering</li>
            <li>A short quiz to reinforce what you've learned</li>
            <li>A moment to decide what you actually want to do, on your terms</li>
          </ul>
        </Card>

        {/* Closing */}
        <Card className="sketchy-border space-y-3 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            The final call is always yours
          </h2>
          <p className="font-body text-sm leading-relaxed text-foreground/80">
            We don't make decisions for you. We help you think through them. A tool like this doesn't exist in the current market, and we think it should.
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

export default About;
