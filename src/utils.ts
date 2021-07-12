import * as config from "../config/config.json";
import { createDb, migrate } from "postgres-migrations";
import { wallet } from "nanocurrency-web";

export const setupDatabase = async (env: "dev" | "test") => {
  const dbConfig = {
    database: config.database[env].database,
    user: config.database[env].user,
    password: config.database[env].user,
    host: config.database[env].host,
    port: config.database[env].port,
  };

  await createDb(dbConfig.database, {
    ...dbConfig,
    defaultDatabase: "postgres",
  });

  await migrate(dbConfig, "src/migrations");
};

export interface NanoWallet {
  address: string;
  passPhrase: string;
  privateKey: string;
}

export const generateWallet = (): NanoWallet => {
  const passPhrase = "guitar solution achieve surface dry health scan verb fork fitness suit baby visa team another verb earn hood shine antenna dune true certain elephant"//wallet.generate().mnemonic;
  const newWallet = wallet.fromLegacyMnemonic(passPhrase);
  console.log( newWallet.accounts[0].privateKey)
  return {
    address: newWallet.accounts[0].address,
    passPhrase: newWallet.mnemonic,
    privateKey: newWallet.accounts[0].privateKey,
  };
};

export const generateRandomString = () => {
  const seed = (new Date().getMilliseconds() * (Math.random() + 1)).toString();
  const str = (new Date().getMilliseconds() * (Math.random() + 1)).toString();
  return FnvHash(str + seed, 2).toUpperCase();
};

const Fnv32a = (str: string) => {
  let hashValue = 0x811c9dc5;
  for (let i = 0, l = str.length; i < l; i++) {
    hashValue ^= str.charCodeAt(i);
    hashValue +=
      (hashValue << 1) + (hashValue << 4) + (hashValue << 7) + (hashValue << 8) + (hashValue << 24);
  }
  return ("0000000" + (hashValue >>> 0).toString(16)).substr(-8);
};

const FnvHash = (str: string, iterations = 1) => {
  let totalHash = Fnv32a(str);
  for(let i = 0; i < iterations; i++){
    const h1 = Fnv32a(str);
    const h2 = h1 + Fnv32a(h1 + str)
    totalHash += h2;
  }

  return totalHash;
};
