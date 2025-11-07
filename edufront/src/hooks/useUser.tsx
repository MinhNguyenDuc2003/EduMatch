'use client';

import { map } from 'lodash';
function useHasPermission(permission: string) {
  const listFunstion = [
    {
      FunctionCode: 'user',
      FunctionID: '1',
    },
    {
      FunctionCode: 'profile',
      FunctionID: '3',
    },
    {
      FunctionCode: 'formScholarship',
      FunctionID: '2',
    },
    {
      FunctionCode: 'scholarships',
      FunctionID: '2',
    },
  ];

  return map(listFunstion, (item) => item.FunctionCode).includes(permission);
}

export default useHasPermission;
