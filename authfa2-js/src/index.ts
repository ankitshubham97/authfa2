import GetTokenRequest from './interfaces/getTokenRequest';
import GetTokenResponse, {
  GetTokenResponseFailure,
  GetTokenResponseSuccess,
} from './interfaces/getTokenResponse';
import JwtAccessTokenPayload from './interfaces/jwtAccessTokenPayload';
import { verifySignature } from '@taquito/utils';
import axios from 'axios';
import jwt from 'jsonwebtoken';

async function doesWalletOwnNft(
  walletPublicKey: string,
  nftContractAddress: string,
): Promise<boolean> {
  const response = await axios.get(`https://api.jakartanet.tzkt.io/v1/tokens/balances?token.contract=${nftContractAddress}&balance=1`);
  const { data } = response;
  const currentOwnerAddress = data[0].account.address;
  return currentOwnerAddress === walletPublicKey;
}

function createToken(secret: string, walletPublicKey: string, nftContractAddress: string): string {
  const expiresIn = '1h';
  const jwtAccessTokenPayload: JwtAccessTokenPayload = {
    walletPublicKey,
    nftContractAddress,
  };
  return jwt.sign(jwtAccessTokenPayload, secret, { expiresIn });
}

export { GetTokenResponseSuccess, GetTokenResponseFailure, GetTokenResponse };
export { JwtAccessTokenPayload };
export default function AuthNft() {
  let _secret: string;
  let _nftContractAddress: string;

  return {
    init: function ({
      secret,
      nftContractAddress,
    }: {
      secret: string;
      nftContractAddress: string;
    }) {
      _secret = secret;
      _nftContractAddress = nftContractAddress;
    },
    getToken: async function (
      getTokenRequest: GetTokenRequest
    ): Promise<GetTokenResponse> {
      const {
        nonce,
        signature,
        walletPublicKey,
        walletPublicAddress,
      } = getTokenRequest;
      try {
        if (!verifySignature(nonce, walletPublicKey, signature)) {
          return {
            data: {
              errorMessage: 'Invalid signature',
              errorCode: 'invalid_signature',
            },
            code: 400,
          };
        }
        // Check if the wallet owns the NFT.
        if (
          !(await doesWalletOwnNft(
            walletPublicAddress,
            _nftContractAddress,
          ))
        ) {
          return {
            data: {
              errorMessage: 'Invalid NFT',
              errorCode: 'invalid_nft',
            },
            code: 400,
          };
        }
        return {
          data: {
            accessToken: createToken(_secret, walletPublicKey, _nftContractAddress),
            walletPublicKey,
            walletPublicAddress,
            nftContractAddress: _nftContractAddress,
            iat: Date.now(),
            exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
          },
          code: 200,
        };
      } catch (err) {
        console.log(err);
        return {
          data: {
            errorMessage: 'Unknown error',
            errorCode: 'unknown_error',
          },
          code: 500,
        };
      }
    },
    verifyToken: function (token: string): boolean {
      try {
        jwt.verify(token, _secret) as JwtAccessTokenPayload;
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
