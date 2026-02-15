import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { QuizQuestion } from "@/types/analysis";

interface MultipleChoiceQuizProps {
  questions: QuizQuestion[];
}

const MultipleChoiceQuiz = ({ questions }: MultipleChoiceQuizProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl font-bold text-foreground">Quick reality check</h2>
      <Card className="sketchy-border space-y-4 bg-card p-5">
        {questions.map((q) => {
          const selectedId = answers[q.id];
          const answered = selectedId !== undefined;
          const correct = answered && selectedId === q.correct_option_id;

          return (
            <div key={q.id} className="space-y-2 border-b border-border pb-4 last:border-0 last:pb-0">
              <p className="font-body text-sm font-medium text-foreground">{q.prompt}</p>
              <div className="flex flex-col gap-2">
                {q.options.map((opt) => {
                  let variant: "outline" | "default" | "destructive" = "outline";
                  if (answered && opt.id === selectedId) {
                    variant = correct ? "default" : "destructive";
                  }
                  if (answered && opt.id === q.correct_option_id && !correct) {
                    variant = "default";
                  }

                  return (
                    <Button
                      key={opt.id}
                      size="sm"
                      variant={variant}
                      onClick={() => handleAnswer(q.id, opt.id)}
                      disabled={answered}
                      className="justify-start text-left font-heading text-xs"
                    >
                      {opt.text}
                    </Button>
                  );
                })}
              </div>
              {answered && (
                <p className={`font-body text-xs ${correct ? "text-primary" : "text-secondary"}`}>
                  {correct ? `✅ ${q.feedback.correct_title}` : `❌ ${q.feedback.incorrect_title}`}{" "}
                  {correct ? q.feedback.correct_body : q.feedback.incorrect_body}
                </p>
              )}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default MultipleChoiceQuiz;
