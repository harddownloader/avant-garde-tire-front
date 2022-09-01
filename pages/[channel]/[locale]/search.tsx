import clsx from "clsx";
import { useQueryState } from "next-usequerystate";
import React, { ReactElement } from "react";
import { useIntl } from "react-intl";
import { useDebounce } from "react-use";

import { Layout, ProductCollection } from "@/components";
import { getIcon } from "@/components/Navbar/NavIconButton";
import { messages } from "@/components/translations";
import { ProductFilterInput } from "@/saleor/api";

function SearchPage() {
  const t = useIntl();
  const [searchQuery, setSearchQuery] = useQueryState("q");
  const [debouncedFilter, setDebouncedFilter] = React.useState<ProductFilterInput>({});

  useDebounce(
    () => {
      if (searchQuery) {
        setDebouncedFilter({ search: searchQuery });
      } else {
        setDebouncedFilter({});
      }
    },
    1000,
    [searchQuery]
  );

  return (
    <main className="w-full h-auto xl:container">
      <div className="w-full h-16 mb-6 px-3 md:px-4 flex items-center bg-action-1">
        <input
          className={clsx(
            "w-screen h-full block border-none text-md bg-inherit text-white placeholder:text-slate-200 ring-transparent",
            "focus:outline-none focus:border-none focus:ring-none focus:ring-transparent"
          )}
          type="text"
          value={searchQuery || ""}
          placeholder={t.formatMessage(messages.searchFieldPlaceholder)}
          onChange={(e) => setSearchQuery(e.target.value, { scroll: false, shallow: true })}
          data-testid="searchInput"
        />
        <div
          className="w-12 xl:w-18 h-full bg-inherit text-white flex items-center justify-center"
        >
          {getIcon("spyglass")}
        </div>
      </div>
      <div className="px-8">
        <ProductCollection filter={debouncedFilter} />
      </div>
    </main>
  );
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
