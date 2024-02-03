# IBC operations

This is the IBC operations part of the exam for the second cohort of the ICF academy.

For this exercise, you have to:

1. Set up an IBC relayer between a Cosmos blockchain on your local computer and the Cosmos Hub's Theta public testnet (`theta-testnet-001`).
2. Send tokens from your local chain across to a precise recipient on Theta.

To test that you have completed the task:

1. We use identifiers that are unique to you. The identifiers are:
   1. The **recipient on Theta** to which you have to send some tokens is **<StudentInfo.addressRecipient>**. This is where you have to send the tokens.
   2. On your **local blockchain**, the **denomination** of the token you have to send to the recipient is **<StudentInfo.homeDenom>**. This is one of the denoms on your local blockchain.
2. We only check the recipient's balances on the testnet. This means you are free to decide how you reach this goal.
   1. We are looking for a balance with a denom that is `ibc/${sha256Of("transfer/channel-A-NUMBER/<StudentInfo.homeDenom>")}` and an amount strictly greater than 0.
   2. We are agnostic as to what channel number you are using as long as it is between 1 and 10,000 inclusive. If your channel number is any different, you should alert us, for instance on Discord.

Some pointers to assist you along the way:

* Your local chain has to declare a token with the <StudentInfo.homeDenom> denom. This token does not need to be the staking token.
* Your local chain can declare other denoms such as `stake` too, but that is irrelevant for the exercise.
* If you use Ignite to start your local blockchain, have a look at `config.yml` to declare new denoms.
* To get testnet tokens, ask the faucet [here](https://discord.com/channels/669268347736686612/953697793476821092). You need an account on the testnet in order to pay the fees.
* To find a Theta testnet RPC end point, look [here](https://github.com/cosmos/testnets/tree/master/public#endpoints). At the time of writing, `sentry--02` was working well.
* We recommend the use of the [most recent version](https://hermes.informal.systems/quick-start/installation.html) of the Hermes relayer for this assignment. You can fetch the config for the `theta-testnet-001` with `hermes config auto --chains testnets/cosmoshubtestnet --output ~/.hermes/config.toml`. You will need to add the configuration for your local chain manually. It might be helpful to have a look at the [sample](https://github.com/b9lab/cosmos-ibc-docker/blob/main/tokentransfer/README.md) in the course.
* To see the balances of your recipient, and confirm your success, head to a block explorer, for instance [here](https://explorer.theta-testnet.polypore.xyz/account/<StudentInfo.addressRecipient>).
* When you have established the IBC channel, and have its `channelId`, you can find out the denom that will be created when you transfer tokens. Go [here](https://emn178.github.io/online-tools/sha256.html) and input the string `transfer/channel-channelId/<StudentInfo.homeDenom>`.

Good luck.
