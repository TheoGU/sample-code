import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { User } from "@/types/user";
import { useUserLogged } from "@/hooks/use-is-user-logged";
import { getUser } from "@/modules/user/domain/user.actions";
import { isNone } from "@/helpers/core";
import { SplashScreen } from "@/components/display/splash-screen/splash-screen";
import { JWT_KEY } from "@/modules/auth/domain/auth.actions";

interface Props {
  children: any;
}

export function SessionProvider({ children }: Props) {
  const currentUser: User | null = useUserLogged();
  const dispatch = useDispatch();
  const [isLoadingToGetLoggedInUser, setIsLoadingToGetLoggedInUser] =
    useState<boolean>(true);

  const checkUser = async () => {
    const localToken: string | undefined = localStorage.getItem(JWT_KEY);

    try {
      if (isNone(currentUser) && localToken) {
        await getLoggedInUser();
      }
      setIsLoadingToGetLoggedInUser(false);
    } catch (e) {
      console.error("Error", e);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const getLoggedInUser = async () => {
    try {
      await dispatch(getUser());
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoadingToGetLoggedInUser(false);
    }
  };

  return isLoadingToGetLoggedInUser ? <SplashScreen /> : children || <></>;
}
