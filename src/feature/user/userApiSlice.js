import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({
  sortComparer: (a, b) => b?.createdAt?.localeCompare(a?.createdAt),
});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const users = responseData?.map((user) => {
          user.id = user?._id;
          return user;
        });

        return userAdapter.setAll(initialState, users);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addUser: builder.mutation({
      query: (postData) => ({
        url: "/users",
        method: "POST",
        body: postData,
        // { ...postData } if not for the formData
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    editUser: builder.mutation({
      query: (editData) => ({
        url: "/users",
        method: "PUT",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg?.id }],
    }),

    // confirming email at the time of creating new user account
    confirmEmail: builder.mutation({
      query: (patchData) => ({
        url: "/users/confirm-email",
        method: "POST",
        body: { ...patchData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg?.id }],
    }),
    // asking to provide email for reset password process step-1
    sendOTP: builder.mutation({
      query: (patchData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...patchData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg?.id }],
    }),

    // asking to put OTP from their email to reset password process step-2
    confirmOTP: builder.mutation({
      query: (postData) => ({
        url: "/users/confirm-otp",
        method: "POST",
        body: { ...postData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    // asking to put OTP from their email to reset password process step-3 final
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/users/reset",
        method: "POST",
        body: { ...resetData },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg?.id }],
    }),

    ///  every thin will be wrap above this line
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useSendOTPMutation,
  useConfirmOTPMutation,
  useResetPasswordMutation,
  useConfirmEmailMutation,
  useDeleteUserMutation,
} = userApiSlice;
