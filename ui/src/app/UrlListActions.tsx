'use client';

import React from 'react';

async function handleEdit(e, id: string) {
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

async function handleDelete(e, id: string) {
  e.preventDefault();

  alert('Not implemented yet');

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/url`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ id }),
    });

  } catch (err) {
    console.error(err);
  }
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
