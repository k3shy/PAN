import { Ruler, Info } from 'lucide-react';
import Layout from '../components/Layout';

const sizeCharts = {
  tops: {
    title: 'Tops (Hoodies, Tees, Jackets)',
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Shoulder (in)', 'Sleeve (in)'],
    rows: [
      ['S', '38-40', '27', '18', '24'],
      ['M', '40-42', '28', '19', '25'],
      ['L', '42-44', '29', '20', '26'],
      ['XL', '44-46', '30', '21', '27'],
      ['XXL', '46-48', '31', '22', '28'],
    ],
  },
  bottoms: {
    title: 'Bottoms (Pants, Shorts)',
    headers: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'Length (in)'],
    rows: [
      ['S', '28-30', '36-38', '30', '38'],
      ['M', '30-32', '38-40', '31', '39'],
      ['L', '32-34', '40-42', '32', '40'],
      ['XL', '34-36', '42-44', '33', '41'],
      ['XXL', '36-38', '44-46', '34', '42'],
    ],
  },
  accessories: {
    title: 'Accessories (Caps)',
    headers: ['Size', 'Head Circumference (in)'],
    rows: [
      ['One Size', '21.5-23'],
    ],
  },
};

const measuringTips = [
  { title: 'Chest', desc: 'Measure around the fullest part of your chest, keeping the tape horizontal.' },
  { title: 'Waist', desc: 'Measure around your natural waistline, typically just above the belly button.' },
  { title: 'Hips', desc: 'Measure around the fullest part of your hips, keeping the tape horizontal.' },
  { title: 'Inseam', desc: 'Measure from the crotch seam to the bottom of the leg along the inner seam.' },
];

export default function SizeGuide() {
  return (
    <Layout>
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Ruler size={24} className="text-pan-accent" />
            <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-pan-white">
              Size Guide
            </h1>
          </div>
          <p className="text-pan-muted">
            Find your perfect fit with our comprehensive size charts. When in doubt, size up for our relaxed streetwear fits.
          </p>
        </div>

        {/* Fit Note */}
        <div className="mb-8 bg-pan-accent/10 border border-pan-accent/30 rounded-sm p-4">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-pan-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-pan-white mb-1">P.A.N Fit Guide</p>
              <p className="text-sm text-pan-muted">
                Most P.A.N pieces are designed with a relaxed, oversized fit. If you prefer a more tailored look, consider sizing down. For our standard oversized aesthetic, go with your regular size.
              </p>
            </div>
          </div>
        </div>

        {/* Size Charts */}
        <div className="space-y-8 mb-12">
          {Object.values(sizeCharts).map((chart, index) => (
            <div key={index} className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h2 className="text-lg font-grotesk font-bold text-pan-white">{chart.title}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-pan-gray">
                      {chart.headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-xs font-semibold text-pan-muted uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {chart.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-pan-gray/50 transition-colors">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-4 py-3 text-sm ${
                              j === 0 ? 'font-medium text-pan-accent' : 'text-pan-white'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Measuring Tips */}
        <div className="bg-pan-dark border border-white/5 rounded-sm p-6 mb-8">
          <h2 className="text-lg font-grotesk font-bold text-pan-white mb-4">How to Measure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {measuringTips.map((tip, index) => (
              <div key={index} className="p-4 bg-pan-gray rounded-sm">
                <h3 className="text-sm font-semibold text-pan-accent mb-2">{tip.title}</h3>
                <p className="text-xs text-pan-muted leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* International Size Conversion */}
        <div className="bg-pan-dark border border-white/5 rounded-sm p-6 mb-8">
          <h2 className="text-lg font-grotesk font-bold text-pan-white mb-4">International Size Conversion</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-pan-gray">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-pan-muted uppercase">P.A.N Size</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-pan-muted uppercase">US</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-pan-muted uppercase">UK</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-pan-muted uppercase">EU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-pan-gray/50">
                  <td className="px-4 py-3 text-sm font-medium text-pan-accent">S</td>
                  <td className="px-4 py-3 text-sm text-pan-white">Small</td>
                  <td className="px-4 py-3 text-sm text-pan-white">8-10</td>
                  <td className="px-4 py-3 text-sm text-pan-white">44-46</td>
                </tr>
                <tr className="hover:bg-pan-gray/50">
                  <td className="px-4 py-3 text-sm font-medium text-pan-accent">M</td>
                  <td className="px-4 py-3 text-sm text-pan-white">Medium</td>
                  <td className="px-4 py-3 text-sm text-pan-white">10-12</td>
                  <td className="px-4 py-3 text-sm text-pan-white">48-50</td>
                </tr>
                <tr className="hover:bg-pan-gray/50">
                  <td className="px-4 py-3 text-sm font-medium text-pan-accent">L</td>
                  <td className="px-4 py-3 text-sm text-pan-white">Large</td>
                  <td className="px-4 py-3 text-sm text-pan-white">12-14</td>
                  <td className="px-4 py-3 text-sm text-pan-white">52-54</td>
                </tr>
                <tr className="hover:bg-pan-gray/50">
                  <td className="px-4 py-3 text-sm font-medium text-pan-accent">XL</td>
                  <td className="px-4 py-3 text-sm text-pan-white">X-Large</td>
                  <td className="px-4 py-3 text-sm text-pan-white">14-16</td>
                  <td className="px-4 py-3 text-sm text-pan-white">56-58</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-pan-dark border border-white/5 rounded-sm p-6 text-center">
          <h3 className="text-lg font-grotesk font-bold text-pan-white mb-2">
            Still not sure about your size?
          </h3>
          <p className="text-sm text-pan-muted mb-4">
            Our team is happy to help you find the perfect fit.
          </p>
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pan-accent text-white font-medium rounded-sm hover:bg-red-600 transition-all"
          >
            Chat with Us on WhatsApp
          </a>
        </div>
      </div>
    </div>
    </Layout>
  );
}
