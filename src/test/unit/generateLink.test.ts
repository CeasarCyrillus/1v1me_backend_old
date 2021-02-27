import { generateLink } from "../../utils";

describe("generateLink", () => {
  it("uses id and player1Address to create a relative link", () => {
    const id = 829;
    const player1Address =
      "nano_34prihdxwz3u4ps8qjnn14p7ujyewkoxkwyxm3u665it8rg5rdqw84qrypzk";

    const link = generateLink(id, player1Address);

    expect(link).toEqual("/match/3675366423371499");
  });
});
