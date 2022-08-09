import axios from "axios";
import { API_BASE_URL, PACKED_NONCE } from '../constants';

export const getAccessToken = async ({signature, walletPublicKey, walletPublicAddress}) => {
  try{
    const res = await axios.post(
      `${API_BASE_URL}/token`, {
        nonce: PACKED_NONCE,
        signature,
        walletPublicKey,
        walletPublicAddress,
        nftContractAddress: "KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY",
        nftId: "0"
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return { accessToken: res.data.accessToken, error: null };
  } catch (error) {
    return { accessToken: null, error };
  }
};

export const removeAccessToken = async () => {
  const res = await axios.delete(
    `${API_BASE_URL}/token`, {
      withCredentials: true,
    }
  );
  console.log(res.data);
  return res.data;
}

export const getContent = async () => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/content`, { responseType: 'blob', withCredentials: true }
    );
    return {uri: URL.createObjectURL(res.data), error: null};
  } catch (err) {
    return {uri: null, error: err};
  }
}
