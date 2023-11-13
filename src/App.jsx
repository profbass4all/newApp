import './App.css'
import Favorite from './components/Favorite'
import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import { useGlobalContext } from './MyContext'

function App() {
  const {showModal, favorites} = useGlobalContext()

  return (
    <>
      <Search />
      {favorites.length >0 &&<Favorite />}
      <Meals />
      {showModal &&<Modal />}
    </>
  )
}

export default App
