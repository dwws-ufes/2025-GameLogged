export type PlayStatus =
    | "PLAYED"
    | "PLAYING"
    | "COMPLETED"
    | "ABANDONED"
    | "SHELVED"
    | "WISHLIST";

export const PlayStatus = {
    PLAYED: "PLAYED",
    PLAYING: "PLAYING",
    COMPLETED: "COMPLETED",
    ABANDONED: "ABANDONED",
    SHELVED: "SHELVED",
    WISHLIST: "WISHLIST"
} as const;