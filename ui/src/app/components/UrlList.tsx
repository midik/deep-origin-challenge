'use client';

import React from 'react';
import { GetUrlResponseDto } from '../../../../src/url/dto/get-url.response.dto';
import UrlListActions from '@/app/components/UrlListActions';

function UrlList({
  urls = [],
  isEditMode,
  handleEditUrl,
  handleDeleteUrl,
}: {
  urls: GetUrlResponseDto[];
  isEditMode: boolean;
  handleEditUrl: (id: string) => void;
  handleDeleteUrl: (id: string) => void;
}) {
  return (
    <div>
      <table>
        <tbody>
          {urls.map((url: GetUrlResponseDto) => {
            const shortUrl = `${url.baseUrl}/${url.slug}`;
            return (
              <tr key={'tr-' + url.id}>
                <td>
                  <UrlListActions
                    id={url.id}
                    isEditMode={isEditMode}
                    handleEditUrl={handleEditUrl}
                    handleDeleteUrl={handleDeleteUrl}
                  />
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
