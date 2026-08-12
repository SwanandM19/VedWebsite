"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import BookCallModal from "./BookCallModal";

type BookCallContextValue = {
  openBookCall: () => void;
  closeBookCall: () => void;
};

const BookCallContext = createContext<BookCallContextValue | null>(null);

/**
 * Mounted once in the root layout so a single modal instance backs every CTA
 * on the site. Client pages can call `useBookCall()`; server pages use the
 * `<BookCallButton>` wrapper.
 */
export default function BookCallProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openBookCall = useCallback(() => setOpen(true), []);
  const closeBookCall = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openBookCall, closeBookCall }), [openBookCall, closeBookCall]);

  return (
    <BookCallContext.Provider value={value}>
      {children}
      <BookCallModal open={open} onClose={closeBookCall} />
    </BookCallContext.Provider>
  );
}

export function useBookCall() {
  const ctx = useContext(BookCallContext);
  if (!ctx) throw new Error("useBookCall must be used inside <BookCallProvider>.");
  return ctx;
}
