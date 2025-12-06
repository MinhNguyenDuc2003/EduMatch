'use client';

import RegisterAccount from './RegisterAccount';
import CreateProfile from './CreateProfile';
import CreateApplication from './CreateApplication';
import SubmitApplication from './SubmitApplication';

export default function StepsFlow() {
  return (
    <div>
      <RegisterAccount />
      <CreateProfile />
      <CreateApplication />
      <SubmitApplication />
    </div>
  );
}

