import { createContext, useContext, useState, type ReactNode } from "react";

type TerminalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const TerminalContext = createContext<TerminalContextValue | null>(null);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value: TerminalContextValue = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
  };
  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>;
}

export function useTerminalContext() {
  const ctx = useContext(TerminalContext);
  if (!ctx) throw new Error("useTerminalContext must be used within TerminalProvider");
  return ctx;
}
