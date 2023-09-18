import { useEffect, useState } from "react"
import { useLoaderData } from "react-router"
import { Link } from "react-router-dom"
import { getComments } from "../api/comments"
import { getPost } from "../api/posts"
import { getUser } from "../api/users"

function Post() {
  const { post, comments } = useLoaderData()
  const [userName, setUserName] = useState()
  // get the userName by userId
  async function getUserName(userId) {
    const user = await getUser(userId)
    setUserName(user.name)
    console.log(userName)
  }
  useEffect(() => {
    getUserName(post.userId)
  }, [post.userId])
  return (
    <div className="container">
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{userName}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const loader = async ({ request: { signal }, params }) => {
  const post = await getPost({ signal }, params.postId)
  const comments = await getComments({ signal }, params.postId)
  return {
    post,
    comments,
  }
}

export const postRoute = {
  loader,
  element: <Post />,
}
