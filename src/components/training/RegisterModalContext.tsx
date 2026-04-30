import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface RegisterModalContextValue {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const RegisterModalContext = createContext<RegisterModalContextValue | null>(null);

export const RegisterModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <RegisterModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </RegisterModalContext.Provider>
  );
};

export const useRegisterModal = () => {
  const ctx = useContext(RegisterModalContext);
  // Safe fallback: if no provider (used outside Training page), no-op
  if (!ctx) {
    return {
      open: false,
      openModal: () => {},
      closeModal: () => {},
    } as RegisterModalContextValue;
  }
  return ctx;
};
