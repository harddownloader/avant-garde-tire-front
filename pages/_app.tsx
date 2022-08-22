import "styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NextNProgress from "nextjs-progressbar";
import React, { ReactElement, ReactNode } from "react";

import { RegionsProvider } from "@/components/RegionsProvider";
import { SaleorProviderWithChannels } from "@/components/SaleorProviderWithChannels";
import apolloClient from "@/lib/graphql";
import { CheckoutProvider } from "@/lib/providers/CheckoutProvider";

import tailwindConfig from "../tailwind.config";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <CheckoutProvider>
        <RegionsProvider>
          <SaleorProviderWithChannels>
            <ThemeProvider enableSystem attribute="class">
              <NextNProgress
                color={tailwindConfig.theme.extend.colors.brand.DEFAULT || "green"}
                options={{ showSpinner: false }}
              />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </SaleorProviderWithChannels>
        </RegionsProvider>
      </CheckoutProvider>
    </ApolloProvider>
  );
}

export default MyApp;
