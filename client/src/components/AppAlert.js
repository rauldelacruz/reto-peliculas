import React from 'react';
import { Alert} from 'react-bootstrap';
import { useNotification } from '../hooks/useNotification';

export const AppAlert = () => {

  const { notification, removeNotification } = useNotification();

 
  setTimeout(() => {
    removeNotification();
  }, 3000);
  

  return (
    <Alert 
      show={ !!notification }
      onClose={ () => removeNotification() }
      dismissible
      variant={ notification?.status ? notification?.status : 'primary' }
    >
      <p>
        {notification?.message}
      </p>
    </Alert>
  );
}
