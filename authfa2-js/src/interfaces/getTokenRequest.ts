interface GetTokenRequest {
  nonce: string;
  signature: string;
  walletPublicKey: string;
  walletPublicAddress: string;
  nftContractAddress: string;
  nftId: string;
}

export default GetTokenRequest;
