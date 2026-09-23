import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const faqCategories = [
  {
    category: 'Orders & Shipping',
    faqs: [
      { q: 'How long does delivery take?', a: 'Nationwide delivery takes 24-48 hours for major cities and 3-5 business days for other areas. Express delivery is available for select locations.' },
      { q: 'Do you offer free shipping?', a: 'Yes! We offer free shipping on all orders over KSh 5,000. For orders below that, a flat rate of KSh 300 applies.' },
      { q: 'Can I track my order?', a: 'Absolutely! Once your order is shipped, you\'ll receive a tracking number via SMS and email. You can also track your order on our Order Tracking page.' },
      { q: 'Do you ship internationally?', a: 'Currently, we ship within Kenya only. International shipping will be available soon — sign up for our newsletter to be the first to know!' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    faqs: [
      { q: 'What is your return policy?', a: 'We accept returns within 7 days of delivery for items in original condition with tags attached. Custom or personalized items are not eligible for return.' },
      { q: 'How do I initiate a return?', a: 'Email us at returns@pinsandneedle.com with your order number and reason for return. We\'ll provide you with a return shipping label within 24 hours.' },
      { q: 'Can I exchange for a different size?', a: 'Yes! Size exchanges are free of charge. Simply contact us within 7 days and we\'ll arrange the exchange.' },
      { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after we receive the returned item. M-Pesa refunds are instant, while card refunds may take 3-5 business days.' },
    ],
  },
  {
    category: 'Sizing & Fit',
    faqs: [
      { q: 'How do I find my size?', a: 'Check our Size Guide page for detailed measurements. Each product page also includes specific fit notes. When in between sizes, we recommend sizing up for our oversized fits.' },
      { q: 'Are your items true to size?', a: 'Most of our items are designed with a relaxed/oversized fit. Check individual product descriptions for specific fit details.' },
      { q: 'What if the item doesn\'t fit?', a: 'No worries! You can exchange for a different size within 7 days at no extra cost.' },
    ],
  },
  {
    category: 'Payments',
    faqs: [
      { q: 'What payment methods do you accept?', a: 'We accept M-Pesa, Airtel Money, Pesapal, Visa, Mastercard, and American Express.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. All transactions are encrypted and processed through secure payment gateways. We never store your card details.' },
      { q: 'Can I pay in installments?', a: 'We currently don\'t offer installment plans, but we\'re working on it! Stay tuned for updates.' },
    ],
  },
  {
    category: 'Products & Care',
    faqs: [
      { q: 'What materials do you use?', a: 'We use premium heavyweight cotton (280-320 GSM), organic cotton blends, and durable technical fabrics. All materials are ethically sourced.' },
      { q: 'How should I care for my P.A.N items?', a: 'Machine wash cold with similar colors. Tumble dry low or hang dry. Avoid bleach and iron directly on prints/embroidery.' },
      { q: 'Are your items limited edition?', a: 'Some collections are limited drops with numbered pieces. Once sold out, they won\'t be restocked. Check product descriptions for availability.' },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFaq = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const filteredCategories = faqCategories
    .map(cat => ({
      ...cat,
      faqs: cat.faqs.filter(faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(cat => cat.faqs.length > 0)
    .filter(cat => activeCategory === 'all' || cat.category === activeCategory);

  return (
    <div className="min-h-screen bg-pan-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-pan-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-pan-muted">
            Find answers to common questions about orders, shipping, returns, and more.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pan-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-4 bg-pan-dark border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${
              activeCategory === 'all'
                ? 'bg-pan-accent text-white'
                : 'bg-pan-dark text-pan-muted hover:text-pan-white border border-white/5'
            }`}
          >
            All
          </button>
          {faqCategories.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${
                activeCategory === cat.category
                  ? 'bg-pan-accent text-white'
                  : 'bg-pan-dark text-pan-muted hover:text-pan-white border border-white/5'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredCategories.map(cat => (
            <div key={cat.category} className="mb-8">
              <h2 className="text-lg font-grotesk font-bold text-pan-accent mb-4">{cat.category}</h2>
              <div className="space-y-2">
                {cat.faqs.map((faq, index) => {
                  const key = `${cat.category}-${index}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={key}
                      className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(key)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-pan-gray/50 transition-colors"
                      >
                        <span className="text-sm font-medium text-pan-white pr-4">{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-pan-muted flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-0">
                          <p className="text-sm text-pan-muted leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-pan-muted">No FAQs found matching your search.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-pan-dark border border-white/5 rounded-sm p-8 text-center">
          <h3 className="text-xl font-grotesk font-bold text-pan-white mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-pan-muted mb-6">
            Our support team is here to help. Reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@pinsandneedle.com"
              className="px-6 py-3 bg-pan-accent text-white font-medium rounded-sm hover:bg-red-600 transition-all"
            >
              Email Support
            </a>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-sm hover:bg-white/5 transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
