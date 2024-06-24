interface Props {
  url: string;
  options?: object;
}

export const fetcher = async ({ url }: Props) => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return response.json().then((jsonData) => {
    return { statusCode: response.status, data: jsonData };
  });;
};