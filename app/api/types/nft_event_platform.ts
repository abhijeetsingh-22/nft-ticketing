/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/nft_event_platform.json`.
 */
export type NftEventPlatform = {
  "address": "55fbYsCqEjoiUDBKjDMqkKn3SkmVErexhTmfkpPz8ySV",
  "metadata": {
    "name": "nftEventPlatform",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "buyTicket",
      "discriminator": [
        11,
        24,
        17,
        193,
        168,
        116,
        164,
        169
      ],
      "accounts": [
        {
          "name": "buyer",
          "signer": true
        },
        {
          "name": "collection",
          "writable": true
        },
        {
          "name": "asset",
          "writable": true,
          "signer": true
        },
        {
          "name": "organizer",
          "writable": true
        },
        {
          "name": "platform",
          "writable": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "createCollection",
      "discriminator": [
        156,
        251,
        92,
        54,
        233,
        2,
        16,
        82
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "collection",
          "writable": true
        },
        {
          "name": "mplCoreProgram",
          "address": "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        },
        {
          "name": "ticketPrice",
          "type": "u64"
        },
        {
          "name": "maxTickets",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "myBaseCollectionV1",
      "discriminator": [
        146,
        52,
        141,
        249,
        49,
        9,
        218,
        200
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "stringTooLong",
      "msg": "Provided string is too long"
    }
  ],
  "types": [
    {
      "name": "myBaseCollectionV1",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "uri",
            "type": {
              "array": [
                "u8",
                256
              ]
            }
          },
          {
            "name": "ticketPrice",
            "type": "u64"
          },
          {
            "name": "maxTickets",
            "type": "u64"
          },
          {
            "name": "organizer",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
