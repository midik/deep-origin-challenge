// TODO refactor this

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:3000';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};


export const api = {

  getUrls: async () => {
    const response = await fetch(`${backendUrl}/url`, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      console.error(response);
      throw new Error('Something went wrong');
    }
    return response.json();
  },

  postUrl: async ({ url }: { url: string }): Promise<string> => {
    const response = await fetch(`${backendUrl}/url`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        url,
        // userId: 'b9077855-7290-4c63-a13a-33f32f95840e', // todo
      }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Something went wrong');
    }

    const { baseUrl, slug } = await response.json();
    return `${baseUrl}/${slug}`;
  },

  patchUrl: async ({ id, slug }: { id: string; slug: string }) => {
    const response = await fetch(`${backendUrl}/url/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ slug }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Something went wrong');
    }
    return response.json();
  },

  deleteUrl: async ({ id }: { id: string }) => {
    const response = await fetch(`${backendUrl}/url/${id}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error('Something went wrong');
    }
    return await response.json();
  },

  patchUrlTracking: async ({ id }: { id: string }) => {
    const response = await fetch(`${backendUrl}/url/${id}/hit`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      console.error(response);
      throw new Error('Something went wrong');
    }
    return await response.json();
  }
};
