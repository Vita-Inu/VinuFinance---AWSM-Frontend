import { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { NOTIFICATION_TYPE } from '@/features/notifications/types';

import { NotificationContext } from './context';


export const useNotifications = () => {
  const {notifications, addNotification, removeNotification} = useContext(NotificationContext)

  const sendNotification = (type: NOTIFICATION_TYPE, title: string, description?: string) => {
    addNotification({id: uuidV4(), type, title, description})
  }

  return {notifications, sendNotification, removeNotification}
}