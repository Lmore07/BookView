export interface BooksAll {
  idBook: number;
  author: string;
  isFavorite: boolean;
  bookName: string;
  publicationDate: Date;
  illustrator: string;
  coverPhoto?: string;
  isViewed: boolean;
}

export interface PageI {
  idPage: number;
  numberPage: number;
  audio: string | null;
  video: string | null;
  image: string | null;
  template: string;
  content: string;
}
