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
              return <img src={content} alt="loading..." />
            }
            return (
              <div>
                <h1><center>It looks like either your wallet is disconnected or you don't have <a href="https://better-call.dev/jakartanet/KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY/">the correct FA2 token</a> with you 😔</center></h1>
                <div><center>This is for the purpose of demonstrating authfa2. If you are a panelist of <a href="https://unstop.com/competition/tezasia-hackathon-tezos-india-357710">TezAsia Hackathon 2022</a>, then please follow <a href="https://github.com/ankitshubham97/authfa2#for-the-panelistsjudgesreviewers-of-tezasia-hackathon-2022">this guideline.</a></center></div>
              </div>
            );
          })()}
          
        </div>
      </div>
    </div>
  );
};

export default App;
