interface GetFa2TokenResponse {
  id: number;
  account: {
    address: string;
  };
  token: {
    id: number;
    contract: {
      address: string;
    };
    tokenId: string;
    standard: string;
  };
  balance: string;
  transfersCount: number;
  firstLevel: number;
  firstTime: string;
  lastLevel: number;
  lastTime: string;
}

export default GetFa2TokenResponse;