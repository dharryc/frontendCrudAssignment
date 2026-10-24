import { useEffect, useState } from "react";
import type { Character } from "../types/Character";
import { API_URL } from "../../constants"
import { CharacterCard } from "./CharacterCard";

export function CharacterList() {
    const [characterList, setCharacterList] = useState<Character[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        async function getCharacters() {
            const characterResponse = await fetch(`${API_URL}characters`)
            if (!characterResponse.ok) {
                setErrorMessage("OH NO, OH DEAR, NO NO NO NO NO, SOMETHING HAS GONE HORRIBLY ATROCIOUSLY WRONG!!!")
                return
            }
            const characterData = await characterResponse.json()
            setCharacterList([...characterData])
            setIsLoading(false)
        }

        getCharacters()
        console.log("wowie, you did it Harry! (that's me, I hope these little weird easter eggs get seen)")
    }, [])

    return (
        isLoading ? (<h1>{errorMessage}</h1 >) :
            (
                <div className="characterList">
                    {characterList.map((character) => <CharacterCard character={character} key={character.id} />)}
                </div>
            )
    )
}