import { FAQS } from '../lib/site';

/* Visible FAQ — mirrors the FAQPage structured data in layout.tsx (no JS, native <details>). */
export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="section-label justify-center">FAQ</div>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] font-bold text-sv-dark leading-tight mt-2">
            Frequently Asked <span className="text-sv-red">Questions</span>
          </h2>
        </div>

        <div className="divide-y divide-sv-dark/10 border-y border-sv-dark/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg md:text-xl font-semibold text-sv-dark group-hover:text-sv-red transition-colors">
                  {f.q}
                </h3>
                <span className="shrink-0 w-8 h-8 rounded-full border border-sv-red/50 text-sv-red flex items-center justify-center text-xl leading-none group-open:rotate-45 group-open:bg-sv-red group-open:text-white transition-all duration-300">
                  +
                </span>
              </summary>
              <p className="mt-3 pr-14 text-gray-600 text-[16px] leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
