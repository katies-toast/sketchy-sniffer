import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuizQuestion {
  question: string;
  correctAnswer: boolean;
  explanation: string;
}

interface TrueFalseQuizProps {
  questions: QuizQuestion[];
}

const TrueFalseQuiz = ({ questions }: TrueFalseQuizProps) => {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>({});

  const handleAnswer = (index: number, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl font-bold text-foreground">Quick reality check</h2>
      <Card className="sketchy-border space-y-4 bg-card p-5">
        {questions.map((q, i) => {
          const answered = answers[i] !== undefined && answers[i] !== null;
          const correct = answered && answers[i] === q.correctAnswer;

          return (
            <div key={i} className="space-y-2 border-b border-border pb-4 last:border-0 last:pb-0">
              <p className="font-body text-sm font-medium text-foreground">{q.question}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={answers[i] === true ? (correct ? "default" : "destructive") : "outline"}
                  onClick={() => handleAnswer(i, true)}
                  disabled={answered}
                  className="font-heading text-xs"
                >
                  True
                </Button>
                <Button
                  size="sm"
                  variant={answers[i] === false ? (correct ? "default" : "destructive") : "outline"}
                  onClick={() => handleAnswer(i, false)}
                  disabled={answered}
                  className="font-heading text-xs"
                >
                  False
                </Button>
              </div>
              {answered && (
                <p className={`font-body text-xs ${correct ? "text-primary" : "text-secondary"}`}>
                  {correct ? "Correct!" : "Not quite."} {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default TrueFalseQuiz;
