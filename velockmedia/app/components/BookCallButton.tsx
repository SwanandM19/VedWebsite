"use client";

import type { ReactNode } from "react";
import { useBookCall } from "./BookCallProvider";

type Props = {
  children: ReactNode;
  className?: string;
  /** Extra data-* / aria-* attributes used by the homepage cursor + magnetic effects. */
  dataCursor?: string;
  magnetic?: boolean;
  "aria-label"?: string;
  onClick?: () => void;
};

/**
 * The one CTA element for the whole site — every "book a call" style button
 * renders through this so they all open the same modal. Server components can
 * use it directly; it carries no state of its own.
 */
export default function BookCallButton({
  children,
  className,
  dataCursor,
  magnetic,
  onClick,
  ...rest
}: Props) {
  const { openBookCall } = useBookCall();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openBookCall();
      }}
      data-cursor={dataCursor}
      data-magnetic={magnetic ? "" : undefined}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
}
