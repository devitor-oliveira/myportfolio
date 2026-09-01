import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  const sorted = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const latestPost = sorted[0];

  return new Response(
    JSON.stringify({
      latestPost: latestPost
        ? {
            id: latestPost.id,
            title: latestPost.data.title,
            url: `/blog/${latestPost.id}`,
          }
        : null,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
