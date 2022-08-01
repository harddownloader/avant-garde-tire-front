import { NextSeo } from "next-seo";

import { BLOG_NAME } from "@/lib/const";

interface BaseSeoProps {
  title?: string;
  description?: string;
}

export function BaseSeo({ title, description }: BaseSeoProps) {
  const seoTitle = title ? `${title} - ${BLOG_NAME}` : BLOG_NAME;
  const seoDescription = description || "";

  return (
    <NextSeo
      title={seoTitle}
      description={seoDescription}
      openGraph={{
        title: seoTitle,
        description: seoDescription,
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

export default BaseSeo;
