import { trpc } from "../trpc";

export const useUser = () => {
  const { data, isPending, isLoading } = trpc.pro.getUser.useQuery();

  const plan = data?.plan;
  const api_key = data?.api_key;

  return { plan, api_key, data, isPending, isLoading };
};