import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-20">
        <div className="text-center px-4">
          <h1 className="text-[10rem] md:text-[15rem] font-grotesk font-bold text-pan-accent/20 leading-none">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-grotesk font-bold text-pan-white -mt-12 mb-4">
            Page Not Found
          </h2>
          <p className="text-pan-muted mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pan-accent text-white font-medium rounded-sm hover:bg-red-600 transition-all"
            >
              <Home size={18} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-sm hover:bg-white/5 hover:border-white/40 transition-all"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
