import { LinkType } from "./types";

export const getLink = (id: number, type: LinkType) => {
  return `/${type === "people" ? "people" : "movies"}/${id}`;
};
