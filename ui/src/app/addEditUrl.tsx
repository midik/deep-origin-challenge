'use client';

// TODO split form

import React, { useState } from 'react';
import { api } from '@/app/services/api';

function AddEditUrl({
  onRefresh,
  isEditMode,
  editableUrl,
  setEditableUrl,
  handleUpdate,
  handleCancelUpdate,
}: {
  onRefresh: () => void;
  isEditMode: boolean;
  editableUrl: { id: string; baseUrl: string; slug: string };
  setEditableUrl: (url: { id: string; baseUrl: string; slug: string }) => void;
  handleUpdate: (id: string, slug: string) => void;
  handleCancelUpdate: () => void;
}) {
  const [inputUrl, setInputUrl] = useState('http://google.com');
  const [shortUrl, setShortUrl] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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

  const handleCopy = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div>
      <div>
        {isEditMode && (
          <span>
            <span className="label-url">{editableUrl.baseUrl}/</span>
          </span>
        )}

        <input
          type="text"
          placeholder="Enter URL"
          className={'url-input' + (isEditMode ? ' edit' : '')}
          value={isEditMode ? editableUrl.slug : inputUrl}
          onChange={(e) =>
            isEditMode
              ? setEditableUrl({
                  id: editableUrl.id,
                  baseUrl: editableUrl.baseUrl,
                  slug: e.target.value,
                })
              : setInputUrl(e.target.value)
          }
        />

        {isEditMode && (
          <span>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleUpdate(
                  (e.target as HTMLInputElement).id,
                  (e.target as HTMLInputElement).value,
                );
              }}
              className={'update'}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleCancelUpdate();
              }}
              className={'cancel'}
              disabled={loading}
            >
              Cancel
            </button>
          </span>
        )}

        {!isEditMode && (
          <button
            onClick={handleShorten}
            className={'shorten'}
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        )}

        {!isEditMode && error && <span className="result-error">{error}</span>}

        {!isEditMode && success && (
          <span>
            <span className="label-url" onClick={handleCopy}>
              {shortUrl}
            </span>
            {copied && <span className="label-hint">Copied!</span>}
            {!copied && <span className="label-hint">(click to copy)</span>}
          </span>
        )}
      </div>
    </div>
  );
}

export default AddEditUrl;
