export interface Character{
    id: string
    name: string
    class: string //I use string here because there could be new classes I think, there's nothing in the sql that says class must be some type
    level: number
    health: number
    mana: number
}