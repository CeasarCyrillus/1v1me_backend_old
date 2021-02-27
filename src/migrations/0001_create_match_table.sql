CREATE TABLE IF NOT EXISTS Matches (
    id SERIAL PRIMARY KEY,
    player1Address TEXT NOT NULL,
    createdAt DATE,
    updatedAt DATE
);