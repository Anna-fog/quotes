import type { Quote } from "@/models/Quotes";

export type Author = {
  id: string,
  name: string,
  route: string,
  booksFilter: boolean,
  themesFilter: boolean,
  quotes: Quote[]
}