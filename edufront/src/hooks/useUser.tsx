'use client';

import { includes, map } from 'lodash';
import { sStore } from '../stores';
function useHasPermission(permission: string) {
  const listFunstion = [
    {
      FunctionCode: 'user',
      FunctionID: '1',
    },
    {
      FunctionCode: '/',
      FunctionID: '2',
    },
  ];

  return map(listFunstion, (item) => item.FunctionCode).includes(permission);
}

export default useHasPermission;
