import { useSelector } from "react-redux";
import { User } from "@/types/user";
import { Core } from "@/helpers/core";

export const useIsUserLogged = (): boolean => {
  const loggedInUser: User = useSelector(({ user }: any) => user.user);

  return !Core.isNone(loggedInUser);
};
export const useUserLogged = (): User =>
  useSelector(({ user }: any) => user.user);
