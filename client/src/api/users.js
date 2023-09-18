import { baseApi } from "./base"

function getUsers(options) {
  return baseApi.get(`users`, options).then((res) => res.data)
}

function getUser(userId, options) {
  return baseApi.get(`users/${userId}`, options).then((res) => res.data)
}

export { getUser, getUsers }
