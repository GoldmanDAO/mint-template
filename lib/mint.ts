import { useContractWrite } from "wagmi";
import {WriteContractArgs} from "@wagmi/core";
import { ethers } from "ethers";
import { tokenAddress, contractInterface } from "./config";

export const useContractMint = (address: string, amount: number, price: number) => {
    const config: WriteContractArgs = {
        addressOrName: tokenAddress,
        contractInterface: contractInterface,
    }
    const value = ethers.utils.parseEther(String(amount * price))

  return useContractWrite(
    config,
    "mint",
    {
      args: [address, amount],
      overrides: { value: value },
    }
  );

}

export const useContractProofMint = (address: string, amount: number, price: number, proofs: string[] = []) => {
    const config: WriteContractArgs = {
        addressOrName: tokenAddress,
        contractInterface: contractInterface,
    }
    const value = ethers.utils.parseEther(String(amount * price))

    return useContractWrite(
    config,
    "mint",
    {
        args: [address, amount, proofs],
        overrides: { value: value}
    });
}

