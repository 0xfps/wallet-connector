import { WagmiConfig } from "wagmi"
import { config } from "./config/config"
import { Profile } from "./components/Spot"

const App = () => {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig >
  )
}

export default App