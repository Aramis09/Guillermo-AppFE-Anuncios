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
  img: string;
  userId: number;
  sizeId: number;
  importanceId: number;
  categoryId: null;
  sectionId: number;
  size: Size;
  importance: ImportanceClass;
  section: Section;
  contactValue:string;
  contactType:string
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

