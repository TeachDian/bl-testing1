import { create } from "zustand";
import { E_UserRole, T_Session } from "@repo/contract";

type T_Session_Action = {
  update: (session: T_Session) => void;
  remove: () => void;
};

const useSessionStore = create<T_Session & T_Session_Action>((set) => ({
  _id: null,
  email: null,
  registrationType: null,
  role: E_UserRole.User,
  update: (session: T_Session) => set(() => ({ ...session })),
  remove: () =>
    set({
      _id: null,
      email: null,
      registrationType: null,
      role: E_UserRole.User,
    }),
}));

export default useSessionStore;
