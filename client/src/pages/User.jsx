import { useLoaderData } from "react-router"
import { Link } from "react-router-dom"
import { getUserPosts } from "../api/posts"
import { getUserTodos } from "../api/todos"
import { getUser } from "../api/users"

function User() {
  const { user, todos, posts } = useLoaderData()
  return (
    <div className="container">
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.website}
      </div>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {posts.map((post) => (
          <div key={post.id} className="card">
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`/posts/${post.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "strike-through" : ""}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

const loader = async ({ request: { signal }, params }) => {
  const todos = await getUserTodos({ signal }, params.userId)
  const user = await getUser(params.userId, { signal })
  const posts = await getUserPosts({ signal }, params.userId)
  return {
    todos,
    user,
    posts,
  }
}

export const UserRoute = {
  loader,
  element: <User />,
}
