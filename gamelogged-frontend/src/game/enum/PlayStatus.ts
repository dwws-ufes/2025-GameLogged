export type PlayStatus =
    | "PLAYED"
    | "PLAYING"
    | "COMPLETED"
    | "ABANDONED"
    | "SHELVED"
    | "WISHLIST"
    | "NONE";

export const PlayStatus = {
    NONE: "NONE",
    PLAYED: "PLAYED",
    PLAYING: "PLAYING",
    COMPLETED: "COMPLETED",
    ABANDONED: "ABANDONED",
    SHELVED: "SHELVED",
    WISHLIST: "WISHLIST",
} as const;

export const PlayStatusLabel = {
    NONE: "Não jogado",
    PLAYED: "Jogado",
    PLAYING: "Jogando",
    COMPLETED: "Finalizado",
    ABANDONED: "Abandonado",
    SHELVED: "Na estante",
    WISHLIST: "Wishlist",
} as const;