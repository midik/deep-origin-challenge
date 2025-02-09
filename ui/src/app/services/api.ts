// TODO refactor this

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:3000';

export const api = {

  getUrls: async () => {
    const response = await fetch(`${backendUrl}/url`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return response.json();
    }
    console.error('Error:', response.statusText);
  },

  postUrl: async ({ url }: { url: string }): Promise<string> => {
    const response = await fetch(`${backendUrl}/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        // userId: 'b9077855-7290-4c63-a13a-33f32f95840e', // todo
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    const { baseUrl, slug } = await response.json();
    return `${baseUrl}/${slug}`;
  },

  patchUrl: async ({ id, slug }: { id: string; slug: string }) => {
    const response = await fetch(`${backendUrl}/url/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ slug }),
    });
    return response.json();
  },

  deleteUrl: async ({ id }: { id: string }) => {
    const response = await fetch(`${backendUrl}/url/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ id }),
    });
    return await response.json();
  },
};
