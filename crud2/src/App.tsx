import { Route, Routes } from "react-router"
import { CharacterList } from "./components/CharacterList"
import { Nav } from "./components/Nav"
import { Home } from "./components/Home"
import { CharacterListQuery } from "./components/CharacterListQuery"

function App() {

  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/characters" element={<CharacterList/>}/>
      <Route path="/characters-query" element={<CharacterListQuery/>}/>
    </Routes>
    </>
  )
}

export default App
