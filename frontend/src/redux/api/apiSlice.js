import{fetchBaseQuery , createApi} from "@reduxjs/toolkit/query/react"

import { BASE_URL } from "../features/constants"

const basequery=fetchBaseQuery({BASE_URL:BASE_URL})

export const apiSlice=createApi({
    basequery,
    tagTypes:['product','order','user','category'],
    endpoints:()=>({}),
    
})