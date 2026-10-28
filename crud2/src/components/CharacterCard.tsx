import { useState } from "react"
import type { Character, Class } from "../types/Character"

type CharacterCardProps = {
    character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
    const [characterObject, setCharacter] = useState(character)
    const [isEditing, setIsEditing] = useState(false)
    const classes: Class[] = ["Warrior", "Mage", "Rogue", "Archer"]

    async function updateCharacter() {
        setIsEditing(false)
    }
    return (
        <div className="singleCharacter">
            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <label>Name:</label>
                    <input
                        value={characterObject.name}
                        onChange={(e) => setCharacter({ ...characterObject, name: e.target.value.trim() })} />
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
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div className="characterCard">
                    <h3>{characterObject.name}</h3>
                    <p>Class: {characterObject.class}</p>
                    <p>Level: {characterObject.level}</p>
                    <p>Mana: {characterObject.mana}</p>
                    <h4>Health: {characterObject.health}</h4>
                    <button onClick={() => setIsEditing(true)}>Update Character</button>
                    <br />
                </div >

            )
            }
        </div>
    )
}