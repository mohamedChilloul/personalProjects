import { createSlice } from '@reduxjs/toolkit'
import usersApi from '../api/users'

const userReducer = createSlice({
    name : 'userReducer',
    initialState : null,
    reducers : {
        setUser(state, action){
            return action.payload
        },
        deleteUser(){
            return null
        }
    }
})



export const {setUser, deleteUser} = userReducer.actions
//Google OAuth Login
export const putUser = (user) => {
    return async dispatch => {
        console.log(user, 'userInfos')
        localStorage.setItem('profile', JSON.stringify(user))
        dispatch(setUser(user))
    }
}

export const logOut = () => {
    return async dispatch => {
        console.log('Loged Out ! ')
        dispatch(deleteUser())
        localStorage.clear()
        console.log('local storage cleared ! ')
    }
}

// JWT Sign Up && Sign In : 
export const createUser = (data) => {
    return async dispatch => {
        try {
            console.log('data in userReducer : ', data)
            const createdUser = await usersApi.signUp(data)
            console.log('createdUser in UserReducer', createdUser)
            localStorage.setItem('profile', JSON.stringify(createdUser))
            dispatch(setUser(createdUser))
        } catch (error) {
            console.log(error)
        }
    }
}

export const login = (data) =>{
    return async dispatch => {
        try {
            const logedUser = await usersApi.signin(data)
            localStorage.setItem('profile', JSON.stringify(logedUser))
            dispatch(setUser(logedUser))
        } catch (error) {
            console.log(error)
        }
    }
}
export default userReducer.reducer