import { getAccessToken, removeAccessToken } from "../utils/rest";
import { connectWallet, disconnectWallet, getAccount, signPayload } from "../utils/wallet";

const Navbar = (props) => {
  const  {
    account,
    setAccount,
    setError,
    setAccessToken,
    onGetContent,
  } = props;

  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(JSON.stringify(account));
    const signature = await signPayload();
    const {accessToken, error} = await getAccessToken({signature, ...account});
    if (error) {
      setError(error);
    }
    if (accessToken) {
      setAccessToken(accessToken);
      await onGetContent()
    }
  };

  const ondisconnectWallet = async () => {
    await disconnectWallet();
    setAccount("");
    const resp = await removeAccessToken();
    setAccessToken(null);
    console.log(resp);
  };

  const getPublicAddressFromAccount = () => {
    if (account === "") {
      return "";
    }
    const publicAddr = JSON.parse(account)?.walletPublicAddress;
    if (publicAddr) {
      return publicAddr;
    }
    return "";
  }

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          Tezos AuthFA2 Demo
        </a>
        <div className="d-flex">
          {(() => {
            const publicAddr = getPublicAddressFromAccount();
            if (publicAddr && publicAddr !== "") {
              return <button className="btn btn-outline-secondary" disabled>Connected to ${publicAddr}</button>;
            }
            return <button onClick={onConnectWallet} className="btn btn-outline-info"> Connect Wallet </button>;
          })()}
          &nbsp;
          {(() => {
            const publicAddr = getPublicAddressFromAccount();
            if (publicAddr && publicAddr !== "") {
              return <button onClick={ondisconnectWallet} className="btn btn-outline-danger">Disconnect</button>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
