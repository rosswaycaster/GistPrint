import React, { useState, useEffect } from 'react';
import { GistData } from './types';
import { extractGistId, fetchGist } from './services/github';
import { GistContent } from './components/GistContent';
import { Button } from './components/Button';
import { Search, Printer, RotateCcw, Github } from 'lucide-react';

const App: React.FC = () => {
  const [url, setUrl] = useState('');
  const [gistData, setGistData] = useState<GistData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Focus input on load
  useEffect(() => {
    const input = document.getElementById('gist-url-input');
    if (input) input.focus();
  }, []);

  const handleLoad = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setError(null);
    const id = extractGistId(url);
    
    if (!id) {
      setError('Invalid Gist URL. Please check the link and try again.');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchGist(id);
      setGistData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch Gist');
      setGistData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGistData(null);
    setUrl('');
    setError(null);
    // Timeout to allow render to clear before focusing
    setTimeout(() => {
        const input = document.getElementById('gist-url-input');
        if (input) input.focus();
    }, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col print:block">
      {/* Top Navigation - Hidden on Print */}
      <nav className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8 no-print sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-900">
            <div className="bg-gray-900 text-white p-1.5 rounded-lg">
                <Github size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">GistPrint</span>
          </div>
          
          {gistData && (
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={handleReset} 
                className="text-sm hidden sm:flex"
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
              <Button 
                onClick={handlePrint}
                icon={<Printer className="w-4 h-4" />}
              >
                Print
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:w-full">
        {!gistData ? (
          <div className="max-w-xl mx-auto mt-12 sm:mt-24 text-center no-print">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
              Print your Gists beautifully.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Paste a GitHub Gist URL below to generate a clean, distraction-free document ready for printing or PDF export.
            </p>

            <form onSubmit={handleLoad} className="relative max-w-lg mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="gist-url-input"
                  type="text"
                  className="block w-full pl-11 pr-32 py-4 border-2 border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-lg transition-all shadow-sm hover:border-gray-300"
                  placeholder="https://gist.github.com/username/id"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                />
                <div className="absolute inset-y-2 right-2 flex items-center">
                  <Button 
                    type="submit" 
                    isLoading={loading}
                    className="h-full rounded-xl px-6"
                    disabled={!url}
                  >
                    Load
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-center justify-center animate-fade-in">
                <span className="bg-red-100 p-1 rounded-full mr-2">
                    <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                </span>
                {error}
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm text-gray-500">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3">
                  <Search className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">1. Paste URL</span>
                <span className="mt-1">Copy the link from your browser</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-full mb-3">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">2. Process</span>
                <span className="mt-1">We fetch and format the markdown</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-green-50 text-green-600 rounded-full mb-3">
                  <Printer className="w-5 h-5" />
                </div>
                <span className="font-medium text-gray-900">3. Print</span>
                <span className="mt-1">Print to paper or Save as PDF</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <GistContent data={gistData} />
            <div className="mt-8 text-center no-print">
               <button 
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-600 text-sm underline decoration-dotted"
               >
                 Load a different Gist
               </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer - Hidden on Print */}
      <footer className="py-6 text-center text-sm text-gray-400 no-print">
        <p>&copy; {new Date().getFullYear()} GistPrint. Not affiliated with GitHub.</p>
      </footer>
    </div>
  );
};

export default App;
