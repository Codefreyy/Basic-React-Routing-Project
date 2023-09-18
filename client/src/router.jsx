import { createBrowserRouter, Navigate } from "react-router-dom"
import RootLayout from "./layouts/rootLayout"
import { userListRoute } from "./pages/UserList"
import { postsRoute } from "./pages/PostList"
import { postRoute } from "./pages/Post"
import { TodoRoute } from "./pages/Todos"
import { UserRoute } from "./pages/User"
import Error from "./pages/Error"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
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
])
