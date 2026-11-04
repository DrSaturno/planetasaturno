import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type TerminalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen, open, close, toggle]);
  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminalContext() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminalContext must be used within TerminalProvider");
  return ctx;
}
