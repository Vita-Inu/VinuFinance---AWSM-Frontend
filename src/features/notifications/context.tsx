import { createContext, PropsWithChildren, useState } from 'react';

import { Notification } from './types';

type Context = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (notificationId: string) => void;
};

export const NotificationContext = createContext<Context>({
  notifications: [],
  addNotification: () => undefined,
  removeNotification: () => undefined,
});

export const NotificationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications(prevState => [...prevState, notification])
  }

  const removeNotification = (notificationId: string) => {
    setNotifications(prevState => prevState.filter(({id}) => id !== notificationId))
  }

  return (
    <NotificationContext.Provider value={{notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
