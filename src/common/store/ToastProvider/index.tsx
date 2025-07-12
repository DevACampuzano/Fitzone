import React, { createContext, PropsWithChildren, useState } from 'react';
import { Toast } from '../../components';

type ToastContextType = {
  showToast: (msg: string, icon?: PropsToast['icon']) => void;
};

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType,
);

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setMessageServer] = useState<Omit<PropsToast, 'callbackEnd'>>({
    msg: '',
    show: false,
    icon: 'information-circle-outline',
  });

  const handleCloseToast = () => {
    setMessageServer(s => ({
      ...s,
      show: false,
    }));
  };

  const showToast = (msg: string, icon?: PropsToast['icon']) => {
    setMessageServer(s => ({
      show: true,
      msg,
      icon: icon || s.icon,
    }));
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
      }}
    >
      <Toast {...state} callbackEnd={handleCloseToast} />
      {children}
    </ToastContext.Provider>
  );
};
