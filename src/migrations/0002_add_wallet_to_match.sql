ALTER TABLE Matches
    ADD COLUMN player2Address         TEXT DEFAULT NULL,
    ADD COLUMN player1PaymentRequired NUMERIC NOT NULL,
    ADD COLUMN player2PaymentRequired NUMERIC NOT NULL,

    ADD COLUMN player1PaymentDone     NUMERIC NOT NULL DEFAULT 0,
    ADD COLUMN player2PaymentDone     NUMERIC NOT NULL DEFAULT 0,

    ADD COLUMN walletPhrase           TEXT    NOT NULL,
    ADD COLUMN walletPrivateKey       TEXT    NOT NULL,
    ADD COLUMN walletAddress          TEXT    NOT NULL;
