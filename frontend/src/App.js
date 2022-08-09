import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import { getContent } from "./utils/rest";
import { getAccount } from "./utils/wallet";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    (async () => {
      const account = await getAccount();
      setAccount(JSON.stringify(account));
    })();
  }, []);

  const onGetContent = async () => {
    try {
      setLoading(true);
      const { uri, error } = await getContent();
      if (error) {
        alert(error);
      } else {
        setContent(uri);
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-100">
      <Navbar
        account={account}
        setAccount={setAccount}
        error={error}
        setError={setError}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        onGetContent={onGetContent}
      />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="mt-2">
          {(() => {
            if (accessToken) {
              return <img src={content} alt="loading-new..." />
            }
            return <h1>It looks like either your wallet is disconnected or you don't have the correct FA2 token with you 😔</h1>
          })()}
          
        </div>
      </div>
    </div>
  );
};

export default App;
