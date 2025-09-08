import React from 'react';
import { UserInfoProvider, useUserInfoContext } from './UserInfoContext';

export const AppContext = React.createContext({});

export function AppProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <UserInfoProvider>
      {children}
    </UserInfoProvider>
  );
}

export const useAppContext = () => {
  const userInfoContext = useUserInfoContext();

  return {
    ...userInfoContext,
  };
};

export default AppContext;
