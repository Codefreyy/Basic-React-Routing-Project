import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom"
import { createPost } from "../api/posts"
import { getUsers } from "../api/users"

export default function NewPost() {
  const users = useLoaderData()
  const { state } = useNavigation()
  const errors = useActionData()
  const isSubmitting = state === "submitting"

  return (
    <>
      <Form method="post" action="/posts/new" className="form">
        <div className="form-row">
          <div className={`form-group ${errors?.title ? "error" : ""}`}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />

            {errors?.title != null && (
              <div className="error-message">{errors.title}</div>
            )}
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
          <div className={`form-group ${errors?.body != null ? "error" : ""}`}>
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
            {errors?.body != null && (
              <div className="error-message">{errors.body}</div>
            )}
          </div>
        </div>

        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? "Submitting" : "Save"}
          </button>
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

  // fields validations
  const errors = postFormValidator({ title, body, userId })
  if (Object.keys(errors).length > 0) {
    return errors
  }
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

export function postFormValidator({ title, body, userId }) {
  const errors = {}

  if (title === "") {
    errors.title = "Title is required"
  }

  if (body === "") {
    errors.body = "Body is required"
  }

  if (userId === "") {
    errors.userId = "User is required"
  }

  return errors
}
