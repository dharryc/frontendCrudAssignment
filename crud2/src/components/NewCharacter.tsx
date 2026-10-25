import { useEffect, useId, useState } from "react"
import type { Character } from "../types/Character"
import { API_URL } from "../../constants"

export function NewCharacter() {
    const [character, setCharacter] = useState<Character>({
        id: useId(),
        name: "",
        class: "",
        level: 0,
        health: 0,
        mana: 0
    })
    const [errorMessage, setCharacterMessage] = useState("")
    const [disableButton, setDisableButton] = useState(true)

    async function submitCharacter() {
        const serverResponse = await fetch(`${API_URL}characters`, {
            method: 'POST',
            body: JSON.stringify(character)
        })
        const data = await serverResponse.json()
        console.log(data.data)
    }

    return (
        <div className="newCharacterForm">
            <form action={submitCharacter}>
                <label>Name:</label>
                <input
                    value={character.name}
                    onChange={(e) => setCharacter({ ...character, name: e.target.value })} />
                <label>Class:</label>
                <input
                    value={character.class}
                    onChange={(e) => setCharacter({ ...character, class: e.target.value })} />
                <label>Level:</label>
                <input
                    type="number"
                    value={character.level}
                    onChange={(e) => setCharacter({ ...character, level: Number(e.target.value) })} />
                <label>Health:</label>
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
        </div>
    )
}