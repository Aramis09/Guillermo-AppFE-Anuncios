export interface ResponseGetPosts {
  message: string;
  pages: number;
  nextPage: number;
  prevPage: number;
  currentPage: number;
  data: PostDetail[];
}

export interface PostDetail {
  id: number;
  title: string;
  description: string;
  img: string;
  number_phone: string;
  personal_page: string;
  location: Location;
  userId: number;
  sizeId: number;
  importanceId: number;
  categoryId: null;
  sectionId: number;
  size: Size;
  importance: ImportanceClass;
  section: Section;
}

export interface ImportanceClass {
  id: number;
  importance: ImportanceEnum;
}

export enum ImportanceEnum {
  A = "A",
  B = "B",
  C = "C",
}

export interface Section {
  id: number;
  name: Name;
}

export enum Name {
  Events = "Events",
}

export interface Size {
  id: number;
  size: number;
}



export interface ResponseGetAllCategories {
  message: string;
  data:    CategoryDetail[];
}

export interface CategoryDetail {
  id:   number;
  name: string;
}

