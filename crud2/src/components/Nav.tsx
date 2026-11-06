import { Link } from 'react-router'

export function Nav(){
    return(
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/characters"}>Regular Fetch</Link>
            <Link to={"/characters-query"}>TanStack Query</Link>
        </nav>
    )
}