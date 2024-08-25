'use client';
import { User } from '@prisma/client';
import { createContext } from 'react';

type LoggedInUserContextType = {
  user: User;
};

export const LoggedInUserContext = createContext<LoggedInUserContextType>({
  user: null as unknown as User,
});

export const LoggedInUserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <LoggedInUserContext.Provider value={{ user }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
