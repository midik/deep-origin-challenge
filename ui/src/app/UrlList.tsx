import React from 'react';
import { GetUrlResponseDto } from '../../../src/url/dto/get-url.response.dto';

const backendUrl = process.env.BACKEND_URL;

async function UrlList() {
  let urls = [];

  try {
    const response = await fetch(`${backendUrl}/url`, {
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
                  <div className={'actions'}>
                    <button className={'action'}>Edit</button>
                    <button className={'action'}>Delete</button>
                  </div>
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
