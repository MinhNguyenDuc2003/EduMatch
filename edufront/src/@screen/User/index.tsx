'use client';

import { sStore } from '@/stores';
import Context from './context';
import { RText, Section } from '@/lib/by/Div';

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
              <Section>
                <RText>User</RText>
              </Section>
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
