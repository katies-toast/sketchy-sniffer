import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import ScoreRadialChart from "@/components/ScoreRadialChart";
import RedFlagAccordion from "@/components/RedFlagAccordion";
import TrueFalseQuiz from "@/components/TrueFalseQuiz";

const mockData = {
  score: 72,
  riskLabel: "Moderate risk",
  summary:
    "This listing has several characteristics commonly associated with scam posts. The price is suspiciously low for the item described, and the seller's account shows signs of being recently created with no prior activity.",
  redFlags: [
    {
      title: "Too-good-to-be-true price",
      summary: "The listed price is 60% below market average.",
      explanation:
        "When a price is dramatically below what similar items sell for, it's often a tactic to lure buyers quickly. Legitimate sellers typically price within a reasonable range of market value. Always compare with other listings before committing.",
    },
    {
      title: "New seller account",
      summary: "The account was created less than a week ago.",
      explanation:
        "Scammers frequently create new accounts to avoid being tracked. While new accounts aren't always suspicious, combined with other red flags it raises concern. Check if the seller has any reviews or history.",
    },
    {
      title: "Vague item description",
      summary: "The listing lacks specific details about the item.",
      explanation:
        "Legitimate sellers usually provide detailed descriptions including brand, model, condition, and reason for selling. Vague listings can hide defects or indicate the seller doesn't actually possess the item.",
    },
    {
      title: "Stock photos used",
      summary: "Images appear to be taken from the internet.",
      explanation:
        "If the photos look too professional or appear on other websites, the seller may not actually have the item. Ask for photos with a specific detail (like a note with today's date) to verify authenticity.",
    },
    {
      title: "Pressure to act fast",
      summary: 'Listing uses urgency language like "must go today."',
      explanation:
        "Creating artificial urgency is a classic pressure tactic. Real sellers are usually flexible on timing. If someone insists you must decide immediately, it's often to prevent you from doing your due diligence.",
    },
  ],
  quizQuestions: [
    {
      question: "A listing price 60% below market value is always a great deal.",
      correctAnswer: false,
      explanation: "Prices far below market value are a common scam tactic to attract victims quickly.",
    },
    {
      question: "You should ask to meet in a public place for any marketplace transaction.",
      correctAnswer: true,
      explanation: "Public places with cameras (like police station parking lots) are the safest choice.",
    },
    {
      question: "If a seller only accepts e-transfer, that's a red flag.",
      correctAnswer: true,
      explanation: "E-transfers are hard to reverse. Scammers prefer irreversible payment methods.",
    },
    {
      question: "A seller with no reviews is definitely a scammer.",
      correctAnswer: false,
      explanation: "Everyone starts with zero reviews — but combined with other red flags, be cautious.",
    },
  ],
};

const Result = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background paper-texture">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-8 px-4 py-10 md:py-14">
        {/* Score Card */}
        <Card className="sketchy-border flex flex-col items-center gap-6 bg-card p-6 md:flex-row md:items-start md:gap-8">
          <div className="relative flex-shrink-0">
            <ScoreRadialChart score={mockData.score} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-heading text-2xl font-bold text-secondary">
              {mockData.riskLabel}
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-foreground/80">
              {mockData.summary}
            </p>
          </div>
        </Card>

        {/* Red Flags */}
        <RedFlagAccordion flags={mockData.redFlags} />

        {/* Quiz */}
        <TrueFalseQuiz questions={mockData.quizQuestions} />

        {/* Decision Card */}
        <Card className="sketchy-border space-y-4 bg-card p-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            After review… what do you want to do?
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" className="sketchy-border-light flex-1 font-heading font-bold">
              ✅ Proceed carefully
            </Button>
            <Button variant="outline" className="sketchy-border-light flex-1 font-heading font-bold">
              💬 Ask seller questions
            </Button>
            <Button variant="destructive" className="sketchy-border-light flex-1 font-heading font-bold">
              🚫 Avoid this listing
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
