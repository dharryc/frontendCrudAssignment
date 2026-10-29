import { useState } from "react"
import type { Character, Class } from "../types/Character"
import { API_URL } from "../../constants"

type CharacterCardProps = {
    character: Character,
    onDelete: (id: Character["id"]) => void
}

export function CharacterCard({ character, onDelete }: CharacterCardProps) {
    const [characterObject, setCharacter] = useState(character)
    const [savedCharacter, setSavedCharacter] = useState(character)
    const [isEditing, setIsEditing] = useState(false)
    const classes: Class[] = ["Warrior", "Mage", "Rogue", "Archer"]
    const [errorMessage, setErrorMessage] = useState("")

    async function updateCharacter() {
        try {
            const serverPut = await fetch(`${API_URL}characters/${character.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(characterObject)
            })
            if (!serverPut.ok) {
                const errorData = await serverPut.json().catch(() => ({}))
                setErrorMessage(errorData.error ?? "The character could not be updated.")
                setCharacter(savedCharacter)
            }
            else {
                setSavedCharacter(characterObject)
                setIsEditing(false)
                setErrorMessage("")
            }
        }
        catch {
            setErrorMessage("Hoooooo BOY! It looks like you broke this in some way (I think you probably didn't have the backend running).")
        }
    }

    async function deleteCharacter() {
        try {
            const serverDelete = await fetch(`${API_URL}characters/${character.id}`, {
                method: 'DELETE'
            })
            if (!serverDelete.ok) {
                const errorData = await serverDelete.json().catch(() => ({}))
                setErrorMessage(errorData.error ?? "The character could not be deleted.")
            }
            else {
                onDelete(character.id)
            }
        }
        catch {
            setErrorMessage("Hoooooo BOY! It looks like you broke this in some way (I think you probably didn't have the backend running).")
        }
    }

    return (
        <div className="singleCharacter">
            {(errorMessage === "") ? (<></>) : (<h4>{errorMessage}</h4>)}
            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <label>Name:</label>
                    <input
                        value={characterObject.name}
                        onChange={(e) => setCharacter({ ...characterObject, name: e.target.value })} />
                    <label>Class:</label>
                    <select
                        value={characterObject.class}
                        onChange={(e) => setCharacter({ ...characterObject, class: e.target.value as Class })}>
                        {classes.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                    <label>Level:</label>
                    <input
                        type="number"
                        value={characterObject.level}
                        onChange={(e) => setCharacter({ ...characterObject, level: Number(e.target.value) })} />
                    <label>Health:</label>
                    <input
                        type="number"
                        value={characterObject.health}
                        onChange={(e) => setCharacter({ ...characterObject, health: Number(e.target.value) })} />
                    <label>Mana:</label>
                    <input
                        type="number"
                        value={characterObject.mana}
                        onChange={(e) => setCharacter({ ...characterObject, mana: Number(e.target.value) })} />
                    <button onClick={updateCharacter}>Save</button>
                    <button onClick={() => {
                        setIsEditing(false)
                        setErrorMessage("")
                        setCharacter(savedCharacter)
                    }}>Cancel</button>
                </form>
            ) 
            : 
            (
                <div className="characterCard">
                    <h3>{characterObject.name}</h3>
                    <p>Class: {characterObject.class}</p>
                    <p>Level: {characterObject.level}</p>
                    <p>Mana: {characterObject.mana}</p>
                    <h4>Health: {characterObject.health}</h4>
                    <button onClick={() => setIsEditing(true)}>Update Character</button>
                    <button onClick={deleteCharacter}>Delete Character</button>
                    <br />
                </div >

            )
            }
        </div>
    )
}