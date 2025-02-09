'use client';

import React from 'react';

function UrlListActions({
  id,
  isEditMode,
  handleEditUrl,
  handleDeleteUrl,
}: {
  id: string;
  isEditMode: boolean;
  handleEditUrl: (id: string) => void;
  handleDeleteUrl: (id: string) => void;
}) {
  return (
    <div className={'actions'}>
      <button
        id={id}
        className={'action'}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleEditUrl((e.target as HTMLInputElement).id);
        }}
      >
        Edit
      </button>

      <button
        id={id}
        disabled={isEditMode}
        className={'action'}
        onClick={(e) => {
          e.preventDefault();
          handleDeleteUrl((e.target as HTMLInputElement).id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default UrlListActions;
