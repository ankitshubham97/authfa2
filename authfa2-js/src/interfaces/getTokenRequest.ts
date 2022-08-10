interface GetTokenRequest {
  nonce: string;
  signature: string;
  walletPublicKey: string;
  walletPublicAddress: string;
}

export default GetTokenRequest;
