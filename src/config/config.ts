import { createConfig, configureChains, mainnet, sepolia } from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [publicProvider()],
)

export const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new InjectedConnector({
            chains,
            options: {
                name: 'Injected',
                shimDisconnect: true,
            },
        }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: "67ebb6efb737cc040203fb7e03fc1fda"
            }
        })
    ],
    publicClient,
    webSocketPublicClient,
})