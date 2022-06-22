import { defaultChains, Chain } from 'wagmi'
import { chainId } from './config'

const anvil: Chain = {
    id: 31337,
    name: "Anvil local",
    nativeCurrency: {
        decimals: 18,
        name: 'Go Ethereum',
        symbol: 'GO',
    },
    rpcUrls: {
        default: 'http://127.0.0.1:8545',
    },
    testnet: true,
}


let chains = defaultChains;
chains.push(anvil);


const defaultChain = chains.find((x: Chain) => x.id === chainId) ?? anvil

export { chains, defaultChain };
