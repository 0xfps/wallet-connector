import { useEffect, useState } from "react"

const WalletConnect = () => {
    let [address, setAddress] = useState<string | null>(null)

    useEffect(() => {
        const localStorageAddress: string | null = localStorage.getItem("address")
        setAddress(localStorageAddress)
    }, [])

    const connectWallet = async () => {
        console.log("Connect Wallet Was Called!")
        // @ts-ignore
        if (window.ethereum) {
            // @ts-ignore
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            setAddress(accounts[0])
            localStorage.setItem("address", accounts[0])
        } else {
            console.log("Download Metamask!")
        }
    }

    const getLatestAccount = async () => {
        console.log("Get Latest Accounts Was Called!")
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        setAddress(accounts[0])
        localStorage.setItem("address", accounts[0])
    }

    const truncateAddress = (address: string): string => {
        let shortString = ""

        shortString += address.slice(0, 5)
        shortString += "..."
        shortString += address.slice(address.length - 3, address.length)

        return shortString
    }

    const disconnectWallet = () => {
        setAddress(null)
        localStorage.removeItem("address")
    }

    // @ts-ignore
    window.ethereum.on("accountsChanged", getLatestAccount)

    return (
        <div>
            {
                (!address) ?
                    <button onClick={connectWallet}>Click To Connect 👋🏾</button>
                    :
                    <div>
                        <button>Hi {truncateAddress(address)} 👋🏾</button>
                        <button onClick={disconnectWallet} style={{ marginLeft: "10px" }}>Click To Disconnect 🤷🏾‍♂️</button>
                    </div>
            }
        </div>
    )
}

export default WalletConnect