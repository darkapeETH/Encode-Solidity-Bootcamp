import styles from "./instructionsComponent.module.css";
import { useAccount, useNetwork, useSignMessage, useBalance, useContractRead } from 'wagmi';
import { useState, useEffect} from "react";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>My App</h1>
        </div>
      </header>
      <p className={styles.get_started}>
        <PageBody></PageBody>
      </p>
    </div>
  );
}

function PageBody() {
  return (
    <div>
      <RandomProfile></RandomProfile>
      <WalletInfo></WalletInfo>
    </div>
  );
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
   if (address)
  return (
    <div>
      <p>Your account address is {address}</p>
      <p>You are connected to {chain?.name} Network</p>
      <WalletAction></WalletAction>
      <WalletBalance address={address}></WalletBalance>
      <TokenName></TokenName>
      <TokenBalance address={address}></TokenBalance>
    </div>
  );
  if (isConnecting)
  return (
    <div>
      <p>Connecting wallet. Please check your Metamask Wallet...</p>
    </div>
  );
  if (isDisconnected)
  return (
    <div>
      <p>Wallet disconnected. Connect wallet to continue</p>
    </div>
  );
  return (
  <div>
    <p>Connect wallet to continue</p>
  </div>
  );
}

function WalletAction() {
  const [signatureMessage, setSignatureMessage] = useState("");

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
  return (
    <div>
      <form>
        <label>
          Enter the message to be signed:
          <input
            type="text"
            value={signatureMessage}
            onChange={(e) => setSignatureMessage(e.target.value)}
          />
        </label>
      </form>
      <button
        disabled={isLoading}
        onClick={() =>
          signMessage({
            message: signatureMessage,
          })
        }
      >
        Sign message
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
}

function WalletBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({
    address: params.address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
}

function TokenName() {
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useContractRead({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Contract not deployed on {chain?.name} Network</div>;
  return <div>Token name: {name}</div>;
}

function TokenBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useContractRead({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [params.address],
  });

  const balance = typeof data === "number" ? data : 0;

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return <div>Balance: {balance} USDC</div>;
}

function RandomProfile() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results[0]);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>
        Name: {data.name.title} {data.name.first} {data.name.last}
      </h1>
      <p>Email: {data.email}</p>
    </div>
  );
}