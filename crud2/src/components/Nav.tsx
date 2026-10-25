import { Link } from 'react-router'

export function Nav(){
    return(
        <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/characters"}>Characters</Link>
            <Link to={"/newcharacter"}>New Character</Link>
        </nav>
    )
}