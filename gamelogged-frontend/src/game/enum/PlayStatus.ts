export type PlayStatus =
    | "PLAYED"
    | "PLAYING"
    | "COMPLETED"
    | "ABANDONED"
    | "SHELVED"
    | "WISHLIST"
    | "NONE";

export const PlayStatus = {
    PLAYED: "PLAYED",
    PLAYING: "PLAYING",
    COMPLETED: "COMPLETED",
    ABANDONED: "ABANDONED",
    SHELVED: "SHELVED",
    WISHLIST: "WISHLIST",
    NONE : "NONE"
} as const;