'use client';

import { useState, FormEvent } from 'react';

const SERVICE_OPTIONS = [
  'Wedding Catering',
  'Corporate Events',
  'Birthday Party',
  'Family Gathering',
  'Outdoor Catering',
  'Holy Communion',
  'Special Occasion',
  'Other',
];

const CONTACT_INFO = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+353 85 818 9052',
    href: 'tel:+353858189052',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'info@spicevillagecatering.ie',
    href: 'mailto:info@spicevillagecatering.ie',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Main Branch',
    value: 'C4 Station Rd Business Park, Crag Ave, Clondalkin, Dublin 22, D22 DX52',
    href: 'https://maps.google.com/?q=Spice+Village+Catering+Clondalkin+Dublin',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Opening Hours',
    value: 'Monday – Sunday: 9:00 am – 10:00 pm',
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', guests: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = [
      `Hello Spice Village! I'd like to book catering.`,
      ``,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Service: ${form.service || 'Not specified'}`,
      `Event Date: ${form.date || 'TBD'}`,
      `Guests: ${form.guests || 'TBD'}`,
      `Message: ${form.message}`,
    ].join('\n');

    window.open(
      `https://wa.me/353858189052?text=${encodeURIComponent(text)}`,
      '_blank'
    );
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="section-label justify-center">Get In Touch</div>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-sv-dark leading-tight mt-2 mb-4">
            Book Your Catering or<br />
            <span className="text-sv-red">Send an Enquiry</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Ready to make your event unforgettable? Fill in the form and we&apos;ll get back to you shortly via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-16">

          {/* ── Left — Contact Info ── */}
          <div className="lg:col-span-2">
            {/* Info cards */}
            <div className="space-y-4 mb-8">
              {CONTACT_INFO.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-sv-warm rounded-xl hover:bg-sv-cream transition-colors">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-sv-red/10 text-sv-red flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-sv-orange font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-700 text-[13px] leading-snug hover:text-sv-red transition-colors font-medium"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-700 text-[13px] leading-snug font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  {
                    label: 'Facebook',
                    href: 'https://www.facebook.com/spicevillagecatering',
                    bg: '#111111',
                    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
                  },
                  {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/spicevillage_catering/',
                    bg: 'linear-gradient(45deg, #111111 0%,#111111 25%,#111111 50%,#111111 75%,#111111 100%)',
                    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
                  },
                  {
                    label: 'WhatsApp',
                    href: 'https://wa.me/353858189052',
                    bg: '#B22222',
                    icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
                  },
                  {
                    label: 'YouTube',
                    href: 'https://youtube.com/@spicevillagecatering',
                    bg: '#E11D2E',
                    icon: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                    style={{ background: s.bg }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-8 bg-sv-warm rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-sv-green/10 text-sv-green flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-sv-dark mb-2">WhatsApp Opening...</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Your message has been prepared. Complete it in WhatsApp and we&apos;ll respond as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sv-red text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-sv-warm rounded-2xl p-6 md:p-8 space-y-4"
              >
                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-sv-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Phone Number <span className="text-sv-red">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+353 ..."
                      className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors"
                  />
                </div>

                {/* Service + Date row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Type of Service
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors"
                    />
                  </div>
                </div>

                {/* Guest count */}
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="Approx. number of guests"
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your event, dietary requirements, special requests..."
                    className="w-full px-4 py-3 rounded-xl border border-sv-border bg-white text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sv-red/30 focus:border-sv-red transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-sv-dark hover:bg-sv-red text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-md text-[15px] tracking-wide"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Send via WhatsApp
                </button>
                <p className="text-center text-gray-400 text-[11px]">
                  This form opens WhatsApp with your details pre-filled.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
