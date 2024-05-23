import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BodyCreatePost,
  ResponseGetAllCategories,
  ResponseGetPosts,
} from "../../interfaces/interfaces";
import { getCookie } from "../../utils/cookies";

export interface BodyDataSppCart {
  idGame: string | number | null;
  idUser: string | number | null;
}

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SOME_BASE_URL}`,
    mode: "cors",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("auth-secret-key", `${import.meta.env.VITE_SOME_KEY_SECRET}`);
      headers.set(
        "auth-token",
        `${getCookie({ nameCookie: "messiEntroAJugar" }).cookiesFound || null}`
      );

      return headers;
    },
  }),
  tagTypes: ["getPostUpdateDelete", "getPostUpdateCreate", "getCategoryList"],
  endpoints: (builder) => ({
    getPostList: builder.query<
      ResponseGetPosts,
      {
        url: string;
        page: number;
        urlCategories: string;
        categories: string[] | undefined;
        section: "Principal" | "Eventos" | "Informacion%20Util";
      }
    >({
      query: ({ url, urlCategories, page, categories, section }) => {
        if (categories?.length) {
          return `${urlCategories}?page=${[page]}&categories=${JSON.stringify(
            categories
          )}&section=${section}`;
        }
        return `${url}?page=${page}&section=${section}`;
      },
      providesTags: ["getPostUpdateDelete", "getPostUpdateCreate"],
    }),
    searchPostByOwner: builder.query<
      ResponseGetPosts,
      {
        owner: string;
      }
    >({
      query: ({ owner }) => ({
        url: `/posting/getPostByOwner?owner=${owner}`,
        method: "get",
      }),
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `${import.meta.env.VITE_SOME_BASE_URL}/posting/?idPost=${id}`,
        method: "delete",
      }),
      invalidatesTags: ["getPostUpdateDelete"],
    }),
    createPost: builder.mutation({
      query: (body: BodyCreatePost) => ({
        url: `${import.meta.env.VITE_SOME_BASE_URL}/posting`,
        method: "post",
        body,
      }),
      invalidatesTags: ["getPostUpdateCreate"],
    }),
    getCategoryList: builder.query<ResponseGetAllCategories, void>({
      query: () => ({
        url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
        method: "get",
      }),
      providesTags: ["getCategoryList"],
    }),
    createCategory: builder.mutation({
      query: (body: { categories: string[] }) => ({
        url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
        method: "post",
        body,
      }),
      invalidatesTags: ["getCategoryList"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryForDelete: string) => ({
        url: `${import.meta.env.VITE_SOME_BASE_URL}/category`,
        method: "delete",
        body: {
          name: categoryForDelete,
        },
      }),
      invalidatesTags: ["getCategoryList"],
    }),
  }),
});

export const {
  useGetPostListQuery,
  useSearchPostByOwnerQuery,
  useDeletePostMutation,
  useCreatePostMutation,
  useGetCategoryListQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = postApi;
