import React from 'react'
import { AppProps } from 'next/app'
import { Provider, createClient, defaultChains, Chain } from 'wagmi'
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import '../styles/globals.css'
import { providers } from 'ethers'
import { connectors } from '../lib/connectors'

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

// const chains = defaultChains
// const defaultChain = chains.find((x: Chain) => x.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID || 1))

const client = createClient({
    autoConnect: true,
    provider({ chainId }: any) {
        if (process.env.NEXT_PUBLIC_CHAIN == "local") {
            return new providers.JsonRpcProvider(
                process.env.NEXT_PUBLIC_RPC_URL,
                chainId
            )
        } else {
            return new providers.AlchemyProvider(chainId, alchemyId)
        }
    },
    connectors
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider client={client}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp;
