
//Importando pacotes necessários
const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - tesnet
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0` 

//criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da cartiera HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log(`Endereço: ${btcAddress}`)
console.log(`Chave privada: ${node.toWIF()}`)
console.log(`Seed: ${mnemonic}`)

/*
Primeira saida gerada ao usar o programa!

Carteira gerada
Endereço: mrdM3WiqfZyVzEdzRZQiKacSJCx4GoHNah
Chave privada: cNij6cqzsgQUrJcM5A53arW9UrXTLJQnJHEMEpEjYtRfmi7pHjHS
Seed: regular awful demand coast flock mirror energy aspect weird eternal kidney legal 


Segunda carteira gerada para testes

Carteira gerada
Endereço: msafx6QAbSUEtkZybpSZTendmdzm2uBUE3
Chave privada: cPtZqeuyPhNnoTZxEpaUNhyqM2rABPruoS5AeQmudGR9VKpkrgrq
Seed: hello other imitate route cricket small six this employ collect popular embody

faucet para uso testnet
https://coinfaucet.eu/en/btc-testnet/
*/
