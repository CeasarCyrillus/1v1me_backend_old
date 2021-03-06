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
  const passPhrase = wallet.generate().mnemonic;
  const newWallet = wallet.fromLegacyMnemonic(passPhrase);
  return {
    address: newWallet.accounts[0].address,
    passPhrase: newWallet.mnemonic,
    privateKey: newWallet.accounts[0].privateKey,
  };
};

export const generateLink = (id: number, player1Address: string) => {
  const str = `${id}${player1Address}`;
  const matchId = cyrb53(str);
  return `/match/${matchId}`;
};

const cyrb53 = (str: string, seed: number = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};
