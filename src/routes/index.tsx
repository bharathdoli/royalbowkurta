import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BRAND, COLORS, PRODUCT, formatINR, type ColorId } from "@/config/product";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${PRODUCT.name} - Men's Designer Kurta` },
      { name: "description", content: "A men's designer kurta with signature gold bow detailing. In Ivory White and Royal Maroon." },
      { property: "og:title", content: `${PRODUCT.name} — A Mark of Quiet Royalty` },
      { property: "og:description", content: "Timeless silhouette. Gold detailing." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const price = formatINR(PRODUCT.price);
const IDS = Object.keys(COLORS) as ColorId[];
const waLink = (text: string) => `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.79.58.69 5.68.69 11.94c0 2 .52 3.95 1.52 5.67L.6 23.5l6.03-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.04-1.18-5.89-3.33-8.04" />
    </svg>
  );
}

function Index() {
  const [color, setColor] = useState<ColorId>("ivory");
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState("");
  const c = COLORS[color];

  const choose = (id: ColorId) => {
    setColor(id);
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const buy = () => {
    if (!size) { setNotice("Please select a size."); document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }); return; }
    setNotice("");
    const msg = `Hello, I'd like to order:\n${PRODUCT.name}\nColour: ${c.label}\nSize: ${size}\nQuantity: ${qty}\nPrice: ${price} each (kurta only)`;
    window.open(waLink(msg), "_blank", "noopener");
  };

  return (
    <main className="overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6" aria-label="Main">
          <a href="#top" className="font-serif text-lg tracking-[0.15em] uppercase">{BRAND.name}</a>
          <div className="flex items-center gap-6 text-xs">
            <a href="#details" className="hidden text-muted-foreground hover:text-foreground sm:inline">Details</a>
            <a href="#colours" className="hidden text-muted-foreground hover:text-foreground sm:inline">Colours</a>
            <a href="#order" className="rounded-full bg-primary px-4 py-1.5 text-primary-foreground">Buy</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="px-6 pt-16 text-center md:pt-24">
        <p className="text-sm font-medium text-accent rise">New</p>
        <h1 className="mt-3 text-5xl md:text-8xl rise" style={{ animationDelay: "100ms" }}>{PRODUCT.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-2xl rise" style={{ animationDelay: "200ms" }}>Quiet royalty. In gold.</p>
        <div className="mt-8 flex items-center justify-center gap-6 rise" style={{ animationDelay: "300ms" }}>
          <a href="#order" className="rounded-full bg-primary px-7 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90">Buy</a>
          <span className="text-sm text-muted-foreground">From {price}</span>
        </div>
        <div className="mx-auto mt-14 max-w-xl rise" style={{ animationDelay: "400ms" }}>
          <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-secondary">
            <img src={COLORS.ivory.model} alt="The Royal Bow Kurta in Ivory White" className="h-full w-full object-cover object-top" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* SIGNATURE */}
      <section className="mt-28 bg-espresso py-24 text-center text-ivory md:mt-36 md:py-32">
        <Reveal className="px-6">
          <h2 className="text-4xl md:text-7xl">The signature <em className="text-gold">bow.</em></h2>
          <p className="mt-4 text-lg opacity-70">Gold embroidery. Unmistakable.</p>
        </Reveal>
        <Reveal className="mx-auto mt-14 max-w-3xl px-6">
          <div className="aspect-square overflow-hidden rounded-3xl">
            <img src={c.bow} alt="Gold bow embroidery close-up" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </Reveal>
      </section>

      {/* DETAILS */}
      <section id="details" className="mx-auto max-w-6xl scroll-mt-12 px-6 py-24 md:py-32">
        <Reveal className="text-center">
          <h2 className="text-4xl md:text-7xl">Every detail. Considered.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { img: c.collar, t: "Collar" },
            { img: c.cuff, t: "Cuff" },
            { img: c.hem, t: "Hem" },
          ].map((d, i) => (
            <Reveal key={d.t} delay={i * 120}>
              <figure>
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-secondary">
                  <img src={d.img} alt={`${d.t} gold detailing`} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-4 text-center font-serif text-2xl">{d.t}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COLOURS */}
      <section id="colours" className="scroll-mt-12 bg-card py-24 md:py-32">
        <Reveal className="px-6 text-center">
          <h2 className="text-4xl md:text-7xl">Two colours.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Pick yours.</p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 px-6 md:gap-8">
          {IDS.map((id, i) => (
            <Reveal key={id} delay={i * 120}>
              <button type="button" onClick={() => choose(id)} className="group block w-full text-center" aria-label={`Select ${COLORS[id].label}`}>
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-secondary">
                  <img src={COLORS[id].model} alt={`The Royal Bow Kurta in ${COLORS[id].label}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 font-serif text-2xl md:text-3xl">{COLORS[id].label}</p>
                <span className="mt-1 inline-block text-sm text-primary group-hover:underline">Select ›</span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ORDER */}
      <section id="order" className="mx-auto grid max-w-6xl scroll-mt-12 items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-secondary">
          {IDS.map((id) => (
            <img key={id} src={COLORS[id].model} alt={`The Royal Bow Kurta in ${COLORS[id].label}`} loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${id === color ? "opacity-100" : "opacity-0"}`} />
          ))}
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl">Buy {PRODUCT.name}</h2>
          <p className="mt-3 text-2xl">{price}</p>
          <p className="mt-1 text-sm text-muted-foreground">Kurta only. Trousers not included.</p>

          <p className="mt-10 text-sm font-medium">Colour <span className="text-muted-foreground">— {c.label}</span></p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {IDS.map((id) => (
              <button key={id} type="button" onClick={() => setColor(id)} aria-pressed={id === color}
                className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-sm transition-colors ${id === color ? "border-primary" : "border-border hover:border-accent"}`}>
                <span className={`h-5 w-5 shrink-0 rounded-full ring-1 ring-accent ${id === "ivory" ? "bg-ivory" : "bg-primary"}`} />
                {COLORS[id].label}
              </button>
            ))}
          </div>

          <p className="mt-8 text-sm font-medium">Size</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {PRODUCT.sizes.map((s) => (
              <button key={s} type="button" onClick={() => { setSize(s); setNotice(""); }} aria-pressed={s === size}
                className={`h-12 rounded-2xl border-2 text-sm transition-colors ${s === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-accent"}`}>{s}</button>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-5">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center rounded-full border">
              <button type="button" aria-label="Decrease quantity" className="h-10 w-10" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className="w-6 text-center" aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase quantity" className="h-10 w-10" onClick={() => setQty((q) => Math.min(10, q + 1))}>+</button>
            </div>
          </div>

          <button type="button" onClick={buy} className="mt-10 w-full rounded-full bg-primary py-4 text-primary-foreground transition-opacity hover:opacity-90">Buy This Kurta</button>
          {notice && <p role="status" className="mt-3 text-center text-sm text-primary">{notice}</p>}
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <a href={waLink(`Hello, I'm interested in ${PRODUCT.name}.`)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-ivory shadow-lg transition-transform hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </main>
  );
}
