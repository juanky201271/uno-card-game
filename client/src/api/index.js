import axios from 'axios'

const api = axios.create({
  baseURL: '/api' // express
})

export const createUser = payload => api.post(`/user`, payload)
export const updateUserById = (_id, payload) => api.put(`/user/${_id}`, payload)
export const deleteUserById = _id => api.delete(`/user/${_id}`)
export const getUserById = _id => api.get(`/user/_id/${_id}`)
export const getUserByEmail = email => api.get(`/user/email/${email}`)
export const getUserByName = name => api.get(`/user/name/${name}`)
export const getUserByIp = ip => api.get(`/user/ip/${ip}`)
export const getUsers = () => api.get(`/users`)

export const createGame = payload => api.post(`/game`, payload)
export const updateGameById = (_id, payload) => api.put(`/game/${_id}`, payload)
export const deleteGameById = _id => api.delete(`/game/${_id}`)
export const getGameById = _id => api.get(`/game/${_id}`)
export const getGames = () => api.get(`/games`)

export const createPlayer = payload => api.post(`/player`, payload)
export const updatePlayerById = (_id, payload) => api.put(`/player/${_id}`, payload)
export const deletePlayerById = _id => api.delete(`/player/${_id}`)
export const getPlayerById = _id => api.get(`/player/${_id}`)
export const getPlayers = () => api.get(`/players`)

const apis = {
    createUser,
    updateUserById,
    deleteUserById,
    getUserById,
    getUserByEmail,
    getUserByName,
    getUserByIp,
    getUsers,

    createGame,
    updateGameById,
    deleteGameById,
    getGameById,
    getGames,

    createPlayer,
    updatePlayerById,
    deletePlayerById,
    getPlayerById,
    getPlayers,
}

export default apis
