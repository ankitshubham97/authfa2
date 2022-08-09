import { BeaconWallet } from "@taquito/beacon-wallet";
import { SigningType } from "@airgap/beacon-sdk";
import { STRING_NONCE } from "../constants";

export const wallet = new BeaconWallet({
  name: "Tezos AuthFA2 Demo",
  preferredNetwork: "jakartanet",
});

export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "jakartanet" } });
};

export const disconnectWallet = async () => {
  await wallet.clearActiveAccount();
}

export const getAccount = async () =>  {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return {walletPublicAddress: activeAccount.address, walletPublicKey: activeAccount.publicKey};
  } else {
    return {walletPublicAddress: "", walletPublicKey: ""};;
  }
};

export const signPayload = async () => {
  const response = await wallet.client.requestSignPayload({
    signingType: SigningType.RAW,
    payload: STRING_NONCE,
  });
  return response.signature;
};
