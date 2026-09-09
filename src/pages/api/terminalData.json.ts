import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  const sorted = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const latestPost = sorted[0];

  const projects = await getCollection("projects");
  const sortedProjects = projects.sort(
    (a, b) => b.data.year.valueOf() - a.data.year.valueOf(),
  );

  const latestProj = sortedProjects[0];

  return new Response(
    JSON.stringify({
      latestPost: latestPost
        ? {
            id: latestPost.id,
            title: latestPost.data.title,
            url: `/blog/${latestPost.id}`,
          }
        : null,
      latestProj: latestProj
        ? {
            id: latestProj.id,
            title: latestProj.data.title,
            url: `/projects/${latestProj.id}`,
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
