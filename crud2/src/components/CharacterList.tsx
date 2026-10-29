import { useEffect, useState } from "react";
import type { Character } from "../types/Character";
import { API_URL } from "../../constants"
import { CharacterCard } from "./CharacterCard";
import { NewCharacter } from "./NewCharacter";

export function CharacterList() {
    const [characterList, setCharacterList] = useState<Character[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [showNewCharacter, setShowNewCharacter] = useState(false)
    const [showCharacters, setShowCharacters] = useState(true)

    async function getCharacters() {
        try {
            const characterResponse = await fetch(`${API_URL}characters`)
            if (!characterResponse.ok) {
                const errorData = await characterResponse.json()
                setErrorMessage(errorData.error)
            } else{
                const characterData = await characterResponse.json()
                setCharacterList([...characterData].sort((a, b) => a.name.localeCompare(b.name)))
                setErrorMessage("")
            }
        }
        catch {
            setErrorMessage("OH NO, OH DEAR, NO NO NO NO NO, SOMETHING HAS GONE HORRIBLY ATROCIOUSLY WRONG!!!")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCharacters()
        console.log("wowie, you did it Harry! (that's me, I hope these little weird easter eggs get seen)")
    }, [])

    return (
        isLoading ? (<h1 className="loadingMessage">Loading characters...</h1>) :
            errorMessage ? (<h1>{errorMessage}</h1>) :
                (
                    <div className="characterList">
                        {showCharacters &&
                            <div>
                                {characterList.map((character) => <CharacterCard
                                    character={character}
                                    key={character.id}
                                    onDelete={(id) => setCharacterList(characterList.filter((c) => c.id !== id))} />)}
                                <button onClick={() => {
                                    setShowNewCharacter(true)
                                    setShowCharacters(false)
                                }}>New Character</button>
                            </div>
                        }
                        {showNewCharacter && <NewCharacter finished={() => {
                            setShowCharacters(true)
                            setShowNewCharacter(false)
                            getCharacters()
                        }} />}
                    </div>
                )
    )
}