import Link from "next/link";
import React from "react";

import { NotFoundSeo } from "@/components/seo/NotFoundSeo";


function Custom404() {

  return (
    <>
      <NotFoundSeo />
      <div className="min-h-screen bg-gray-100">

        <div className="py-10">
          <header className="mb-4">
            <div className="container px-8">Page not found</div>
          </header>
          <main>
            <div className="container px-8">
              <Link href={'/'} passHref>
                <a href="pass">Go back home</a>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Custom404;
