# Avangard Front

Please note: this project use the [pnpm](https://pnpm.io/) package manager. To install it, run:

```bash
npm install -g pnpm
```

Install dependencies:

```bash
pnpm i
```

Start the dev server:

```bash
pnpm dev
```

Storefront can be now accessed at http://localhost:3001/.

## Development

### Configuration

Instructions how to configure the application (e.g. change the graphql API URL) can be found [here](docs/configuration.md).

### GraphQL queries

Graphql queries are located under the `./graphql`. We strongly encourage use of [fragments](https://graphql.org/learn/queries/#fragments), which minimizes code duplication and plays nicely with the TypeScript, during transformation of incoming data.

Our client of choice is [Apollo](https://www.apollographql.com/docs/react/), which provides excellent cache and features out of the box. To get fully typed requests and responses, [GraphQL Code Generator](https://www.graphql-code-generator.com/) transforms all `.graphql` files into ready to use hooks. Generated code is located at `./saleor/api.tsx` file.

API endpoint can be configured via `.env` file as described in [docs](docs/configuration.md).

#### Workflow

- Modify or create GraphQL file. For example, new query at `./graphql/queries/FeaturedProducts.graphql`
- Run `pnpm generate` command
- New query will be added to the `./saleor/api.tsx` file
- Import generated hook (`import { useFeaturedProductsQuery } from "@/saleor/api";`) in your component code

Script will start the [GraphQL Code Generator](https://www.graphql-code-generator.com/) in the watch mode, so changes in the queries will be automatically updated.

### React and Next.js code structure

When creating new components, please follow the [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/).

Code for the payment gateways can be found at `./components/checkout/payments`. At the moment we support [Saleor test gateway](https://docs.saleor.io/docs/3.0/developer/available-plugins/dummy-credit-card) and basic flow for Stripe.

#### Routing and urls

Project use [file based routing](https://nextjs.org/docs/routing/introduction). Available routes can be found at `./pages`. Dynamic routes (for example `./pages/product/[slug].tsx`) are generated at build time based on [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).

To ensure, that Link components use only the existing URLs with required arguments, we use [pathpida](https://github.com/aspida/pathpida). It is used to automatically generate the `./lib/$path.ts` file with all available routes. File should not be updated manually, instead run:

```bash
pnpm paths
```

Since routes require additional arguments with current locale and channel, you should use `usePaths` hook which will automatically add those. Let's create example component with link to the product page:

```tsx
import Link from "next/link";
import { usePaths } from "@/lib/paths";

export const ProductLinkComponent = () => {
  const paths = usePaths();
  return (
    <Link href={paths.products._slug(line?.variant?.product?.slug).$url()}>
      <a>Product link</a>
    </Link>
  );
};
```

### Saleor Checkout

React Storefront uses the new [Saleor Checkout](https://github.com/saleor/saleor-checkout) for checkout and payments. The setup is as easy as:

1. Deploy Saleor Checkout
2. Set the `NEXT_PUBLIC_CHECKOUT_URL` environment variable with Saleor Checkout URL

### Code style

Before committing the code, Git pre-hooks will check staged changes for following the code styles. If you would like to format the code by yourself, run the command:

```bash
pnpm lint
```

## Other tools

### Debugging using VS Code

The repository contains ready to use VS Code debugger configuration (`.vscode/launch.json`).

Start server in debug mode

```bash
pnpm debug
```

Add [breakpoints](https://code.visualstudio.com/docs/editor/debugging#_breakpoints), and start debugging session in your editor.

### VS Code GraphQL Extension

GraphQL extension for VSCode adds syntax highlighting, validation, and language features like go to definition, hover information and autocompletion for graphql projects. This extension also works with queries annotated with gql tag.

VS Marketplace [link](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)

### Bundle metrics

If you want to check how your changes impact page size, use command:

```bash
pnpm analyze-build
```

After the build, report will open in your browser.
