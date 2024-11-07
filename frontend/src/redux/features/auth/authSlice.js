import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userinfo:localStorage.getItem('useinfo')? JSON.parse(localStorage.getItem('userinfo')):null
}


const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredientials:(state,action)=>{
            state.userinfo=action.payload;
            localStorage.setItem("useInfo",JSON.stringify(action.payload))
            const expirationTime = new Date().getTime()* 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem('expirationTime',expirationTime)
        }

        logout:(state)=>{
            state.userinfo=null;
            localStorage.clear();
        }
    }
})


export const {setCredientials,logout} = authSlice.actions;

export default authSlice.reducer;