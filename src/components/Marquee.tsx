export default function Marquee() {
  const text = "PINS & NEEDLE  •  STREETWEAR  •  SS26  •  LIMITED EDITION  •  FREE SHIPPING OVER KSH 5,000  •  ";

  return (
    <div className="bg-pan-accent py-3 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-sm font-bold tracking-wider text-white mx-2">{text}</span>
        <span className="text-sm font-bold tracking-wider text-white mx-2">{text}</span>
        <span className="text-sm font-bold tracking-wider text-white mx-2">{text}</span>
        <span className="text-sm font-bold tracking-wider text-white mx-2">{text}</span>
        <span className="text-sm font-bold tracking-wider text-white mx-2">{text}</span>
        <span className="text-sm font-bold tracking-wider text-white mx-2">{text}</span>
      </div>
    </div>
  );
}
