# AuthFA2
_Because auth needs a revamp!_

## Problems with the current auth mechanisms?
### Dependency on centralized system
Have you faced the problem of not getting signed in with Google because Google's auth server is down? It could be any of the OAuth providers like YouTube, Facebook, Twitter, Github, Twitch and the list goes on. The issue is that these providers are central point-of-failure in the auth flow. And we know that despite being giants, they go down quite often.
### Ineffective auth
Currently, auth servers don't actually authenticate you; it authenticates your credentials. So, a random Tom-Dick-Harry is you if they have your credentials! I know you'd say that now we have 2FA and TOTP in place to tackle this. But they also come with a deterioration in the UX. For example, doesn't it seem tedious to authenticate yourself using an authenticator app? Can we do better than just putting another layer of authentication step?
### Strictly non-transferable auth
We all use paid services and they are obviously protected by auth. What if you are done with a service but you still have the credentials with you? You can't just go to the service and ask for your money for the upcoming period, in most of the cases. What if there was an infrastructure to transfer your credentials to another needy person?

## Solution: Enters AuthFA2 😎
AuthFA2 lays down the protocol of how we can leverage FA2 tokens to address the above problems. The whitepaper could be found [here][NFT-Auth WP]. But briefly putting it, a bird's-eye view of comparison between AuthFA2 & traditional auth could look like this:
1. FA2 tokens serve as credentials
2. Blockchain + Smart contract would replace traditional centralized auth servers.

### High-level flow:
- User wants to access a protected resource.
- App asks user to sign using the wallet which contains the FA2 token. (The service provider has promised that anyone having that FA2 token would be able to access the protected resource.)
- User signs with the wallet.
- Voila! User is in!

## What is in this repository?
This repository contains 3 sub-projects:
1. [AuthFA2 protocol][README AuthFA2].
2. Implementation of the protocol as [NodeJS SDK][AuthFA2 NodeJS SDK].
3. A [complete demo][Demo App] consisting of [smart contract][Demo FA2 Contract], [backend service][Demo Backend] and [frontend][Demo App], powered by the [AuthFA2 NodeJS SDK][AuthFA2 NodeJS SDK]. The app is based on Jakartanet and the related FA2 smart contract is deployed [here][Demo FA2 Contract] (Contract address: KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY on Jakartanet)
The smart contract is in the `smart-contracts` directory.

## [TezAsia Hackathon 2022][Tezasia Hackathon]
This project is developed as part of [Tezasia Hackathon][Tezasia Hackathon] (but the project itself aligns with my larger vision; see [Future plans][Future plans] below). If you are a panelist/judge/reviewer, please check out the steps [here][README Frontend] on how to interact with the project.

### For the panelists/judges/reviewers of TezAsia Hackathon 2022
The demo video is here: https://youtu.be/pMP9pZe77B4

The app is deployed at https://authfa2-frontend.vercel.app/

The app is based on Jakartanet and the related FA2 smart contract is deployed [here][Demo FA2 Contract] (Contract address: KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY)

If you want to interact with the app, you would need a wallet which has the 'Rick' FA2 token (as told in the demo video). Here is a list of private keys of the wallets which contain the 'Rick' FA2 tokens:
```sh
edskS66ZbqHyZWuRAk2Js1veaK6h1vju6DoZwMAuxkMP37LgVjXJH8wm7cWCTZiazWaaPG8rDXq4h9v2G8hJUtvx5V38vgiXVi
```
To check the unhappy path, you could just use any random wallet.

You could also choose to run your own instance of the backend and the frontend. You would find the instructions in the respective README files:
- [Running Backend][README Auth Server]
- [Running Frontend][README Frontend]

## Future plans
The [demo][Demo App] is just a POC. The larger vision is to have an array of applications powered by AuthFA2 and similar protocols in other chains as well. As a matter of fact, after getting accepted as a builder fellow in the [Polygon Fellowship, 2022][Polygon Fellowship 2022], I have been working on developing a similar project on Polygon chain. I was able to integrate my protocol with [Owncast][Owncast Repo] (demo video [here][Owncast-X demo]) and more improvements are done as days progress. I am calling this application `Owncast-X`.
`Owncast-X` is one of the applications which would find immense importance in the creator economy space. The possibility is endless when it comes to develop other ground breaking applications with AuthFA2. Some applications that are in pipeline deal with:
1. Copyright protection
2. Document vaults
3. Decentralized insurance
4. POAP

[Tezasia Hackathon]: <https://unstop.com/competition/tezasia-hackathon-tezos-india-357710>
[NFT-Auth WP]: <https://www.notion.so/ankitshubham/NFT-Auth-Protocol-4de9641932a24ec3a59665adc97b3ebb>
[Polygon Fellowship 2022]: <https://polygon.technology/polygon-fellowship/>
[Polygon Fellowship project]: <https://devfolio.co/projects/nft-auth-d07d>
[Owncast Repo]: <https://github.com/owncast/owncast>
[Owncast-X Demo]: <https://www.youtube.com/watch?v=7Sy4ijl2Nc8>
[AuthFA2 NodeJS SDK]: <https://www.npmjs.com/package/authfa2>
[README AuthFA2]: <../main/authfa2-js/README.md>
[README Frontend]: <../main/frontend/README.md>
[README Auth Server]: <../main/auth-server/README.md>
[Future plans]: <../main/README.md#future-plans>
[Demo Video]: <https://youtu.be/pMP9pZe77B4>
[Demo App]: <https://authfa2-frontend.vercel.app/>
[Demo Backend]: <https://authfa2-backend.herokuapp.com/>
[Demo FA2 Contract]: <https://better-call.dev/jakartanet/KT1X2ifoZhfgz1AhYfHVV36P1sf9UwJS56HY/operations>
