import AuthNft, { GetTokenResponseSuccess } from 'authfa2';
import express from 'express';

import Controller from '../interfaces/controller.interface';

import authMiddleware from '../middleware/auth.middleware';

class AuthenticationController implements Controller {
  public router = express.Router();
  public authnft = AuthNft();
  public _ = this.authnft.init({
    secret: process.env.JWT_SECRET ?? '',
    nftContractAddress: process.env.NFT_CONTRACT_ADDRESS ?? '',
  });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`/`, this.displayWelcomeMessage);
    this.router.post(`/token`, this.getAccessToken);
    this.router.delete(`/token`, this.removeAccessToken);
    this.router.get('/content', authMiddleware, this.getRestrictedItem);
  }

  private displayWelcomeMessage = async (
    _: express.Request,
    response: express.Response,
  ): Promise<void> => {
    response.send(`Welcome to the AuthFA2 backend server! Directly calling me isn't fun; so head to https://authfa2-frontend.vercel.app/ to explore more 🚀`);
  }

  private getAccessToken = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { nonce, signature, walletPublicKey, walletPublicAddress } =
      request.body;
    const tokenResponse = await this.authnft.getToken({
      nonce,
      signature,
      walletPublicKey,
      walletPublicAddress,
    });
    if (tokenResponse.code === 200) {
      const data = tokenResponse.data as GetTokenResponseSuccess;
      response
        .cookie('Authorization', data.accessToken, { sameSite: 'none', secure: true, httpOnly: true })
        .send(tokenResponse.data);
      return;
    }
    response.status(tokenResponse.code).send(tokenResponse.data);
  };

  private removeAccessToken = async (
    _: express.Request,
    response: express.Response
  ) => {
    response.cookie('Authorization', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    response.status(200).json({ success: true, message: 'User logged out successfully' })
}

  private getRestrictedItem = async (
    _: express.Request,
    response: express.Response
  ) => {
    response.sendFile('./rick-roll-rick-ashley.gif', { root: __dirname });
  };

}

export default AuthenticationController;
