import clsx from "clsx";
import React, { MouseEvent } from "react";

export interface TagProps {
  label: string;
  onClick: (e?: MouseEvent) => void;
}

export function Tag({ label, onClick, ...rest }: TagProps) {
  return (
    <div
      className={clsx(
        "border border-main-4 p-1 px-2 flex justify-between items-center",
        "dark:border-white"
      )}
      {...rest}
    >
      <span className="text-base font-semibold">{label}</span>
      <button type="button" className="flex pl-2" onClick={onClick}>
        <span className="material-icons-outlined text-[2rem]">close</span>
      </button>
    </div>
  );
}

export default Tag;
