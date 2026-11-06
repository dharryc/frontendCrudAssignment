import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { Character } from "../types/Character"
import { API_URL } from "../../constants"
import { CharacterCard } from "./CharacterCard"


export function CharacterListQuery() {
    const queryClient = useQueryClient()
    const { data: characterList, isPending, isError, error } = useQuery({
        queryKey: ["characters"],
        queryFn: fetchCharacters,
        staleTime: 60 * 1000, // This is how you do 1 minute, because it's in milliiseconds. I'm not sure why it's in milliseconds, that seems super granular for control, but I shall ask about it if it ever comes up, and otherwise it's just something I'm going to have to remember.
    })

    async function fetchCharacters(): Promise<Character[]> {
        console.log("This is where we're running the queryFn! If you're reading this, there's some request happening! Yaaayyyyyy!")
        const characterResponse = await fetch(`${API_URL}characters`)
        if (!characterResponse.ok) {
            const errorData = await characterResponse.json().catch(() => ({}))
            throw new Error(errorData.error ?? "The characters could not be loaded.")
        }
        const characterData: Character[] = await characterResponse.json()
        return [...characterData].sort((a, b) => a.name.localeCompare(b.name))
    }

    if (isPending) return <h1 className="loadingMessage">Loading characters (TanStack Query)...</h1>
    if (isError) return <h1>{error.message}</h1>

    return (
        <div className="characterList">
            <h1>BEHOLD. THE BEAUTIOUS SECONDARY CODE, WHICH DOES KNOW TO USE THE WONDERS OF TANNERS STACK:</h1>
            {characterList.map((character) => (
                <CharacterCard
                    character={character}
                    key={character.id}
                    onDelete={() => queryClient.invalidateQueries({ queryKey: ["characters"] })} />
            ))}
        </div>
    )
}
