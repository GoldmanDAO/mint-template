import ERC721A from "../abis/ERC721A.json";

const config = {
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 4),
    tokenAddress: process.env.NEXT_PUBLIC_TOKEN_ADDRESS,
    contractInterface: ERC721A.abi,
}

console.log(config)

export const {
    chainId,
    tokenAddress,
    contractInterface
} = config
