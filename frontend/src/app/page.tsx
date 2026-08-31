import { wisp } from "@/src/lib/wisp";
import PostFeed from "./components/Postfeed";

export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await wisp.getPosts({ limit: "all" });

  return (
    <PostFeed
      posts={result.posts}
      eyebrow="FEATURED"
      emptyTitle="Nothing published yet"
      emptyDescription="New essays on food, society and politics will show up here."
    />
  );
}