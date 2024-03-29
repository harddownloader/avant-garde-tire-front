import { useAuthState } from "@saleor/sdk";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

import { SearchBar } from "@/components/Navbar/SearchBar";
import { ThemeToggle } from "@/components/Navbar/ThemeToggler";
import { TopBar } from "@/components/Navbar/TopBar";
import { STOREFRONT_NAME } from "@/lib/const";
import { usePaths } from "@/lib/paths";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import { CheckoutLineDetailsFragment } from "@/saleor/api";

import { BurgerMenu } from "../BurgerMenu";
import { Menu } from "./Menu";
import styles from "./Navbar.module.css";
import NavIconButton from "./NavIconButton";
import UserMenu from "./UserMenu";

export function Navbar() {
  const paths = usePaths();
  const router = useRouter();

  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const { authenticated } = useAuthState();
  const { checkout } = useCheckout();

  useEffect(() => {
    // Close side menu after changing the page
    router.events.on("routeChangeStart", () => {
      if (isBurgerOpen) {
        setBurgerOpen(false);
      }
    });
  });

  const counter =
    checkout?.lines?.reduce(
      (amount: number, line?: CheckoutLineDetailsFragment | null) =>
        line ? amount + line.quantity : amount,
      0
    ) || 0;

  const isSearchPage = useMemo(
    () => router.pathname === "/[channel]/[locale]/search",
    [router?.pathname]
  );

  return (
    <>
      <div className={clsx(styles.navbar, "dark:bg-black dark:text-white")}>
        <div className={styles["inner-top-bar"]}>
          <TopBar />
        </div>
        <div className={clsx(styles.inner)}>
          <div className="flex-1 h-full hidden lg:flex">
            <Menu />
          </div>
          <div className="flex-1 flex flex items-center xs:justify-start lg:hidden">
            <NavIconButton
              icon="menu"
              className="ml-2 lg:hidden flex items-center"
              onClick={() => setBurgerOpen(true)}
            />
            {!isSearchPage && (
              <div className="flex md:hidden ml-2">
                <NavIconButton
                  icon={isSearchBarOpen ? "close" : "spyglass"}
                  data-testid="searchIcon"
                  onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex xs:justify-center">
            <Link href={paths.$url()} passHref>
              <a href="pass" className={styles.logo}>
                <p className="font-bold text-3xl uppercase">{STOREFRONT_NAME}</p>
              </a>
            </Link>
          </div>
          <div className="flex-1 flex justify-end">
            {!authenticated ? (
              <Link href={paths.account.login.$url()} passHref>
                <a href="pass" className="hidden lg:flex">
                  <NavIconButton icon="user" aria-hidden="true" />
                </a>
              </Link>
            ) : (
              <UserMenu />
            )}
            <Link href={paths.cart.$url()} passHref>
              <a href="pass" className="ml-2 flex">
                <NavIconButton icon="bag" aria-hidden="true" counter={counter} />
              </a>
            </Link>
            {!isSearchPage && (
              <div className="hidden md:flex ml-2">
                <NavIconButton
                  icon={isSearchBarOpen ? "close" : "spyglass"}
                  data-testid="searchIcon"
                  onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
                />
              </div>
            )}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
      <BurgerMenu open={isBurgerOpen} onCloseClick={() => setBurgerOpen(false)} />
      {!isSearchPage && isSearchBarOpen && <SearchBar />}
    </>
  );
}

export default Navbar;
