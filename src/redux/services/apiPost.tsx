import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseGetPosts } from "../../interfaces/interfaces";
import { getCookie } from "../../utils/cookies";

export interface BodyDataSppCart {
  idGame: string | number | null;
  idUser: string | number | null;
}

// interface GetWithId {
//   id: string | number | undefined;
// }

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
  tagTypes: [""],
  endpoints: (builder) => ({
    getPostList: builder.query<
      ResponseGetPosts,
      {
        url: string;
        page: number;
        urlCategories: string;
        categories: string[] | undefined;
        section: "Main" | "Events" | "Useful%20Information";
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
    }),
    // getPostPage: builder.mutation({
    //     query: ({ page }) => ({
    //         url: `/posting?page=${page}`,
    //         method: "get",
    //     })
    // })
  }),
});

export const {
  useGetPostListQuery,
  // useGetPostPageMutation
} = postApi;
