import axios from 'axios'

const api = axios.create({
  baseURL: '/api' // express
})

export const createUser = table => api.post(`/user`)
export const updateUserById = _id => api.put(`/user/${_id}`)
export const deleteUserById = _id => api.delete(`/user/${_id}`)
export const getUserById = _id => api.get(`/user/${_id}`)
export const getUsers = () => api.get(`/users`)

const apis = {
    createUser,
    updateUserById,
    deleteUserById,
    getUserById,
    getUsers,
}

export default apis
