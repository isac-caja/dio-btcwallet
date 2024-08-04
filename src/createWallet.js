// importing dependecies to create a new wallet using bitcoin lib
import bip32 from 'bip32'
import bip39 from 'bip39'
import bitcoin from 'bitcoinjs-lib';

// defining the test network
const network = bitcoin.networks.testnet;

// declare path to hierarchical wallet derivated
const path = `m/49'/1'/0'/0`

// generating a mnemonic seed
let minemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(minemonic)

// generating the root of wallet - attach to network
const root = bip32.fromSeed(seed, network)

// generating the account
const account = root.derivePath(path)

// getting the bitcoing address
const btcAddresss = bitcoin.payments.p2pkh({
    pubkey: account.publicKey,
    network: network
}).address

console.log("wallet generated")
console.log(`address: ${btcAddresss}`)
console.log(`private key: ${account.toWIF()}`)
console.log(`minemonic: ${minemonic}`)