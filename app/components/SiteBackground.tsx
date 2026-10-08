/* Fixed red graphic backdrop for the whole page — pure CSS, transform-only animation. */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true" data-mouse="30">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #fff6f2 0%, #fde8e3 45%, #fff3ee 100%)' }} />

      <div className="bg-float absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-sv-red/30 blur-[130px]" />
      <div className="bg-float absolute top-1/3 -right-52 w-[600px] h-[600px] rounded-full bg-red-600/25 blur-[140px]" style={{ animationDelay: '-6s', animationDuration: '26s' }} />
      <div className="bg-float absolute -bottom-52 left-1/4 w-[680px] h-[680px] rounded-full bg-[#7a1010]/25 blur-[150px]" style={{ animationDelay: '-12s', animationDuration: '30s' }} />
      <div className="bg-float absolute top-2/3 -left-32 w-80 h-80 rounded-full bg-sv-orange/20 blur-[110px]" style={{ animationDelay: '-3s' }} />

      {/* rings */}
      <div className="absolute top-24 right-[7%] w-80 h-80 rounded-full border border-sv-red/20" />
      <div className="absolute bottom-24 left-[5%] w-[26rem] h-[26rem] rounded-full border border-sv-red/15" />
      <div className="absolute top-1/2 left-1/2 w-[46rem] h-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sv-red/10" />

      {/* dots */}
      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: 'radial-gradient(#B22222 1.3px, transparent 1.3px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 80%)',
        }}
      />
    </div>
  );
}
