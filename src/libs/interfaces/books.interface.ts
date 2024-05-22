export interface BooksAll {
  idBook: number;
  authors: string[];
  isFavorite: boolean;
  bookName: string;
  publicationDate: Date;
  illustrator: string;
  coverPhoto?: any;
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

export interface CoverI {
  coverPhoto: any;
  authors: string[];
  bookName: string;
  publicationDate: any;
  idBook: number;
}

export interface BookInfo {
  idBook: number;
  authors: string[];
  bookName: string;
  publicationDate: Date;
  editorial: string;
  illustrator: string;
  coverPhoto?: string;
  Pages: PageI[];
  categoriesIds: number[];
}
