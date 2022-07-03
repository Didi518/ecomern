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
    // suppression article
    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `/articles/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),
    // modifier article
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/articles/${product.id}`,
        body: product,
        method: 'PATCH',
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
        method: 'POST',
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
    // créer la commande
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/commandes',
        method: 'POST',
        body,
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
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = appApi;

export default appApi;
