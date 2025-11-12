import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { reduce } from 'lodash';
import { AuthSlice } from './slice/Auth';
import { JointSlice } from './slice/Joint';

const sliceFunctions = [AuthSlice, JointSlice];

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type State = UnionToIntersection<ReturnType<(typeof sliceFunctions)[number]>>;

export const sStore = create<State>()(
  devtools(
    persist(
      (...a) =>
        reduce(
          sliceFunctions,
          (prev: any, cur: any) => ({
            ...prev,
            ...cur(...a),
          }),
          {} as State
        ),
      {
        name: 'store',
        storage: createJSONStorage(() => {
          if (typeof window !== 'undefined') {
            return sessionStorage; // hoặc localStorage nếu muốn giữ khi đóng tab
          }
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }),
        merge: (persistedState, currentState) => Object.assign(currentState, persistedState),

        // 🔥 Sửa ở đây: lưu cả Auth & Joint
        partialize: (state) => ({
          Auth: state.Auth,
          Joint: state.Joint,
        }),
      }
    )
  )
);
