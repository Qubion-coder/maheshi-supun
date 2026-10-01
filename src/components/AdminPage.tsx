import React, { useState } from 'react';
import { weddingData } from '../data/weddingData';
import { Copy, Link as LinkIcon, MessageCircle } from 'lucide-react';

type Prefix = 'Mr.' | 'Mrs.' | 'Miss' | 'Mr. & Mrs.' | 'Family' | 'Dear';

export const AdminPage: React.FC = () => {
  const [prefix, setPrefix] = useState<Prefix>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    let displayName = guestName.trim();
    if (prefix === 'Mr.') displayName = `Mr. ${displayName}`;
    else if (prefix === 'Mrs.') displayName = `Mrs. ${displayName}`;
    else if (prefix === 'Miss') displayName = `Miss ${displayName}`;
    else if (prefix === 'Mr. & Mrs.') displayName = `Mr. & Mrs. ${displayName}`;
    else if (prefix === 'Family') displayName = `${displayName} and Family`;
    else if (prefix === 'Dear') displayName = displayName;

    const link = `${window.location.origin}/${encodeURIComponent(displayName)}`;
    setGeneratedLink(link);

    const greeting = `Dear ${displayName} ❤️`;
    
    const message = `${greeting}

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${weddingData.groomShort} & ${weddingData.brideShort}`;

    setGeneratedMessage(message);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyMessage = async () => {
    if (!generatedMessage) return;
    await navigator.clipboard.writeText(generatedMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f2117] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#e5c083] mb-2">Invitation Generator</h1>
          <p className="text-[#a2b8ab]">Create personalized links and WhatsApp messages</p>
        </div>

        <div className="bg-[#142b1e] rounded-3xl p-6 sm:p-8 border border-[#2b4c37] shadow-2xl">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-[#a0b5a7] mb-2">
                  Prefix
                </label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value as Prefix)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1811] border border-[#2b4c37] text-white focus:outline-none focus:border-[#8c6721] transition-colors"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss.</option>
                  <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                  <option value="Family">Family</option>
                  <option value="Dear">Dear</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#a0b5a7] mb-2">
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Sanjaya"
                  className="w-full px-4 py-3 rounded-xl bg-[#0c1811] border border-[#2b4c37] text-white focus:outline-none focus:border-[#8c6721] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-sm font-medium bg-gradient-to-r from-[#8c6721] via-[#e5c083] to-[#8c6721] text-[#102016] hover:brightness-110 transition-all shadow-lg flex justify-center items-center gap-2 cursor-pointer"
            >
              <LinkIcon className="w-4 h-4" />
              Generate Link & Message
            </button>
          </form>

          {generatedLink && (
            <div className="mt-10 space-y-8 animate-in fade-in duration-500">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#a0b5a7] uppercase tracking-wider">Generated Link</h3>
                <div className="p-4 bg-[#0c1811] rounded-xl border border-[#2b4c37] break-all text-[#e5c083] text-sm">
                  {generatedLink}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-[#a0b5a7] uppercase tracking-wider">Message Preview</h3>
                <div className="p-4 bg-[#0c1811] rounded-xl border border-[#2b4c37] text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {generatedMessage}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#2b4c37]/50">
                <button
                  onClick={copyLink}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-medium border border-[#8c6721] text-[#e5c083] hover:bg-[#8c6721]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  {copiedLink ? 'Link Copied!' : 'Copy Link Only'}
                </button>
                <button
                  onClick={copyMessage}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-medium border border-[#8c6721] text-[#e5c083] hover:bg-[#8c6721]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  {copiedMessage ? 'Message Copied!' : 'Copy Full Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
