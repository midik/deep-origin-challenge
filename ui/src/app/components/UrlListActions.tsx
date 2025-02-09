'use client';

import React from 'react';
import { api } from '@/app/services/api';


async function handleDelete(
  e: React.MouseEvent<HTMLButtonElement>,
  id: string,
) {
  await api.deleteUrl({ id });
}

function UrlListActions({
  id,
  handleEditUrl,
}: {
  id: string;
  handleEditUrl: (id: string) => void;
}) {
  return (
    <div className={'actions'}>
      <button id={id} className={'action'} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleEditUrl((e.target as HTMLInputElement).id);
      }}
      >
        Edit
      </button>
      <button className={'action'} onClick={(e) => handleDelete(e, id)}>
        Delete
      </button>
    </div>
  );
}

export default UrlListActions;
