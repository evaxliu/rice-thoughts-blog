import { wisp } from "@/src/lib/wisp";
import PostFeed from "../components/Postfeed";

export default async function FoodReviews() {
  const result = await wisp.getPosts({ limit: "all", tags: ["Food"] });

  return (
    <PostFeed
      posts={result.posts}
      eyebrow="FEATURED REVIEW"
      emptyTitle="Food Reviews"
      emptyDescription="Coming soon."
    />
  );
}