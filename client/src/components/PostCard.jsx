import { useEffect, useState } from "react"

const PostCard = ({ post }) => {
  const [postUser, setPostUser] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://127.0.0.1:3000/users/${post.userId}`)
      const user = await response.json()
      setPostUser(user)
    }

    fetchUser()
  }, [post.userId])

  return (
    <>
      <div className="container">
        <h1 className="page-title">{post.title}</h1>
        <span className="page-subtitle">
          By: <a href="user.html">{postUser.name}</a>
        </span>
        <div>{post.body}</div>
      </div>
    </>
  )
}

export default PostCard
