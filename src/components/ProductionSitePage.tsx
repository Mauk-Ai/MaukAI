import { Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";

import {
  CLOSED_DEAL_SITES_BY_SLUG,
  type ClientSite,
} from "~/data/closedDeals";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

export function ProductionSitePage({ slug }: { slug: string }) {
  const site = CLOSED_DEAL_SITES_BY_SLUG[slug];

  if (!site) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-slate-950 px-6 text-slate-100">
        <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-white/5 p-6 text-center">
          <p className="text-sm uppercase tracking-wide text-cyan-200">Mauk AI</p>
          <h1 className="mt-2 text-2xl font-bold">Client site not found</h1>
          <p className="mt-2 text-slate-300">
            This client slug does not exist in the closed-deals production set.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950"
          >
            Return to Fulfillment Hub
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">{site.niche}</p>
            <p className="text-xl font-bold">{site.businessName}</p>
          </div>
          <a
            href={`tel:${normalizedPhone(site.phone)}`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Call {site.phone}
          </a>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${site.accentClass} text-white`}>
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">{site.tagline}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{site.heroTitle}</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">{site.heroSubtitle}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="rounded-lg bg-white px-4 py-2 font-semibold text-slate-900"
              >
                {site.primaryCta}
              </a>
              <a
                href="#services"
                className="rounded-lg border border-white/80 px-4 py-2 font-semibold text-white"
              >
                Explore Services
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/25 bg-white/15 p-5 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">At a glance</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/95">
              {site.serviceHighlights.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-white/90">
              {site.address}
              <br />
              {site.hours}
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto w-full max-w-6xl px-6 py-14">
        <p className="text-sm uppercase tracking-wide text-slate-500">Services</p>
        <h2 className="mt-2 text-3xl font-bold">Customized offerings for {site.city}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {site.services.map((service) => (
            <article
              key={service.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-14 text-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="text-sm uppercase tracking-wide text-cyan-200">Customer feedback</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {site.testimonials.map((t) => (
              <blockquote key={t.author} className="rounded-xl border border-white/20 bg-white/5 p-5">
                <p className="text-lg">“{t.quote}”</p>
                <footer className="mt-3 text-sm text-slate-300">— {t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-12">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Need help now?</p>
          <h2 className="text-2xl font-bold">Speak with our front desk or AI receptionist</h2>
          <p className="mt-1 text-slate-600">Call {site.phone} · Email {site.email}</p>
        </div>
        <a
          href={`mailto:${site.email}`}
          className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white"
        >
          Contact {site.businessName}
        </a>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-slate-600">
          <span>© {new Date().getFullYear()} {site.businessName}</span>
          <span>
            Website + AI Receptionist by <strong>Mauk AI</strong>
          </span>
          <Link to="/" className="font-medium text-slate-900 underline">
            Back to Fulfillment Hub
          </Link>
        </div>
      </footer>

      <AiReceptionistWidget site={site} />
    </main>
  );
}

function AiReceptionistWidget({ site }: { site: ClientSite }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: `Hi! I'm ${site.receptionistName}, ${site.businessName}'s AI receptionist. I can help with booking, hours, pricing, or callback requests.`,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickReplies = useMemo(
    () => ["Book appointment", "Business hours", "Pricing", "Talk to front desk"],
    [],
  );

  const sendMessage = (raw: string) => {
    const message = raw.trim();
    if (!message) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "assistant", text: receptionistReply(message, site) },
    ]);
    setInput("");

    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <section className="w-[360px] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl">
          <header className={`bg-gradient-to-r ${site.accentClass} flex items-center justify-between px-4 py-3 text-white`}>
            <div>
              <p className="text-sm font-semibold">AI Receptionist</p>
              <p className="text-xs text-white/85">Powered by Mauk AI</p>
            </div>
            <button
              type="button"
              className="rounded-md bg-white/15 px-2 py-1 text-xs font-semibold"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </header>

          <div ref={scrollRef} className="max-h-80 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === "assistant"
                    ? "mr-8 rounded-xl bg-white p-3 text-sm text-slate-700 shadow"
                    : "ml-8 rounded-xl bg-slate-900 p-3 text-sm text-white"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => sendMessage(reply)}
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700"
                >
                  {reply}
                </button>
              ))}
            </div>

            <form
              className="flex items-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question..."
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-400 focus:ring"
              />
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`mt-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${site.accentClass} text-xl text-white shadow-xl`}
        aria-label="Open AI receptionist"
      >
        💬
      </button>
    </div>
  );
}

function receptionistReply(input: string, site: ClientSite) {
  const message = input.toLowerCase();

  if (/book|reserve|appointment|schedule/.test(message)) {
    return `Great choice. I can help you book right away. Please call ${site.phone} or share your preferred day/time and our team will confirm availability.`;
  }

  if (/hour|open|close|time/.test(message)) {
    return `Our current hours are ${site.hours}. Would you like me to request a callback from the front desk?`;
  }

  if (/price|cost|quote|how much/.test(message)) {
    return `Pricing depends on the service. Tell me what you need and I'll have ${site.businessName} send a same-day estimate.`;
  }

  if (/front desk|person|human|call/.test(message)) {
    return `Absolutely — you can reach the front desk at ${site.phone} or email ${site.email}.`;
  }

  return `Thanks for contacting ${site.businessName}. I can help with booking, hours, pricing, and callback requests.`;
}

function normalizedPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
