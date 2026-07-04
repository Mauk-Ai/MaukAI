import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

// Server function to register an inbound lead in the Turso DB
const registerLead = createServerFn({ method: "POST" })
  .validator(
    (data: {
      contactName: string;
      businessName: string;
      email: string;
      phone: string;
      city: string;
      niche: string;
    }) => data
  )
  .handler(async ({ data }) => {
    try {
      const tursoUrl = process.env.TURSO_DB_URL;
      const tursoToken = process.env.TURSO_AUTH_TOKEN;

      if (!tursoUrl || !tursoToken) {
        return { success: false, error: "Database not configured. Please contact support." };
      }

      // Extract the HTTP API URL from the libsql connection string
      // libsql://mauk-ai-db-mauk-ai.aws-us-east-2.turso.io → https://mauk-ai-db-mauk-ai.aws-us-east-2.turso.io
      const httpUrl = tursoUrl.replace("libsql://", "https://");

      const notes = `Inbound opt-in demo request. Contact Name: ${data.contactName}`;

      const response = await fetch(`${httpUrl}/v2/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tursoToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              type: "execute",
              stmt: {
                sql: `INSERT INTO leads (name, city, niche, email, phone, website_missing, status, notes) VALUES (?, ?, ?, ?, ?, 1, 'found', ?)`,
                args: [
                  { type: "text", value: data.businessName },
                  { type: "text", value: data.city },
                  { type: "text", value: data.niche },
                  { type: "text", value: data.email },
                  { type: "text", value: data.phone },
                  { type: "text", value: notes },
                ],
              },
            },
          ],
        }),
      });

      const result = await response.json();

      if (result.results?.[0]?.type === "ok") {
        return { success: true };
      } else {
        return { success: false, error: "Database write failed." };
      }
    } catch (error: any) {
      console.error("Failed to write inbound lead to Turso DB:", error);
      return { success: false, error: error.message || "An unexpected error occurred." };
    }
  });

export const Route = createFileRoute("/")({
  component: Home,
});

// Statically defined demo sites from Batch 3 (fully hosted on /demos/<id>/index.html)
const DEMO_SITES = [
  {
    id: 21,
    name: "Civic Center Dental",
    niche: "Clinic",
    city: "San Francisco",
    path: "/demos/21/index.html",
    tagline: "State-of-the-art dental care with a gentle touch.",
    highlights: ["24/7 Booking", "Modern Clinic", "Top Rated"],
  },
  {
    id: 22,
    name: "SF Neighborhood Vet",
    niche: "Clinic",
    city: "San Francisco",
    path: "/demos/22/index.html",
    tagline: "Compassionate, high-quality care for your furry family members.",
    highlights: ["Pet Health", "Emergency Vet", "Friendly Staff"],
  },
  {
    id: 23,
    name: "Castro Street Smiles",
    niche: "Clinic",
    city: "San Francisco",
    path: "/demos/23/index.html",
    tagline: "Creating happy, healthy, and radiant smiles for all ages.",
    highlights: ["Teeth Whitening", "Orthodontics", "Warm Environment"],
  },
  {
    id: 27,
    name: "Pacific Heights Salon",
    niche: "Hair Salon",
    city: "San Francisco",
    path: "/demos/27/index.html",
    tagline: "Upscale, trendsetting hair design and luxury pampering.",
    highlights: ["Master Stylists", "Color Specialist", "Premium Products"],
  },
  {
    id: 28,
    name: "Sunset Barber Co.",
    niche: "Hair Salon",
    city: "San Francisco",
    path: "/demos/28/index.html",
    tagline: "Classic cuts, modern fades, and signature hot towel shaves.",
    highlights: ["Men's Grooming", "Walk-ins Welcome", "Retro Vibe"],
  },
  {
    id: 29,
    name: "Noe Valley Hair Studio",
    niche: "Hair Salon",
    city: "San Francisco",
    path: "/demos/29/index.html",
    tagline: "Bespoke cuts and vibrant colors tailored to your lifestyle.",
    highlights: ["Custom Cuts", "Balayage", "Eco-Friendly"],
  },
  {
    id: 33,
    name: "Chinatown Dumpling House",
    niche: "Restaurant",
    city: "San Francisco",
    path: "/demos/33/index.html",
    tagline: "Authentic hand-folded dumplings crafted with love and tradition.",
    highlights: ["Hand-made", "Dim Sum", "Family Recipe"],
  },
  {
    id: 34,
    name: "North Beach Pasta Bar",
    niche: "Restaurant",
    city: "San Francisco",
    path: "/demos/34/index.html",
    tagline: "Fresh house-made pasta, rich sauces, and regional Italian wines.",
    highlights: ["Fresh Pasta", "Al Fresco Dining", "Cosy Atmosphere"],
  },
  {
    id: 35,
    name: "Mission District Taqueria",
    niche: "Restaurant",
    city: "San Francisco",
    path: "/demos/35/index.html",
    tagline: "Vibrant, sizzling street-style tacos and fresh salsa cruda.",
    highlights: ["Street Tacos", "Super Burritos", "Late Night"],
  },
  {
    id: 37,
    name: "Bernal Heights Bakery",
    niche: "Restaurant",
    city: "San Francisco",
    path: "/demos/37/index.html",
    tagline: "Freshly baked artisan sourdough bread and delicate pastries.",
    highlights: ["Artisan Bread", "Espresso Bar", "Fresh Daily"],
  },
  {
    id: 39,
    name: "Dogpatch Brewpub",
    niche: "Restaurant",
    city: "San Francisco",
    path: "/demos/39/index.html",
    tagline: "Award-winning craft beers and upscale gastropub comfort food.",
    highlights: ["Microbrewery", "Beer Garden", "Local Hangout"],
  },
  {
    id: 40,
    name: "Marina Seafood Shack",
    niche: "Restaurant",
    city: "San Francisco",
    path: "/demos/40/index.html",
    tagline: "Sustainably-sourced local seafood and raw bar specialties.",
    highlights: ["Oyster Bar", "Clam Chowder", "Daily Catch"],
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState<string>("All");

  // Form states
  const [contactName, setContactName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");

  // UI feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Email validation regex
  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Basic client validations
    if (!contactName.trim()) {
      setSubmitError("Contact Name is required.");
      return;
    }
    if (!businessName.trim()) {
      setSubmitError("Business Name is required.");
      return;
    }
    if (!validateEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setSubmitError("Phone number is required.");
      return;
    }
    if (!city.trim()) {
      setSubmitError("City is required.");
      return;
    }
    if (!niche) {
      setSubmitError("Please select your business niche.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerLead({
        data: {
          contactName: contactName.trim(),
          businessName: businessName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          niche,
        },
      });

      if (res.success) {
        setSubmitSuccess(true);
        // Reset form
        setContactName("");
        setBusinessName("");
        setEmail("");
        setPhone("");
        setCity("");
        setNiche("");
      } else {
        setSubmitError(res.error || "An error occurred during submission.");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter demos based on selected niche
  const filteredDemos =
    activeTab === "All"
      ? DEMO_SITES
      : DEMO_SITES.filter((d) => d.niche === activeTab);

  return (
    <main className="min-h-dvh bg-slate-950 text-slate-100 font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_60%_50%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-lg">
              M
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Mauk <span className="text-cyan-400">AI</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition">
              Features
            </a>
            <a href="#showcase" className="hover:text-cyan-400 transition">
              Demo Showcase
            </a>
            <a href="#request" className="hover:text-cyan-400 transition">
              Request Demo
            </a>
            <a
              href="/staging"
              className="text-cyan-400/80 hover:text-cyan-400 transition flex items-center gap-1 font-semibold"
            >
              Staging Hub
            </a>
          </nav>
          <div>
            <a
              href="#request"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Get Free Demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
        <p className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200 mb-6">
          🚀 Next-Gen Digital Presence for Local Business
        </p>
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl leading-tight">
          A custom website & smart{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            AI Receptionist
          </span>
          , ready in 24 hours.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl leading-relaxed">
          We identify, build, and deploy premium websites combined with smart
          voice & booking assistants that run 24/7 to catch every lead. Zero upfront risk — review your free custom-tailored demo first.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#request"
            className="w-full sm:w-auto rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            Request Your Free Custom Preview
          </a>
          <a
            href="#showcase"
            className="w-full sm:w-auto rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold text-white transition hover:bg-white/10 hover:border-white/20"
          >
            Explore 20+ Live Demos
          </a>
        </div>
      </section>

      {/* Features/How It Works Section */}
      <section id="features" className="border-t border-white/5 bg-slate-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Launch Your 24/7 Virtual Office in Three Simple Steps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              We eliminate technical friction completely. Our custom delivery model gets you premium results without the expensive agency price tag.
            </p>
          </div>

          <div className="grid gap-8 mt-16 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-lg">
                1
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Opt-In for a Demo</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Submit your business info below. Our team instantly registers your opt-in request and starts analyzing your local presence.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-lg">
                2
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">We Build It in 24 Hours</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Our expert builders craft a gorgeous custom website and program an AI booking widget pre-trained specifically on your services and hours.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-lg">
                3
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Launch & Grow</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">
                Review your live preview staging link. Once satisfied, check out to instantly map your custom domain and unlock full AI receptionist services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Showcase Section */}
      <section id="showcase" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Our High-Quality Custom Demo Gallery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Browse a selection of the 20+ statically-deployed custom demo sites we've built for real local business niches. Click to launch their live experiences.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {["All", "Clinic", "Hair Salon", "Restaurant"].map((nicheCategory) => (
              <button
                key={nicheCategory}
                onClick={() => setActiveTab(nicheCategory)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeTab === nicheCategory
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                {nicheCategory === "All"
                  ? "All Niches"
                  : nicheCategory === "Hair Salon"
                    ? "Salons & Barbers"
                    : nicheCategory + "s"}
              </button>
            ))}
          </div>

          {/* Demo Grid */}
          <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredDemos.map((demo) => (
              <article
                key={demo.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/30 p-6 shadow-xl shadow-black/30 hover:border-cyan-500/30 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-400">
                    <span>{demo.niche}</span>
                    <span className="text-slate-500">{demo.city}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white group-hover:text-cyan-400 transition">
                    {demo.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {demo.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {demo.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={demo.path}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-slate-950"
                  >
                    Open Live Demo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Request Form Section */}
      <section id="request" className="border-t border-white/5 bg-slate-900/20 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Claim Your Custom Preview Site & AI Widget
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Enter your business details below to secure a completely personalized preview. No payment method required, 100% risk-free.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12 shadow-2xl">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-3xl font-bold mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Demo Request Submitted!</h3>
                <p className="mt-4 text-slate-300 leading-relaxed max-w-md mx-auto">
                  Thank you! We've registered your inbound opt-in demo request. Our builders are already prepping a gorgeous custom website and smart AI Booking assistant for you.
                </p>
                <p className="mt-2 text-cyan-400 font-semibold">
                  We'll email you the staging link within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-8 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {submitError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400 font-medium">
                    ⚠ {submitError}
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Owner / Contact Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      placeholder="e.g. John Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      placeholder="e.g. Civic Center Pizza"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Email Address (Verified)
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. contact@business.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="e.g. (415) 555-0199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="e.g. San Francisco"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="niche"
                      className="block text-sm font-semibold text-slate-300 mb-2"
                    >
                      Business Niche
                    </label>
                    <select
                      id="niche"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition appearance-none"
                      style={{ colorScheme: "dark" }}
                      required
                    >
                      <option value="" disabled className="text-slate-500">
                        Select a niche...
                      </option>
                      <option value="Restaurant" className="text-white">
                        Restaurant
                      </option>
                      <option value="Hair Salon" className="text-white">
                        Hair Salon / Barber
                      </option>
                      <option value="Salon" className="text-white">
                        Nail / Esthetic Salon
                      </option>
                      <option value="Clinic" className="text-white">
                        Medical / Dental Clinic
                      </option>
                      <option value="Other" className="text-white">
                        Other Service Business
                      </option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 shadow-lg shadow-cyan-500/10 cursor-pointer"
                  >
                    {isSubmitting ? "Registering Opt-in Request..." : "Request Your Custom Staging Link"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-slate-950 py-12 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Mauk AI Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/staging" className="hover:text-cyan-400 transition">
              Client Staging Hub
            </a>
            <a href="#features" className="hover:text-cyan-400 transition">
              How It Works
            </a>
            <a href="#showcase" className="hover:text-cyan-400 transition">
              Interactive Showcase
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
