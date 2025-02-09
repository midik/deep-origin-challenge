'use client';

import React, { useCallback, useEffect, useState } from 'react';
import UrlList from '@/app/components/UrlList';
import { api } from '@/app/services/api';
import Page from '@/app/page';
import './globals.css';
import { GetUrlResponseDto } from '../../../src/url/dto/get-url.response.dto';


export default function RootLayout() {
  const [urls, setUrls] = useState<GetUrlResponseDto[]>([]);
  const fetchUrls = useCallback(async () => {
    setUrls(await api.getUrls());
  }, []);

  useEffect(() => void fetchUrls(), [fetchUrls]);

  return (
    <html lang="en">
      <body>
        <div>
          <h1>URL Shortener</h1>
          <hr />
          <Page onRefresh={fetchUrls} />
          <hr />
          <UrlList urls={urls} />
        </div>
      </body>
    </html>
  );
}
