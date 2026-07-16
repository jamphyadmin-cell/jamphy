"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug, initialViews }) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const viewKey = `viewed_post_${slug}`;
    if (!sessionStorage.getItem(viewKey)) {
      fetch(`/api/blog/${slug}/view`, { method: "POST" })
        .then(res => res.json())
        .then(data => {
          if (data.views !== undefined) {
            setViews(data.views);
          } else {
            // fallback: just increment the displayed count locally
            setViews(v => v + 1);
          }
          sessionStorage.setItem(viewKey, "true");
        })
        .catch(console.error);
    }
  }, [slug]);

  return (
    <span className="flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px]">visibility</span>
      {views} views
    </span>
  );
}
