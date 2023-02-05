import { useState } from "react";
import { Status } from "@/types/status";

export interface UseAsyncActionRO {
  execute: () => void | Promise<void>;
  status: Status;
  data: any | null;
  thereIsNoData: boolean;
}

export const useAsyncAction = (
  action: (params?: any) => any | any[],
): UseAsyncActionRO => {
  const [data, setData] = useState<any | any[]>(null);
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const execute = async () => {
    setStatus(Status.LOADING);

    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const data: any | any[] = await action();

      setData(data);
      setStatus(Status.COMPLETE);
    } catch (error) {
      setStatus(Status.FAIL);
    }
  };

  const thereIsNoData: boolean =
    status === Status.COMPLETE && (data?.length === 0 || data === undefined);

  return {
    execute,
    status,
    data,
    thereIsNoData,
  };
};
