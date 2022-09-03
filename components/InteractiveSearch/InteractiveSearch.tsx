import clsx from "clsx";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { mapEdgesToItems } from "@/lib/maps";
import {
  OrderDirection,
  ProductCollectionQueryVariables,
  ProductFilterInput,
  ProductOrderField,
  useProductCollectionQuery,
} from "@/saleor/api";

import { useRegions } from "../RegionsProvider";
import { Spinner } from "../Spinner";
import { messages } from "../translations";
import { ProductListItem } from "./ProductListItem";

export interface InteractiveSearchProps {
  filter?: ProductFilterInput;
  sortBy?: {
    field: ProductOrderField;
    direction?: OrderDirection;
  };
  perPage?: number;
  setCounter?: (value: number) => void;
}

export function InteractiveSearch({
  filter,
  sortBy,
  setCounter,
  perPage = 4,
}: InteractiveSearchProps) {
  const t = useIntl();
  const { query } = useRegions();

  const variables: ProductCollectionQueryVariables = {
    filter,
    first: perPage,
    ...query,
    ...(sortBy?.field &&
      sortBy?.direction && {
        sortBy: {
          direction: sortBy.direction,
          field: sortBy.field,
        },
      }),
  };

  const { loading, error, data } = useProductCollectionQuery({
    variables,
  });

  useEffect(() => {
    if (setCounter) {
      setCounter(data?.products?.totalCount || 0);
    }
  }, [setCounter, data?.products?.totalCount]);

  if (loading)
    return (
      <div className="my-2">
        <Spinner />
      </div>
    );
  if (error) return <p>Error</p>;

  const products = mapEdgesToItems(data?.products);
  if (products.length === 0) {
    return (
      <p
        className={clsx("p-2 text-lg text-main-1", "dark:text-main-3")}
        data-testid="noResultsText"
      >
        {t.formatMessage(messages.noProducts)}
      </p>
    );
  }

  return (
    <div>
      {filter?.search && (
        <ul
          className={clsx("grid grid-cols-1 gap-2 py-4 bg-white", "dark:bg-black")}
          data-testid="productsList"
        >
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default InteractiveSearch;
