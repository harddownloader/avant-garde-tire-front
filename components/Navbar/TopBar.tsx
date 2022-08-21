import React from "react";

import { ChannelDropdown } from "../regionDropdowns/ChannelDropdown";
import { LocaleDropdown } from "../regionDropdowns/LocaleDropdown";

interface TopBar {
  isChannelDropdownVisible?: boolean;
  isLocaleDropdownVisible?: boolean;
}

export function TopBar({
  isChannelDropdownVisible = true,
  isLocaleDropdownVisible = true,
}: TopBar) {
  return (
    <div className="flex justify-between flex-1">
      {isChannelDropdownVisible && <ChannelDropdown verticalAlignment="bottom" />}
      {isLocaleDropdownVisible && (
        <LocaleDropdown horizontalAlignment="right" verticalAlignment="bottom" />
      )}
    </div>
  );
}
