import type { Metadata } from 'next';
import React from 'react';
import UrlList from '@/app/UrlList';
import './globals.css';

export const metadata: Metadata = {
  title: 'URL Shortener',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <h1>URL Shortener</h1>
          <hr />
          {children}
          <hr />
          <UrlList />
        </div>
      </body>
    </html>
  );
}
