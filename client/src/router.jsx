import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom"
import RootLayout from "./layouts/rootLayout"
import { userListRoute } from "./pages/UserList"
import { postsRoute } from "./pages/PostList"
import { postRoute } from "./pages/Post"
import { TodoRoute } from "./pages/Todos"
import { UserRoute } from "./pages/User"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/posts" />,
          },
          {
            path: "/posts",
            children: [
              {
                index: true,
                ...postsRoute,
              },
              {
                path: ":postId",
                ...postRoute,
              },
            ],
          },
          {
            path: "/users",
            children: [
              {
                index: true,
                ...userListRoute,
              },
              {
                path: ":userId",
                ...UserRoute,
              },
            ],
          },
          {
            path: "/todos",
            ...TodoRoute,
          },
        ],
      },
    ],
  },
])

function ErrorPage() {
  const error = useRouteError()
  return (
    <>
      <h1>Error - Something wentwrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  )
}
