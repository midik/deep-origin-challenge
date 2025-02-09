import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/app/services/api';
import { GetUrlResponseDto } from '../../src/url/dto/get-url.response.dto';


let urlMap: string[] | null = null;

export async function middleware(request: NextRequest) {
  // skip redirecting for the root path (admin page)
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  // skip redirecting for long paths and favicon
  const chunks = request.nextUrl.pathname.split('/');
  if (chunks.length > 2 || chunks[1] == 'favicon.ico') {
    return NextResponse.next();
  }

  // fetch urls from the database (if not already fetched)
  if (!urlMap) {
    const urls = await api.getUrls();
    urlMap = urls.reduce((acc, url) => {
      acc[url.slug] = url;
      return acc;
    }, {});
  }

  if (!urlMap) {
    console.log('urlMap is empty');
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname.slice(1);
  const redirectData = (await urlMap[pathname]) as GetUrlResponseDto;

  if (redirectData) {
    // increment tracking count (no wait)
    api.patchUrlTracking({ id: redirectData.id })
      .then(() => console.log(`hit: ${redirectData.id}`))
      .catch((err) => console.error(err));

    const destination = redirectData.url;
    return NextResponse.redirect(destination, 307);
  }

  // no redirect found, redirect to 404
  const base = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001';
  console.log({ base });

  return NextResponse.rewrite(`${base}/404`);
}
