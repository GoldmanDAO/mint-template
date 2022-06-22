import { ethers } from "ethers"
import { chain, Chain } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const chains = [chain.mainnet, chain.goerli, chain.rinkeby, chain.localhost]

export function provider({ chainId }: any) {
    const defaultChain = process.env.NEXT_PUBLIC_CHAIN

    if (defaultChain === "local") {
        return new ethers.providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_RPC_URL,
            chainId
        )
    } else {
        return ethers.getDefaultProvider(defaultChain, {
            alchemy: process.env.NEXT_PUBLIC_ALCHEMY_ID,
            quorum: 1
        })
    }
}

export function connectors({ chainId }: any) {
    const activeChain = chains.find((x: Chain) => x.id === chainId) ?? chain.mainnet
    const rpcUrl = activeChain.rpcUrls.alchemy
        ? `${activeChain.rpcUrls.alchemy}/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
        : activeChain.rpcUrls.default
    return [
        new InjectedConnector({
            chains: [activeChain],
            options: { shimDisconnect: true },
        }),
        new WalletConnectConnector({
            options: {
                qrcode: true,
                rpc: { [activeChain.id]: rpcUrl }
            }
        }),
        new CoinbaseWalletConnector({
            options: {
                appName: 'mint',
                chainId: activeChain.id,
                jsonRpcUrl: rpcUrl
            },
        })
    ]
}

