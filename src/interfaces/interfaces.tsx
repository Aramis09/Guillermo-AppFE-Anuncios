export interface ResponseGetPosts {
  message: string;
  pages: number;
  nextPage: number;
  prevPage: number;
  currentPage: number;
  data: PostDetail[];
}
export interface ResponseGetDetailPost {
  data: PostDetailIncludeMoreData;
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
  slowly?: boolean;
  importance: ImportanceClass;
  section: Section;
  contactValue: string;
  contactType:
    | "Whatsapp"
    | "Pagina personal"
    | "Telefono directo"
    | "Correo"
    | "Ninguno";
  created_at: string;
  owner: string;
  expire: string;
}

export interface PostDetailIncludeMoreData extends PostDetail {
  categories: {
    id: number;
    name: string;
  }[];
  importance: ImportanceClass;
  size: Size;
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
  data: CategoryDetail[];
}

export interface CategoryDetail {
  id: number;
  name: string;
}

export interface ResponseGetAllContacts {
  message: string;
  data: ContactDetail[];
}

export interface ContactDetail {
  type: string;
}

export interface ParamsHanlderCreatePost {
  size: string;
  importance: string;
  section: string;
  contactValue: string;
  contactType: string;
  publicId: string;
  categoriesSelected: string[];
  owner: string;
  expire: string;
}

export interface BodyCreatePost
  extends Omit<ParamsHanlderCreatePost, "categoriesSelected" | "publicId"> {
  img: string;
  categories: string[];
}
