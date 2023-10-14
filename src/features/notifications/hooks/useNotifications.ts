import { useState } from 'react';

import { Notification } from '../types';

const FAKE_NOTIFICATION: Notification = {
  icon: '',
  date: '3d ago',
  title: 'Quisque blandit tempus ligula, ut consequat elit posuere quis.',
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    Array(10).fill(FAKE_NOTIFICATION),
  );

  const archiveNotifications = () => setNotifications([]);

  return { notifications, archiveNotifications };
};
