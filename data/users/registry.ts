export const VALID_USERNAMES = ["mina", "mike"] as const;
export type Username = (typeof VALID_USERNAMES)[number];
