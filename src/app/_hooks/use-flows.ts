import useSWR from "swr";
import { flowsService } from "@/app/services/flows";

export function useTotalFlows() {
  return useSWR(`flows`, () => flowsService.getData());
}
