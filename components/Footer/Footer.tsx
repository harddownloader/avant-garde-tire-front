import clsx from "clsx";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { useIntl } from "react-intl";

import { messages } from "@/components/translations";
import { STOREFRONT_NAME } from "@/lib/const";
import { getLinkPath } from "@/lib/menus";
import { usePaths } from "@/lib/paths";
import { useFooterMenuQuery } from "@/saleor/api";

import { ChannelDropdown } from "../regionDropdowns/ChannelDropdown";
import { LocaleDropdown } from "../regionDropdowns/LocaleDropdown";
import { useRegions } from "../RegionsProvider";
import styles from "./Footer.module.css";

export type FooterProps = HTMLAttributes<HTMLElement>;

export function Footer({ className, ...rest }: FooterProps) {
  const paths = usePaths();
  const t = useIntl();
  const { query, currentChannel, currentLocale } = useRegions();

  const { data, error } = useFooterMenuQuery({ variables: { ...query } });

  if (error) {
    console.error("Footer component error", error.message);
  }

  const menu = data?.menu?.items || [];

  return (
    <footer className={clsx(styles.footer, className)} {...rest}>
      <div className={styles["footer-inner"]}>
        <div className="block w-full md:w-auto md:flex mb-14 sm:mb-10">
          <div className="h-16 md:w-30">
            <Link href={paths.$url()} passHref>
              <a href="pass" className="inline-block mb-2">
                <div className="mt-px group block relative grayscale">
                  <p className="font-bold text-3xl uppercase">{STOREFRONT_NAME}</p>
                </div>
              </a>
            </Link>
            <p className="text-base">
              <a href="https://goo.gl/maps/8DEopSWRozkwnvZ49">
                {t.formatMessage(messages.contactAddress)}
              </a>
            </p>
            <div className="">
              <a className="text-base flex items-center" href="tel:+380983751007">
                <span className={clsx(styles.phone_icon, "material-icons-outlined")}>call</span>
                0983751007
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[2rem] w-full sm:w-auto sm:flex sm:flex-wrap sm:justify-end sm:ml-auto">
            {menu.map((item) => (
              <div className="sm:ml-14" key={item?.id}>
                {item?.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles["menu-heading"]}
                  >
                    {item?.name}
                  </a>
                ) : (
                  <Link href={getLinkPath(item!, currentChannel.slug, currentLocale)} passHref>
                    <a href="pass" className={styles["menu-heading"]}>
                      {item?.name}
                    </a>
                  </Link>
                )}
                <ul className={styles.menu}>
                  {item?.children?.map((sub) => (
                    <li key={sub?.id}>
                      {sub?.url ? (
                        <a
                          href={sub.url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles["menu-link"]}
                          data-testid={`footerExternalLinks${sub?.name}`}
                        >
                          {sub?.name}
                        </a>
                      ) : (
                        <Link href={getLinkPath(sub!, currentChannel.slug, currentLocale)} passHref>
                          <a
                            href="pass"
                            className={styles["menu-link"]}
                            data-testid={`footerInternalLinks${sub?.name}`}
                          >
                            {sub?.name}
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-sm text-main-3 flex-grow">
            © {new Date().getFullYear()} {STOREFRONT_NAME}
          </p>
          <div className="invisible md:visible flex gap-4">
            <ChannelDropdown horizontalAlignment="right" />
            <LocaleDropdown horizontalAlignment="right" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
