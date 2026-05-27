import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GENERAL_MEETING_DATE_DISPLAY } from "@/lib/site-config";
import SectionHeader from "./SectionHeader";
import SectionRow from "./SectionFrame";

const faqs = [
  {
    q: "What is KTH Developer?",
    a: `KTH Developer is an upcoming student association at KTH Royal Institute of Technology, set to be formally established on ${GENERAL_MEETING_DATE_DISPLAY}. Our mission: build digital sovereignty through world-class applications — software, infrastructure and self-hosted services. Membership will be free.`,
  },
  {
    q: "Who is the initiative taker behind KTH Developer?",
    a: "KTH Developer is an initiative by KTHIS (KTH Industrial Society), which is also handling the founding process and applications. KTH Developer will be a child association of KTHIS, joining its federated structure — autonomous in its own work, while sharing operational backing and a network of sister societies.",
  },
  {
    q: "Who can join?",
    a: "Any student enrolled at KTH, regardless of program or year. We welcome bachelor's, master's and PhD students.",
  },
  {
    q: "Do I need previous software experience?",
    a: "No. Curiosity and commitment matter more than prior experience. We'll have onboarding tracks for beginners and deeper projects for advanced members.",
  },
  {
    q: "Do you use AI / LLM coding tools?",
    a: "Yes — LLM coding assistants (Claude Code, Cursor, Copilot and similar) will be standard tools in the stack, not afterthoughts. The aim is to ship faster and tackle more ambitious projects, while still owning the code we're responsible for.",
  },
  {
    q: "What kinds of projects will we work on?",
    a: "Real, shippable applications: web apps, internal tools, developer tooling, self-hosted services and the infrastructure that runs them. Members will propose projects too — bring an idea, and if it fits the mission, it'll join the portfolio.",
  },
  {
    q: "What does \"digital sovereignty\" mean here?",
    a: "Owning the stack end-to-end: open-source software, self-hosted services, our own servers, no lock-in to third-party platforms. We'll learn by running things ourselves.",
  },
  {
    q: "When and where will you meet?",
    a: `KTH Developer will be formally established on ${GENERAL_MEETING_DATE_DISPLAY}. From there, regular build sessions and workshops will ramp up on KTH Campus Valhallavägen — times will be shared with members.`,
  },
  {
    q: "What roles will be available?",
    a: "Society leadership will be the Chair and Vice Chair. Below them: Development Leads will own technical projects (apps, infra, self-hosting), and Operations Leads will run media, branding, events, partnerships and facilities. See Open Positions for specific roles, or send a general application.",
  },
  {
    q: "How do I apply?",
    a: "Head to the Apply section, pick the area that fits you (or apply generally), and submit the form. It takes about 5 minutes.",
  },
  {
    q: "What happens after I apply?",
    a: "Applications will be read continuously, and shortlisted applicants will be invited to a conversation. The application process is handled by KTH Industrial Society.",
  },
  {
    q: "Is there a deadline?",
    a: `Applications are rolling and remain open until the general meeting on ${GENERAL_MEETING_DATE_DISPLAY}. Earlier is better — roles fill as suitable candidates are found.`,
  },
  {
    q: "What's the expected time commitment?",
    a: "Plan for around 8 hours per week, including build sessions, project work and meetings. It flexes with project phase and deadlines.",
  },
  {
    q: "What language do you operate in?",
    a: "English. Meetings, materials and applications will all be in English so the society is open to international students at KTH.",
  },
];

export default function FAQ() {
  return (
    <SectionRow
      id="faq"
      index="04"
      label="FAQ"
      meta={`Q ${String(faqs.length).padStart(2, "0")}`}
    >
      <SectionHeader title="Questions, answered" />

      <Accordion
        type="single"
        collapsible
        className="mt-12 -mx-5 sm:-mx-10 -mb-16 sm:-mb-24 w-auto text-left border-t border-border"
      >
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-b border-border"
          >
            <AccordionTrigger className="px-5 sm:px-10 py-6 text-left text-base hover:bg-card hover:no-underline transition-colors [&[data-state=open]]:bg-card">
              <span className="flex items-baseline gap-6">
                <span className="font-mono text-xs text-muted-foreground/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground">{f.q}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 sm:px-10 pb-8 pl-[3.75rem] sm:pl-[5.25rem] text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionRow>
  );
}
