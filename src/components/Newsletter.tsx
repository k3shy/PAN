import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phone) {
      setSubscribed(true);
      setEmail('');
      setPhone('');
    }
  };

  return (
    <section className="py-20 md:py-32 bg-pan-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pan-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pan-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <p className="text-sm tracking-[0.3em] text-pan-accent mb-3">STAY CONNECTED</p>
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold tracking-tight mb-4">
            Join the P.A.N Family
          </h2>
          <p className="text-pan-muted">
            Sign up for SMS & email alerts on new product drops, exclusive sales, and early access to limited editions.
          </p>
        </div>

        {subscribed ? (
          <div className="text-center p-8 bg-pan-accent/10 border border-pan-accent/30 rounded-sm">
            <p className="text-pan-accent font-semibold text-lg">Welcome to the family! 🎉</p>
            <p className="text-pan-muted text-sm mt-2">You'll be the first to know about new drops.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-5 py-4 bg-pan-gray border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
                />
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number (for SMS)"
                  className="w-full px-5 py-4 bg-pan-gray border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-pan-accent text-white font-semibold rounded-sm hover:bg-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-pan-accent/20"
            >
              <Send size={18} />
              Subscribe
            </button>
            <p className="text-xs text-pan-muted">
              By subscribing, you agree to receive marketing messages. Reply STOP to unsubscribe.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
