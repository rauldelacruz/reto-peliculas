import React, { useState, useCallback } from 'react';

export const NotificationContext = React.createContext({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const addNotification = (message, status) => setNotification({ message, status });
  const removeNotification = () => setNotification(null);

  const contextValue = {
    notification,
    addNotification: useCallback((message, status) => addNotification(message, status), []),
    removeNotification: useCallback(() => removeNotification(), []),
  }

  return (
    <NotificationContext.Provider value={ contextValue }>
      { children }
    </NotificationContext.Provider>
  );
}
