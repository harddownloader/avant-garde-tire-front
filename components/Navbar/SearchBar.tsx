import clsx from "clsx";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";
import React from "react";
import { useIntl } from "react-intl";
import { useDebounce } from "react-use";

import { InteractiveSearch } from "@/components/InteractiveSearch";
import { messages } from "@/components/translations";
import { usePaths } from "@/lib/paths";
import { ProductFilterInput } from "@/saleor/api";

import { getIcon } from "./NavIconButton";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const t = useIntl();
  const paths = usePaths();

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
    <div className={clsx("w-full h-auto xl:container")}>
      <div
        className={clsx(
          styles.searchBarWrap,
          "w-full h-16 px-3 md:px-4 flex items-center bg-action-1"
        )}
      >
        <input
          className={clsx(
            styles.searchBarInput,
            "w-screen h-full p-2 block border-none text-md bg-inherit text-white placeholder:text-slate-200 ring-transparent",
            "focus:outline-none focus:border-none focus:ring-none focus:ring-transparent"
          )}
          type="text"
          value={searchQuery || ""}
          placeholder={t.formatMessage(messages.searchFieldPlaceholder)}
          onChange={(e) => setSearchQuery(e.target.value, { scroll: false, shallow: true })}
          data-testid="searchInput"
        />
        <Link href={paths.search._slug(searchQuery || "").$url()} passHref>
          <a
            href="pass"
            className="w-12 xl:w-18 h-full bg-inherit text-white flex items-center justify-center"
          >
            {getIcon("spyglass")}
          </a>
        </Link>
      </div>

      <InteractiveSearch filter={debouncedFilter} />
    </div>
  );
}

export default SearchBar;
