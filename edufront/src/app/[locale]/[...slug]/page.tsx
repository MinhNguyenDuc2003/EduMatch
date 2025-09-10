'use client';
import { use } from 'react';
import { Screens } from '../../../@screen';
import NoPermission from '../../../@screen/NoPermission';
import useHasPermission from '../../../hooks/useUser';

export default function SlugFunctionID({ params }: { params: Promise<{ slug?: string[] }> }) {
  const {slug} = use(params)
  const FunctionID = slug?.at(-1) ?? '';
  if (!useHasPermission(FunctionID)) {
    return <NoPermission />;
  }

  const Screen = Screens[FunctionID] || (() => <NoPermission />);
  return <Screen />;
}
