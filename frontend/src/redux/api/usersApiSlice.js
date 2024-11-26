import { apiSlice } from "./apiSlice";
import { BASE_URL, USERS_URL } from "../features/constants";



export const userApislice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:"POST",
                body:data,
                

            }),
        }),


        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',


            }),
        }),

        register:builder.mutation({
            query:data=>({
                url:`${USERS_URL}`,
                method:'POST',
                body:data,
            })
        }),

        profile:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/profile`,
                method:'post',
                body:data
            })
        })
    }),
})

export const {useLoginMutation , useLogoutMutation ,useRegisterMutation, useProfileMutation}= userApislice