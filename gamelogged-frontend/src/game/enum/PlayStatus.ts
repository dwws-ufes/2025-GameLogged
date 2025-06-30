export type PlayStatus =
    | "PLAYED"
    | "PLAYING"
    | "COMPLETED"
    | "ABANDONED"
    | "SHELVED"
    | "WISHLIST"
    | "NONE";

export const PlayStatus = {
    NONE : "Não jogado",
    PLAYED: "Jogado",
    PLAYING: "Jogando",
    COMPLETED: "Finalizado",
    ABANDONED: "Abandonado",
    SHELVED: "Na estante",
    WISHLIST: "Wishlist",
} as const;