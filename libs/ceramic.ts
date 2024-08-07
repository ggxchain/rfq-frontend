import { ComposeClient }from '@composedb/client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays/from-string'

// Import your compiled composite
import definition from './runtime-composite.json' with { type: "json" }

// Create an instance of ComposeClient
const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })

// Hexadecimal-encoded private key for a DID having admin access to the target Ceramic node
// Replace the example key here by your admin private key
const privateKey = fromString('61b2b07eed5e5a0f24fb4101c4d2d1dd214205fecd90d38a199e083008f749bf', 'base16')

const did = new DID({
  resolver: getResolver(),
  provider: new Ed25519Provider(privateKey),
})

export async function createRequest(amount: number, bitcoinAddress: string, ethereumAddress: string, expirationDate: number, nonce: number, publicKey: string ) {
  await did.authenticate()
  compose.setDID(did)

  let rtMutation = await compose.executeQuery(`
    mutation CreateNewRequest($i: CreateRequestInput!) {
      createRequest(input: $i) {
        document{
            amount
            bitcoinAddress
            ethereumAddress
            expirationDate
            nonce
            publicKey
        }
      }
    }
    `
    , 
    {
      "i": {
        "content": {
          "amount": amount,
          "bitcoinAddress": bitcoinAddress,
          "ethereumAddress": ethereumAddress,
          "expirationDate": expirationDate,
          "nonce": nonce,
          "publicKey": publicKey
        }
      }
    }
    );

  return rtMutation
}

export async function createQuote(publicKeyMaker: string, publicKeyTaker: string, nonce: number, quoteMessageEncrypted: string, quoteSignatureEncrypted: string) {
  await did.authenticate()
  compose.setDID(did)

  let rtMutation = await compose.executeQuery(`
    mutation CreateNewQuoteEncrypted($i: CreateRequestInput!) {
      createQuoteEncrypted(input: $i) {
        document{
            pm
            pt
            quoteNonce
            quoteMessageEncrypted
            quoteSignatureEncrypted
        }
      }
    }
    `
    , 
    {
      "i": {
        "content": {
          "pm": publicKeyMaker,
          "pt": publicKeyTaker,
          "quoteNonce": nonce,
          "quoteMessageEncrypted": quoteMessageEncrypted,
          "quoteSignatureEncrypted": quoteSignatureEncrypted,
        }
      }
    }
    );

  return rtMutation

}

export async function getActiveRequests() {
  let rt = await compose.executeQuery(`
    query MyQuery {
      viewer {
        requestList(first: 10) {
          edges {
            node {
              amount
              bitcoinAddress
              ethereumAddress
              expirationDate
              id
              nonce
              publicKey
            }
            cursor
          }
        }
      }
    }
    `
    )

    return rt;
}

export async function getAddressRequests(ethereumAddress: string) {
  let rt = await compose.executeQuery(`
    query MyQuery {
      viewer {
        requestsIndex(filters:$input, first:5) {
          edges {
            node {
              amount
              bitcoinAddress
              ethereumAddress
              expirationDate
              id
              nonce
              publicKey
            }
            cursor
          }
        }
      }
    }
    `,
    {
      "input": {
        "where": {
          "ethereumAddress": {
            "_eq": ethereumAddress
          }
        }
      }
    }
    )

    return rt;
}

//todo how to filter Encrypted quote
export async function getAddressQuotes() {

}