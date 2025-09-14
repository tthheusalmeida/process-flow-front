import useSWR from "swr";
import { getFlows } from "@/app/services/flows";

export function useTotalFlows() {
  return useSWR(`flows`, () => getFlows());
}
