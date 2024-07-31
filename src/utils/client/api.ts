interface Props {
  url: string;
}

export const fetcher = async ({ url }: Props) => {
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Fetch request failed');
  }

  return await response.json();
};
