import { useState } from "react";
import { useDispatch } from "react-redux";

export interface UseAsyncActionRO {
  execute: () => void;
  isError: boolean;
}

export const useAsyncReduxAction = (action: any): UseAsyncActionRO => {
  const dispatch = useDispatch();

  const [isError, setIsError] = useState<boolean>(false);

  const execute = async () => {
    try {
      await dispatch(action);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  return {
    execute,
    isError,
  };
};
