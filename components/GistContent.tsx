import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { GistData } from '../types';
import { Calendar, User, FileText } from 'lucide-react';

interface GistContentProps {
  data: GistData;
}

export const GistContent: React.FC<GistContentProps> = ({ data }) => {
  const files = Object.values(data.files);
  // Prioritize markdown files
  const markdownFiles = files.filter(f => f.language === 'Markdown' || f.filename.endsWith('.md'));
  // If no markdown, just take all files that have content
  const filesToRender = markdownFiles.length > 0 ? markdownFiles : files;

  if (filesToRender.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No content found in this Gist.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-sm sm:rounded-xl overflow-hidden print-content">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gray-50/50 p-6 print:p-0 print:bg-white print:border-b-2 print:border-gray-800 print:mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 font-serif">
            {Object.keys(data.files)[0]}
        </h1>
        {data.description && (
          <p className="text-lg text-gray-600 mb-5 font-serif italic">{data.description}</p>
        )}
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 print:text-xs print:text-gray-600">
          {data.owner && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5" />
              <span>{data.owner.login}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>{new Date(data.created_at).toLocaleDateString()}</span>
          </div>
          {/* Hidden on print to reduce noise */}
          <div className="flex items-center print:hidden">
            <FileText className="w-4 h-4 mr-1.5" />
            <a 
              href={data.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 underline decoration-dotted"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 print:p-0">
        {filesToRender.map((file, index) => (
          <div key={file.filename} className={`mb-12 ${index !== 0 ? 'border-t pt-8 print:break-before-page' : ''}`}>
             {filesToRender.length > 1 && (
               <div className="mb-6 font-mono text-sm text-gray-400 uppercase tracking-wider border-b pb-2">
                 {file.filename}
               </div>
             )}
            <article className="prose prose-slate prose-xl max-w-none print:prose-lg print:leading-relaxed">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {file.content || ''}
              </ReactMarkdown>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};