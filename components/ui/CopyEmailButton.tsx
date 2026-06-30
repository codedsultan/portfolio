'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — ignore silently, mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy email address"
      className="inline-flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1 text-[12px] text-slate transition-colors hover:border-blue hover:text-blue"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
