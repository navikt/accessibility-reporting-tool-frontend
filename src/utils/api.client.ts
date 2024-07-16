interface Props {
  url: string;
  method: string;
}

export const fetcher = async ({ url, method = 'GET' }: Props) => {
  const response = await fetch(url, {
    method: method,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Fetch request failed');
  }

  return await response.json();
};
