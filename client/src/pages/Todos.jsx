import { useLoaderData } from "react-router"
import { getTodos } from "../api/todos"
import { Form } from "react-router-dom"

export default function Todos() {
  const todoData = useLoaderData()
  return (
    <ul>
      <Form className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" name="query" id="query" />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>
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

const loader = ({ request: { signal, url } }) => {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get("query")
  return getTodos({ signal, query })
}

export const TodoRoute = {
  loader,
  element: <Todos />,
}
