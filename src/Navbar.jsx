import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css"

export default function Navbar(){
    return (
        <nav className="nav">
            <Link to="/nfcontrol/" className="site-title">
                NFCONTROL
            </Link>
            <ul>
                <CustomLink to="/nfcontrol/worker">Worker</CustomLink>
                <CustomLink to="/nfcontrol/user">User</CustomLink >
            </ul>
    </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }