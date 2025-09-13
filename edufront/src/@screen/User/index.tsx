'use client';

import { sStore } from '@/stores';
import Context from './context';

export default function User() {
  const ss = sStore();
  
  const Text =
    'Nepal’s prime minister has quit amid deadly Gen Z protests over a social media ban and corruption. Here’s what to know';
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ data }) => {
          console.log('data', data)
          return (
            <>
              
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
