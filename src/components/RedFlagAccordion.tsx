import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Finding } from "@/types/analysis";

interface RedFlagAccordionProps {
  flags: Finding[];
}

const severityColor: Record<string, string> = {
  high: "bg-secondary/20 text-secondary",
  medium: "bg-primary/20 text-primary",
  low: "bg-muted text-muted-foreground",
};

const RedFlagAccordion = ({ flags }: RedFlagAccordionProps) => {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl font-bold text-foreground">🚩 Why this score</h2>
      <Accordion type="multiple" className="space-y-2">
        {flags.map((flag) => (
          <AccordionItem
            key={flag.id}
            value={flag.id}
            className="sketchy-border-light overflow-hidden bg-card px-4"
          >
            <AccordionTrigger className="font-heading text-base font-bold hover:no-underline">
              <div className="flex flex-col items-start gap-0.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-secondary">⚠ {flag.header}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${severityColor[flag.severity]}`}>
                    {flag.severity}
                  </span>
                </div>
                <span className="text-sm font-normal text-muted-foreground">{flag.summary}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 font-body text-sm leading-relaxed text-foreground/80">
              <p>{flag.explanation}</p>
              {flag.evidence.length > 0 && (
                <div className="space-y-1">
                  {flag.evidence.map((e, i) => (
                    <p key={i} className="text-xs italic text-muted-foreground">
                      "{e}"
                    </p>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RedFlagAccordion;
