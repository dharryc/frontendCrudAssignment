import { useState } from "react"
import type { Character, Class } from "../types/Character"
import { API_URL } from "../../constants"

type props = {
    finished: () => void
}

export function NewCharacter({finished}: props) {
    const [character, setCharacter] = useState<Character>({
        id: crypto.randomUUID(), //Claude said to use this instead, so I'm going with that?
        name: "",
        class: "Archer",
        level: 0,
        health: 0,
        mana: 0
    })
    const [errorMessage, setErrorMessage] = useState("")
    const disableButton = (!character.name.trim() || !character.class || character.level < 1 || character.health < 1)
    const classes: Class[] = ["Warrior", "Mage", "Rogue", "Archer"]

    async function submitCharacter() {
        const { id, ...characterNoId } = character
        setErrorMessage("")
        try{
            const serverPost = await fetch(`${API_URL}characters`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(characterNoId)
            })
            if (!serverPost.ok) {
                const errorData = await serverPost.json().catch(() => ({}))
                setErrorMessage(errorData.error ?? "The character could not be created.")
            }
            else{
                finished()
            }
        }
        catch{
            setErrorMessage("Hoooooo BOY! It looks like you broke this in some way (I think you probably didn't have the backend running).")
        }
    }

    return (
        // I think that a lot of the things in here could use some better handling (Minimum name length, max length, etc) but this seems fine for this assignment?
        <div className="newCharacterForm">
                {(errorMessage === "") ? (<></>) : (<h4>{errorMessage}</h4>)}
                <form action={submitCharacter}>
                    <label>*Name:</label>
                    <input
                        value={character.name}
                        onChange={(e) => setCharacter({ ...character, name: e.target.value.trim() })} />
                    <label>*Class:</label>
                    <select
                        value={character.class}
                        onChange={(e) => setCharacter({ ...character, class: e.target.value as Class })}>
                        {classes.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <label>*Level:</label>
                    <input
                        type="number"
                        value={character.level}
                        onChange={(e) => setCharacter({ ...character, level: Number(e.target.value) })} />
                    <label>*Health:</label>
                    <input
                        type="number"
                        value={character.health}
                        onChange={(e) => setCharacter({ ...character, health: Number(e.target.value) })} />
                    <label>Mana:</label>
                    <input
                        type="number"
                        value={character.mana}
                        onChange={(e) => setCharacter({ ...character, mana: Number(e.target.value) })} />
                    <button type="submit" disabled={disableButton}>Create Character</button>
                </form>
                <p>An * indicates a required field</p>
        </div>
    )
}