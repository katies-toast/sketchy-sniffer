import { Card } from "@/components/ui/card";
import type { ReflectionPrompt } from "@/types/analysis";

interface ReflectionPromptsProps {
  prompts: ReflectionPrompt[];
}

const ReflectionPrompts = ({ prompts }: ReflectionPromptsProps) => {
  if (prompts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl font-bold text-foreground">🪞 Pause and reflect</h2>
      <Card className="sketchy-border space-y-3 bg-card p-5">
        {prompts.map((p) => (
          <p key={p.id} className="font-body text-sm leading-relaxed text-foreground/80">
            {p.prompt}
          </p>
        ))}
      </Card>
    </div>
  );
};

export default ReflectionPrompts;
