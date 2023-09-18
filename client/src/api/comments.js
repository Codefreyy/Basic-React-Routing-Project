import { baseApi } from "./base"

export async function getComments(options, postId) {
  return await baseApi
    .get(`posts/${postId}/comments`, options)
    .then((res) => res.data)
}
