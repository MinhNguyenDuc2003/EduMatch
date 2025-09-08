'use client';
import { Screens } from '../../@screen';
import NoPermission from '../../@screen/NoPermission';
import useHasPermission from '../../hooks/useUser';

export default function SlugFunctionID({ params }: { params: { slug?: string[] } }) {
  const FunctionID = params.slug?.at(-1) ?? '';
  if (!useHasPermission(FunctionID)) {
    return <NoPermission />;
  }

  const Screen = Screens[FunctionID] || (() => <NoPermission />);
  return <Screen />;
}
