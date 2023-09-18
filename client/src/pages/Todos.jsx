import { useLoaderData } from "react-router"
import { getTodos } from "../api/todos"

export default function Todos() {
  const todoData = useLoaderData()
  return (
    <ul>
      {todoData.map((todo) => (
        <li
          key={todo.id}
          style={{
            textDecoration: `${todo.completed ? "line-through" : "none"}`,
          }}
        >
          {todo.title}
        </li>
      ))}
    </ul>
  )
}

const loader = ({ request: { signal } }) => {
  return getTodos({ signal })
}

export const TodoRoute = {
  loader,
  element: <Todos />,
}
