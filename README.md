# OAEuth
Dæpp for OAuth2 on the chain - login through æternity

## Description
This is a decentralized app made with Angular for the æternity hackathon Nov 27 - Dec 15. It's implementing an authorization endpoint for the [OAuth2 authorization protocol](https://tools.ietf.org/html/rfc6749). More specific, the endpoint for the implicit authorization flow. In this flow, the æpp takes the place of the authorization server, providing a way to authenticate individuals (in combination with the [identity-manager](https://github.com/aeternity/aepp-identity)) and issue [JSON Web Tokens](https://jwt.io/) usable for authentication at a resource server.

     +--------+                               +---------------+
     |        |                               |               |
     |        |--(C)-- Authorization Grant -->| 	 OÆuth      |
     | Client |                               |     app       |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+

The blockchain acts as the "database holding user credentials" and, at the same time, allows signing and verification of the tokens. The process for this to work is as follows:

1) User chooses to login to some service via æternity
2) User is redirected to OÆuth with the following parameters (according to OAuth2)
    * `response_type=token` identifier marking the expected response
    * `client_id=<string>` service identifier
    * `redirect_uri=<string>` where to redirect the token
3) OÆuth performs contract transaction, persisting the grant to the chain indexed by the users account
4) OÆuth assembles token (containing tx-hash and account address) and signs it with the users private key
5) OÆuth redirects the token
6) The resource server may recover a user's public key from the tx-hash and account address to subsequently verify the token's signature


## Problem solved
OAuth2 is a really cool protocol preventing the need to have separate accounts for every service you use. Yet, with a trustful web, only big authorization providers are trusted. Most of the times you can only login through the well-known socials or the like. Therefore your authorization data is heavily centralized and controlled by the centralized authorization providers. With OÆuth, common authorization schemes are not forced to change to correct this. Authorization data is stored on the chain, controlled only by yourself, yet still fully reliable. With a bit more work to it and compatability of a service, you may login to your favorite web-based service through æternity.

## Approach
I had actually no experience in writing dapps starting this off, just the idea to replace centralized authorization servers with the chain. Also, I didn't know VueJS, in which all other dæpp apps are written. So, I build OÆuth using Angular and TypeScript. First, I worked out the process for issuing tokens based on blockchain by studying the OAuth2 protocol, JWT and smart contracts. Then I implemented a basic prototype, later implemented the contract and accompying application logic. Lastly I've included the æternity style guide to my abilities, so that the æpp would fit into the identity manager. It's build mobile-first, so it should look great on phone screens and pretty acceptable on desktop devices.
The æpp still has some shortcomings, thus making it's initial concept not really useable for production yet. E.g. you'd need deep links for the identity-manager to open OÆuth through a redirect. This should be fixable in the near future with updates to the identity-manager
