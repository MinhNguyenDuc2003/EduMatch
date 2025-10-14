// import { StateCreator } from "zustand";

// type State = {
//   Auth: {
//     UserInfo?: Partial<IUser>;
//     Token?: string;
//     Permission?: IPermission;
//     Functions?: IFunction[];
//   };
//   setToken(data: string): void;
//   setAuthData(Obj: State["Auth"]): void;
//   resetAuth(): void;
// };

// export const AuthSlice: StateCreator<State> = (set) => {
//   return {
//     Auth: { UserInfo: {}, Token: "", Permission: {}, Functions: [] },
//     setToken(Token) {
//       sessionStorage.setItem("jwt", Token);
//       set((state) => ({ ...state, Auth: { ...state.Auth, Token } }));
//     },
//     setAuthData(Obj) {
//       set((state) => ({ ...state, Auth: { ...state.Auth, ...Obj } }));
//     },
//     resetAuth() {
//       set({ Auth: {} });
//     },
//   } as const;
// };
