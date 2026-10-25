import { Route, Routes } from "react-router"
import { CharacterList } from "./components/CharacterList"
import { Nav } from "./components/Nav"
import { Home } from "./components/Home"

function App() {

  return (
    <>
    <Nav />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/characters" element={<CharacterList/>}/>
    </Routes>
    </>
  )
}

export default App
