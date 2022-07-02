import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// création de l'API
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: '/utilisateurs/inscription',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/utilisateurs/connexion',
        method: 'POST',
        body: user,
      }),
    }),
    // création d'article
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/articles',
        body: product,
        method: 'POST',
      }),
    }),
    // ajout au panier
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: '/articles/ajouter-au-panier',
        body: cartInfo,
        method: 'POST',
      }),
    }),
    // supprimer du panier
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: '/articles/supprimer-du-panier',
        body,
        method: 'DELETE',
      }),
    }),
    // augmenter le panier
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/articles/augmenter-panier',
        body,
        method: 'POST',
      }),
    }),
    // réduire le panier
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: '/articles/reduire-panier',
        body,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
} = appApi;

export default appApi;
