import { get } from "lodash";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect;
}

export function GenCtx<V, D>({ useLogic }: { useLogic: (props: D) => V }) {
  const Ctx = createContext({} as V);

  function useCtx() {
    return useContext(Ctx);
  }

  function Provider({ ...props }: PropsWithChildren<D>) {
    const valueCtx = useLogic(props);
    const methods = get(valueCtx, "methods") as UseFormReturn;
    return (
      <Ctx.Provider value={valueCtx}>
        {methods ? (
          <FormProvider {...methods}>{props?.children}</FormProvider>
        ) : (
          props?.children
        )}
      </Ctx.Provider>
    );
  }

  function Consumer({ children }: { children(value: V): React.ReactNode }) {
    const valueCtx = useCtx();
    return children(valueCtx);
  }

  return {
    useCtx,
    Provider,
    Consumer,
  };
}
