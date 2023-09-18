import { baseApi } from "./base"

export function getPosts(options) {
  return baseApi.get(`posts`, options).then((res) => res.data)
}

export async function getPost(options, postId) {
  return await baseApi.get(`posts/${postId}`, options).then((res) => res.data)
}

export function getUserPosts(options, userId) {
  return baseApi.get(`posts?userId=${userId}`, options).then((res) => res.data)
}
