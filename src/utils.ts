import * as config from '../config/config.json';
import { createDb, migrate } from 'postgres-migrations';
import { wallet } from 'nanocurrency-web';

export const setupDatabase = async (env: "dev" | "test") => {
  const dbConfig = {
    database: config.database[env].database,
    user: config.database[env].user,
    password: config.database[env].user,
    host: config.database[env].host,
    port: config.database[env].port,
  }

  await createDb(dbConfig.database, {
    ...dbConfig,
    defaultDatabase: "postgres",
  });

  await migrate(dbConfig, "src/migrations")
}

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
