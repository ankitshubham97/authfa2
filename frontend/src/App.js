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
                <hr></hr>
                <div>✔️ <a href="https://github.com/ankitshubham97/authfa2#problems-with-the-current-auth-mechanisms">Problem proposed and Solution figured out</a></div>
                <div>✔️ <a href="https://ankitshubham.notion.site/NFT-Auth-Protocol-4de9641932a24ec3a59665adc97b3ebb">AuthFA2 protocol Whitepaper</a></div>
                <div>✔️ <a href="https://www.npmjs.com/package/authfa2">Implementation of AuthFA2 protocol as NodeJS SDK</a></div>
                <div>✔️ POC streaming app (this app itself)</div>
                <div>✔️ <a href="https://youtu.be/pMP9pZe77B4">Demo Video</a></div>
                <div>😎 <b>Brownie point: </b>Working on <a href="https://www.youtube.com/watch?v=7Sy4ijl2Nc8">a similar solution</a> as an ACCEPTED PROJECT in <a href="https://polygon.technology/polygon-fellowship/"><b>Polygon Fellowship 2022</b></a> for Polygon chain.</div>
                <div>🎯 <a href="https://github.com/ankitshubham97/authfa2#future-plans">The larger vision</a></div>
              </div>
            );
          })()}
          
        </div>
      </div>
    </div>
  );
};

export default App;
