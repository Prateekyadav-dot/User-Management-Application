import {create} from "zustand";
import type { User } from "../types";
import {users} from "../utils/users"

import createSelectors from "./create-selector";
import { devtools, persist } from "zustand/middleware";

type UsersStore = {
    users: User[];
    getUserById: (id:string) => User | undefined;
    addUsers: (user: User) => void;
    updateUser: (id: String, updateUser: User) => void;
    deleteUser: (id:string) => void;

};



const useUsersStore = create<UsersStore>()(
  persist(
    devtools((set, get) => ({
      users: users,
     getUserById: (id) => {
        return get().users.find((user) => user.id === id);
     },
      addUsers: (user) => {
        set({
          users: [user, ...get().users],
        });
      },
      updateUser: (id, updateUser) => {
        set({
          users: get().users.map(user => {
            if (user.id === id) {
              return {...user, ...updateUser};
            }
            return user;
          })
        })
      },
      deleteUser: (id) => {
        set({
          users: get().users.filter((user) => user.id !== id),
        });
      },
    })),
    {
      name: "users",
    }
  )
);

export const usersSelector = createSelectors(useUsersStore);
export default useUsersStore;