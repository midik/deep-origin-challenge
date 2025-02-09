'use client';

import React, { useState } from 'react';

const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';

function Page() {
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
      const response = await fetch(`${backendUrl}/url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: inputUrl,
          // userId: 'b9077855-7290-4c63-a13a-33f32f95840e', // todo
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      const { baseUrl, slug } = data;
      const fullShortUrl = `${baseUrl}/${slug}`;
      setShortUrl(fullShortUrl);
      setSuccess(true);

    } catch (err) {
      console.error(err);
      setError((err as Error).message || 'Something went wrong');
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
