import React from 'react';
import Context from './seg/context';
import { Section } from '@/lib/by/Div';
import AddFiled from '@/pattern/share/AddFiled';

const FormScholarship = () => {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({}) => {
          return (
            <>
              <Section>
                <AddFiled />
              </Section>
            </>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
};

export default FormScholarship;
