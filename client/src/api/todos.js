import { baseApi } from "./base"

export const getTodos = (options) => {
  return baseApi.get("todos", options).then((res) => res.data)
}

export const getUserTodos = (options, userId) => {
  return baseApi.get(`todos?userId=${userId}`, options).then((res) => res.data)
}
