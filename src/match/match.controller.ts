import { Controller, Get } from "@nestjs/common";
import { MatchService } from "./match.service";
import { wallet } from "nanocurrency-web";

@Controller()
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async getMatches() {
    return await this.matchService.findAll();
  }

  async createNewMatch(player1Address: string) {
    const tempWallet = generateWallet();
    return {
      paymentAddress: tempWallet.address,
    };
  }
}

interface NanoWallet {
  address: string;
  passPhrase: string;
  privateKey: string;
}

const generateWallet = (): NanoWallet => {
  const passPhrase = wallet.generate().mnemonic;
  const newWallet = wallet.fromLegacyMnemonic(passPhrase);
  return {
    address: newWallet.accounts[0].address,
    passPhrase: newWallet.mnemonic,
    privateKey: newWallet.accounts[0].privateKey,
  };
};
