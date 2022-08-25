import React from "react";
import { useIntl } from "react-intl";

import { Tag } from "@/components/Tag";
import { messages } from "@/components/translations";

export interface FilterPill {
  label: string;
  choiceSlug: string;
  attributeSlug: string;
}

export interface FilterPillsProps {
  pills: FilterPill[];
  onRemoveAttribute: (attributeSlug: string, choiceSlug: string) => void;
  onClearFilters: () => void;
}

export function FilterPills({ pills, onRemoveAttribute, onClearFilters }: FilterPillsProps) {
  const t = useIntl();

  return (
    <div className="flex pt-4">
      <div className="flex-grow flex gap-2">
        {typeof window !== "undefined" &&
          pills.map(({ label, attributeSlug, choiceSlug }) => (
            <Tag
              key={`${attributeSlug}-${choiceSlug}`}
              label={label}
              data-testid={`filterPill${choiceSlug}`}
              onClick={() => {
                onRemoveAttribute(attributeSlug, choiceSlug);
              }}
            />
          ))}
      </div>
      <div>
        <button
          onClick={onClearFilters}
          className="text-main-2 text-base"
          type="button"
          data-testid="clearFilters"
        >
          {t.formatMessage(messages.clearAll)}
        </button>
      </div>
    </div>
  );
}

export default FilterPills;
