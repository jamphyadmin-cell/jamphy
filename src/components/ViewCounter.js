"use client";

import { useEffect } from "react";

export default function ViewCounter({ slug }) {
  useEffect(() => {
    // Only increment view if we haven't tracked it in this session to prevent spam
    const viewKey = `viewed_post_${slug}`;
    if (!sessionStorage.getItem(viewKey)) {
      fetch(`/api/blog/${slug}/view`, { method: "POST" })
        .then(res => {
          if (res.ok) {
            sessionStorage.setItem(viewKey, "true");
          }
        })
        .catch(console.error);
    }
  }, [slug]);

  return null; // This component doesn't render anything
}
