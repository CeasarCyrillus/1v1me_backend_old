DELETE
FROM Matches;
ALTER TABLE Matches
    ADD COLUMN player2Address         TEXT DEFAULT NULL,
    ADD COLUMN player1PaymentRequired INTEGER NOT NULL,
    ADD COLUMN player2PaymentRequired INTEGER NOT NULL,

    ADD COLUMN player1PaymentDone     INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN player2PaymentDone     INTEGER NOT NULL DEFAULT 0,

    ADD COLUMN walletPhrase           TEXT    NOT NULL,
    ADD COLUMN walletPrivateKey       TEXT    NOT NULL,
    ADD COLUMN walletAddress          TEXT    NOT NULL;
