import { useLoaderData } from "react-router"
import { getUsers } from "../api/users"
import { Link } from "react-router-dom"

function UserList() {
  const userList = useLoaderData()
  return (
    <div className="card-grid">
      {userList.map((user) => (
        <div className="card" key={user.id}>
          <div className="card-header">{user.name}</div>
          <div className="card-body">
            <div>{user.company?.name}</div>
            <div>{user.website}</div>
            <div>{user.email}</div>
          </div>
          <div className="card-footer">
            <Link to={user.id.toString()} className="btn">
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

const loader = ({ request: { signal } }) => {
  return getUsers({ signal })
}

export const userListRoute = {
  loader,
  element: <UserList />,
}
