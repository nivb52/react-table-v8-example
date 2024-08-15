import React from 'react';
import type { SetStateAction, Dispatch } from 'react';

// CARD CONTEXT
export interface ICardContext {
  maxAllowedBookmarkCards: number;
  bookmarkCount: number;
  setBookmarkCount: Dispatch<SetStateAction<number>>;
}

export const CardContext = React.createContext<ICardContext | null>(null);

export const useCardContext = (): ICardContext => {
  const ctx = React.useContext(CardContext);

  if (!ctx) {
    throw new Error('useCardContext has to be used within <CardContext.Provider>');
  }
  return ctx;
};
// END CARD CONTEXT
