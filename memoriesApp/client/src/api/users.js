import axios from 'axios'

const url = 'http://localhost:5000/users'

const signUp = async (data) => {
    const returnedData = await axios.post(`${url}/signUp`, data)
    return returnedData.data
}

const signin = async (data) => {
    const returnedData = await axios.post(`${url}/signIn/`, data)
    return returnedData.data
}

export default {
    signUp,
    signin
}