import { Form, Link, redirect, useLoaderData } from "react-router-dom"
import { createPost } from "../api/posts"
import { getUsers } from "../api/users"

export default function NewPost() {
  const users = useLoaderData()
  return (
    <>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">Required</div>
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
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
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  )
}

const action = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get("title")
  const userId = formData.get("userId")
  const body = formData.get("body")
  const post = await createPost(
    { title, body, userId },
    { signal: request.signal }
  )
  return redirect(`/posts/${post.id}`)
}

const loader = async ({ request: { signal } }) => {
  return await getUsers({ signal })
}
export const newPostRoute = {
  action,
  loader,
  element: <NewPost />,
}
