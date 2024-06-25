export async function fetchGetJSON(url: string) {
    try {
      const data = await fetch(url).then((res) => res.json());
  
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
  }
  export async function fetchRelatedMarkets(headline: string) {
    try {
      const response = await fetch('https://api.data.adj.news/api/markets/headline/' + headline, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw err;
    }
  }
  