interface Props {
    url: string;
}

export const include = {
    credentials: "include",
};

export const fetcher = async ({ url }: Props) => {
    const response = await fetch(url, {
        method: "GET",

    });

    if (!response.ok) {
        throw new Error("Fetch request failed");
    }

    return await response.json();
};