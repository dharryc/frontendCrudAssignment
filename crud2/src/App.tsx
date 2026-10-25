import { Route, Routes } from "react-router"
import { CharacterList } from "./components/CharacterList"
import { Nav } from "./components/Nav"
import { Home } from "./components/Home"
import { NewCharacter } from "./components/NewCharacter"

function App() {

  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/characters" element={<CharacterList/>}/>
      <Route path="/newcharacter" element={<NewCharacter/>}/>
    </Routes>
    </>
  )
}

export default App
