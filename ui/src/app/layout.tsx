'use client';

import React, { useCallback, useEffect, useState } from 'react';
import UrlList from '@/app/components/UrlList';
import AddEditUrl from '@/app/addEditUrl';
import { api } from '@/app/services/api';
import { Url } from '@prisma/client';
import './globals.css';
import { GetUrlResponseDto } from '../../../src/url/dto/get-url.response.dto';

export default function RootLayout() {
  const [isEditMode, setIsEditMode] = useState(false); // remove this
  const [editableUrl, setEditableUrl] = useState({
    id: '',
    baseUrl: '',
    slug: '',
  });
  const [urls, setUrls] = useState<GetUrlResponseDto[]>([]);

  const fetchUrls = useCallback(async () => {
    setUrls(await api.getUrls());
  }, []);

  useEffect(() => void fetchUrls(), [fetchUrls]);

  function handleEditUrl(id: string) {
    const editableUrl = urls.find((url) => url.id === id);
    setIsEditMode(true);
    setEditableUrl(editableUrl as Pick<Url, 'id' | 'slug' | 'baseUrl'>);
    // console.log({ isEditMode, editableUrl });
  }

  async function handleDeleteUrl(id: string) {
    await api.deleteUrl({ id });
    await fetchUrls();
  }

  function handleCancelUpdate() {
    setIsEditMode(false);
    // console.log({ isEditMode });
  }

  async function handleUpdate(id: string, slug: string) {
    setIsEditMode(false);
    await api.patchUrl({ id, slug });
    await fetchUrls();
  }

  return (
    <html lang="en">
      <body>
        <div>
          <h1>URL Shortener</h1>
          <hr />
          <AddEditUrl
            onUrlListRefresh={fetchUrls}
            isEditMode={isEditMode}
            editableUrl={editableUrl}
            setEditableUrl={setEditableUrl}
            handleUpdate={handleUpdate}
            handleCancelUpdate={handleCancelUpdate}
          />
          <hr />
          <UrlList
            urls={urls}
            isEditMode={isEditMode}
            handleEditUrl={handleEditUrl}
            handleDeleteUrl={handleDeleteUrl}
            fetchUrls={fetchUrls}
          />
        </div>
      </body>
    </html>
  );
}
