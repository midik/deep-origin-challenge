// TODO refactor this

export const api = {

  getUrls: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/url`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return response.json();
    } else {
      console.error('Error:', response.statusText);
    }
  },

  postUrl: async ({ url }: { url: string }): Promise<string> => {
    const response = await fetch(`${process.env.BACKEND_URL}/url`, {
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

  deleteUrl: async ({ id }: { id: string }) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/url`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ id }),
    });

    alert('Not implemented yet');

    return response;
  },
};
