import React from 'react';
import { GetUrlResponseDto } from '../../../src/url/dto/get-url.response.dto';
import UrlListActions from '@/app/UrlListActions';

async function UrlList() {
  let urls = [];

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/url`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    urls = await response.json();
  } catch (err) {
    console.error(err);
  }

  console.log(urls);

  return (
    <div>
      <table>
        <tbody>
          {urls.map((url: GetUrlResponseDto) => {
            const shortUrl = `${url.baseUrl}/${url.slug}`;
            return (
              <tr key={'tr-' + url.id}>
                <td>
                  <UrlListActions id={url.id} />
                </td>
                <td className="short-url">
                  <a href={shortUrl}>{shortUrl}</a>
                </td>
                <td className="original-url">
                  <a href={url.url}>{url.url}</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UrlList;
