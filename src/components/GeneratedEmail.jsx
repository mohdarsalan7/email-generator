import React, { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';

const GeneratedEmail = ({ generatedEmail }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedEmail)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert('Failed to copy email.'));
  };

  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 p-3 flex justify-between items-center">
        <h2 className="text-lg font-medium text-purple-300 flex items-center gap-2">
          <Mail size={18} /> Generated Email
        </h2>
        <button
          onClick={handleCopyToClipboard}
          className={`p-2 rounded-lg transition flex items-center gap-2 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
          }`}
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-b-lg text-gray-200 text-sm">
        <pre className="whitespace-pre-wrap font-sans leading-relaxed">
          {generatedEmail}
        </pre>
      </div>
    </div>
  );
};

export default GeneratedEmail;
