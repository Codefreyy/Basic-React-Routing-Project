import { useLoaderData, redirect } from "react-router"
import { Form, Link } from "react-router-dom"
import { getPost } from "../api/posts"
import { getUsers } from "../api/users"
import { updatePost } from "../api/posts"

function EditPost() {
  const { users, post } = useLoaderData()
  return (
    <div>
      <h1 className="page-title">Edit Post</h1>
      <Form method="put" action="/posts/2/edit" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select defaultValue={post.userId} name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id + ""}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button className="btn">Save</button>
        </div>
      </Form>
    </div>
  )
}
export default EditPost

const action = async ({ request, params: { postId } }) => {
  const formData = await request.formData()
  const title = formData.get("title")
  const userId = formData.get("userId")
  const body = formData.get("body")
  const newPost = await updatePost(
    postId,
    { title, body, userId },
    { signal: request.signal }
  )
  return redirect(`/posts/${newPost.id}`)
}

const loader = async ({ request: { signal }, params: { postId } }) => {
  const users = await getUsers({ signal })
  const post = await getPost({ signal }, postId)
  return {
    users,
    post,
  }
}

export const editPostRoute = {
  action,
  loader,
  element: <EditPost />,
}
