import { useLoaderData } from "react-router"
import { Form, Link } from "react-router-dom"
import { getPosts } from "../api/posts"
import { useEffect, useRef } from "react"

function PostsList() {
  const { posts, query, userId } = useLoaderData()
  const queryRef = useRef("")
  const authorRef = useRef(0)

  useEffect(() => {
    queryRef.value = query
    authorRef.value = userId
  }, [query, userId])
  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <a className="btn btn-outline" href="/posts/new">
            New
          </a>
        </div>
      </h1>
      <Form method="get" action="/posts" className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input
              type="search"
              name="query"
              id="query"
              defaultValue={queryRef.value}
              ref={queryRef}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select
              type="search"
              name="userId"
              id="userId"
              ref={authorRef}
              defaultValue={authorRef.value}
            >
              <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <div className="card-grid">
        {posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="card-header">{post.title}</div>
            <div className="card-body">
              <div className="card-preview-text">{post.body}</div>
            </div>
            <div className="card-footer">
              <Link to={`/posts/${post.id}`} className="btn">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

const loader = async ({ request: { signal, url } }) => {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get("query") || ""
  const userId = searchParams.get("userId") || 0
  const posts = await getPosts({ signal, query, userId })
  return {
    posts,
    query,
    userId,
  }
}

export const postsRoute = {
  loader,
  element: <PostsList />,
}
