"use client";

import React, { useState } from 'react';
import axios from 'axios';

// Type for the expected response based on your n8n workflow output
interface NewsResponse {
  success: boolean;
  message: string;
  data: string[];
  total: number;
  generatedAt: string;
}

export default function HRNewsPage() {
  const [loading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call our Next.js API route using POST and axios
      const res = await axios.post('/api/HR_news_Automation');
      const data = res.data;
      
      // The provided n8n response is an array containing the data object
      if (Array.isArray(data) && data.length > 0) {
        setNewsData(data[0]);
      } else {
        setNewsData(data);
      }
    } catch (err: any) {
      const errorResponse = err.response?.data?.error || err.response?.data || err.message;
      setError(typeof errorResponse === 'string' ? errorResponse : JSON.stringify(errorResponse));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">
            HR AI News Automation
          </h1>
          <p className="text-lg text-gray-600">
            Trigger the n8n workflow to fetch the latest AI news and updates tailored for HR professionals.
          </p>
        </header>

        <div className="flex justify-center mb-10">
          <button 
            onClick={fetchNews}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Running n8n Workflow...</span>
              </>
            ) : (
              <span>Trigger News Automation</span>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded shadow-sm" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading Skeleton Animation */}
        {loading && !newsData && (
          <div className="space-y-6 mt-8">
             {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
             ))}
          </div>
        )}

        {/* News Data Display */}
        {newsData && !loading && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-blue-900">
                  {newsData.message}
                </h2>
              </div>
              <span className="text-xs font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full w-fit">
                {new Date(newsData.generatedAt).toLocaleString()}
              </span>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="space-y-8">
                {newsData.data.map((articleBlock, blockIndex) => {
                   // Split by double newline to separate individual news items
                   const articles = articleBlock.split('\n\n').filter(Boolean);
                   return (
                     <div key={blockIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles.map((article, i) => (
                          <div key={i} className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                              {article}
                            </p>
                          </div>
                        ))}
                     </div>
                   )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
