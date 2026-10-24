import type { Character } from "../types/Character"

type CharacterCardProps = {
    character: Character
}

export function CharacterCard({ character }: CharacterCardProps)
{
    return(
        <>
        <div className="characterCard">
            <h3>{character.name}</h3>
            <p>Class: {character.class}</p>
            <p>Level: {character.level}</p>
            <p>Mana: {character.mana}</p>
            <h4>Health: {character.health}</h4>
            <br />
        </div>
        </>
    )
}