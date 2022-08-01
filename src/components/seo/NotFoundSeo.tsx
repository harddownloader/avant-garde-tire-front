import { NextSeo } from "next-seo";

import { BLOG_NAME } from "@/lib/const";

export function NotFoundSeo() {
  const title = `Page Not found - ${BLOG_NAME}`;
  const description = "Page not found.";

  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        images: [
          {
            url: "/logo.png",
            alt: BLOG_NAME,
          },
        ],
        site_name: BLOG_NAME,
      }}
    />
  );
}

export default NotFoundSeo;
