import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RedFlag {
  title: string;
  summary: string;
  explanation: string;
}

interface RedFlagAccordionProps {
  flags: RedFlag[];
}

const RedFlagAccordion = ({ flags }: RedFlagAccordionProps) => {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-2xl font-bold text-foreground">🚩 Why this score</h2>
      <Accordion type="multiple" className="space-y-2">
        {flags.map((flag, i) => (
          <AccordionItem
            key={i}
            value={`flag-${i}`}
            className="sketchy-border-light overflow-hidden bg-card px-4"
          >
            <AccordionTrigger className="font-heading text-base font-bold hover:no-underline">
              <div className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-secondary">⚠ {flag.title}</span>
                <span className="text-sm font-normal text-muted-foreground">{flag.summary}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="font-body text-sm leading-relaxed text-foreground/80">
              {flag.explanation}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RedFlagAccordion;
