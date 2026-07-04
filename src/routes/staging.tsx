import { createFileRoute } from "@tanstack/react-router";

import { CLOSED_DEAL_SITES } from "~/data/closedDeals";

export const Route = createFileRoute("/staging")({
  component: Staging,
});

function Staging() {
  return (
    <main className="min-h-dvh bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16 md:py-24">
        <p className="inline-flex w-fit items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
          Mauk AI · Production Fulfillment
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
          Closed-won production sites are live for final review.
        </h1>

        <p className="max-w-3xl text-lg text-slate-300 md:text-xl">
          This staging hub hosts polished, production-ready websites and AI receptionist
          experiences for our five closed deals. Each page is fully customized and
          branded for launch readiness.
        </p>

        <div className="grid gap-4 pt-6 md:grid-cols-2">
          {CLOSED_DEAL_SITES.map((site) => (
            <article
              key={site.slug}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20"
            >
              <p className="text-sm text-cyan-200">Lead #{site.leadId} · {site.niche}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{site.businessName}</h2>
              <p className="mt-2 text-slate-300">{site.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {site.serviceHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-500/40 bg-slate-900/70 px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={`/sites/${site.slug}`}
                className="mt-5 inline-flex rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Open Production Site
              </a>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-slate-300">
          Built and staged by <span className="font-semibold text-white">Mauk AI</span> ·
          Includes AI receptionist widget on every client page.
        </div>
      </section>
    </main>
  );
}
