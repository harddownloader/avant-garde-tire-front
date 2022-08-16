import { useRouter } from "next/router";
import React from "react";

import { LOCALES } from "@/lib/regions";

import { useRegions } from "../RegionsProvider";
import { BaseRegionsDropdown, HorizontalAlignment, VerticalAlignment } from "./BaseRegionsDropdown";
import { BaseRegionsDropdownItem } from "./BaseRegionsDropdownItem";

interface DropdownOption {
  label: string;
  chosen: boolean;
  localeSlug: string;
}

export interface LocaleDropdownProps {
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
}

export function LocaleDropdown({ horizontalAlignment, verticalAlignment }: LocaleDropdownProps) {
  const router = useRouter();
  const { currentLocale, currentChannel } = useRegions();

  const localeOptions: DropdownOption[] = LOCALES.map((loc) => ({
    label: loc.name,
    chosen: loc.slug === currentLocale,
    localeSlug: loc.slug,
  }));

  const onLocaleChange = (localeSlug: string) => {
    if (localeSlug === currentLocale) {
      return;
    }

    // Update current URL to use the chosen locale
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        channel: currentChannel.slug,
        locale: localeSlug,
      },
    });
  };

  return (
    <BaseRegionsDropdown
      label={currentLocale}
      horizontalAlignment={horizontalAlignment}
      verticalAlignment={verticalAlignment}
    >
      {localeOptions.map((option) => (
        <BaseRegionsDropdownItem
          key={option.label}
          chosen={option.chosen}
          label={option.label}
          onClick={() => onLocaleChange(option.localeSlug)}
        />
      ))}
    </BaseRegionsDropdown>
  );
}

export default LocaleDropdown;
