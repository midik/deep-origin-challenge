'use client';

import React from 'react';
import { api } from '@/app/services/api';

async function handleEdit(e: React.MouseEvent<HTMLButtonElement>, id: string) {
  e.preventDefault();

  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/url/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ slug: 'new-slug' }),
    });

    console.log(response);

  } catch (err) {
    console.error(err);
  }
}

async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: string) {
  await api.deleteUrl({ id });
}

function UrlListActions({ id }: { id: string }) {
  return (
    <div className={'actions'}>
      <button className={'action'} onClick={(e) => handleEdit(e, id)}>
        Edit
      </button>
      <button className={'action'} onClick={(e) => handleDelete(e, id)}>
        Delete
      </button>
    </div>
  );
}

export default UrlListActions;
