import React, { useState, useEffect } from "react";
import { useAccount, useContractRead, defaultChains, useNetwork, Chain } from "wagmi";
import {
    chainId,
    tokenAddress,
    contractInterface,
} from "../../lib/config";
import { useContractMint } from "../../lib/mint";

import MintController from "./MintController";
import MintStatus from "./MintStatus";

import WrongChainButton from "../Buttons/WrongChainButton";
import ConnectButton from "../Buttons/ConnectButton";
import MintButton from "../Buttons/MintButton";
import BackoffButton from "../Buttons/BackoffButton";
import { GetAccountResult } from "@wagmi/core";
// import { BigNumber } from "ethers";

const chains = defaultChains
const defaultChain = chains.find((x: Chain) => x.id === chainId)

const useContractSupply = (enabled?: boolean) => {
    return useContractRead(
        {
            addressOrName: tokenAddress,
            contractInterface: contractInterface,
        },
        "totalSupply",
        { chainId: defaultChain.id, enabled: enabled ?? true }
    );
};

const isValidConnection = (chain?: Chain, account?: GetAccountResult) => {
    return account?.connector ? chain?.id == defaultChain.id : false;
};

const MintModule = () => {
    const [mintAmount, setMintAmount] = useState(1);
    const [mintAllowed, setMintAllowed] = useState(true);
    const { activeChain } = useNetwork();
    const { data: account } = useAccount();
    // const [totalSupply, setTotalSupply] = useState(BigNumber.from("1"));
    const { data: totalSupply } = useContractSupply(
        isValidConnection(activeChain, account)
    );

    // const { data: addressBalance } = useAccountBalance(account?.address, isValidConnection(activeChain, account))

    const tokenPrice = 0.2;
    const mintMin = 1;
    const mintMax = 10;
    const maxSupply = 1000;

    useEffect(() => {
        if (totalSupply?.toNumber() >= maxSupply) {
            setMintAllowed(false);
        } else {
            setMintAllowed(true);
        }
    }, [totalSupply, maxSupply]);

    // const userBalance = addressBalance?.toNumber() ?? 0
    // const balance = userBalance.toString().padStart(3, '0')

    const { write: mint, isLoading } = useContractMint(
        account?.address,
        mintAmount,
        tokenPrice,
    );

    return (
        <div className="flex flex-col w-full align-center justify-center items-center gap-5">
            {account?.connector && mintAllowed && (
                <MintController
                    min={mintMin}
                    max={mintMax}
                    value={mintAmount}
                    handleChange={(value: number) => setMintAmount(value)}
                />
            )}
            <div className="flex flex-col w-full self-center gap-2">
                {activeChain && activeChain.id != defaultChain.id ? (
                    <WrongChainButton allowedChain={defaultChain} />
                ) : !account?.connector ? (
                    <ConnectButton />
                ) : mintAllowed ? (
                    <MintButton
                        isLoading={isLoading}
                        abled={mintAllowed}
                        onClick={() => mint()}
                    />
                ) : (
                    <BackoffButton/>
                )}
            </div>
            <MintStatus current={totalSupply} max={maxSupply} />
        </div>
    );
};

export default MintModule;
