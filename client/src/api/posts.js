import { baseApi } from "./base"

export function getPosts(options) {
  if (!options.userId) {
    return baseApi
      .get(`posts/?q=${options.query}`, options)
      .then((res) => res.data)
  } else {
    return baseApi
      .get(`posts/?q=${options.query}&userId=${options.userId}`, options)
      .then((res) => res.data)
  }
}

export async function getPost(options, postId) {
  return await baseApi.get(`posts/${postId}`, options).then((res) => res.data)
}

export function getUserPosts(options, userId) {
  return baseApi.get(`posts?userId=${userId}`, options).then((res) => res.data)
}

export function createPost(params) {
  return baseApi.post("posts", params).then((res) => res.data)
}
