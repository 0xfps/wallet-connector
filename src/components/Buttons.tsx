import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal, useWeb3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi'
import { arbitrum, mainnet, polygon, avalancheFuji, avalanche } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, avalancheFuji, avalanche]
const projectId = "2b7453846f1e15135622c97033271176"

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const Buttons = () => {
    const { open, close } = useWeb3Modal()

    return (
        <div>
            <WagmiConfig config={wagmiConfig}>
                <button onClick={() => open()}>
                    Connect Wallet Via WalletConnect 📦
                </button>
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </div>
    )
}

export default Buttons