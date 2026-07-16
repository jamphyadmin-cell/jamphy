"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug, initialViews }) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    // Fire the view increment on every unique page load (no sessionStorage blocking)
    fetch(`/api/blog/${slug}/view`, { method: "POST" })
      .then(res => res.json())
      .then(data => {
        if (data.views !== undefined) {
          setViews(data.views);
        } else {
          setViews(v => (v ?? 0) + 1);
        }
      })
      .catch(console.error);
  }, [slug]);

  return (
    <span className="flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px]">visibility</span>
      {views ?? 0} views
    </span>
  );
}
