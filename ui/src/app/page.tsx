'use client';

import React, { useState } from 'react';
import { api } from '@/app/services/api';


function Page({ onRefresh }: { onRefresh: () => void }) {
  const [inputUrl, setInputUrl] = useState('http://google.com');
  const [shortUrl, setShortUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setCopied(false);

    try {
      const shortUrl = await api.postUrl({ url: inputUrl });
      setShortUrl(shortUrl);
      onRefresh();
      setSuccess(true);

    } catch (err) {
      console.error(err);
      // @ts-ignore
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter URL"
          className={'url-input'}
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button
          onClick={handleShorten}
          className={'shorten'}
          disabled={loading}
        >
          {loading ? 'Shortening...' : 'Shorten'}
        </button>

        {error && <span className="result-error">{error}</span>}

        {success && (
          <span>
            <span className='label-url' onClick={handleCopy}>{shortUrl}</span>
            {copied && (
              <span className='label-hint'>Copied!</span>
            )}
            {!copied && (
              <span className='label-hint'>(click to copy)</span>
            )}
          </span>
        )}

      </div>
    </div>
  );
}

export default Page;
