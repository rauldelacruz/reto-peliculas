import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

export const useNotification = () => {
  const { notification, addNotification, removeNotification } = useContext(NotificationContext)
  return { notification, addNotification, removeNotification }
}
