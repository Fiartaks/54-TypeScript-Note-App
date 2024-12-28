import { Navigate, Outlet, useParams } from "react-router-dom"
import type { Note } from "../../types"


interface LayoutProps {
    notes: Note[]
  
}

const Layout = ({notes}:LayoutProps) => {

 //1-)url den id al
  const id = useParams().id

  //2-) id ile ilgili notu bul
  const found = notes.find((n) => n.id === id)

  //3-) not bulunamadıysa anasayfaya yonlendir
  if (!found) return <Navigate to={'/'} replace/>

  //4-) alt route aekrana bas alt route a gondewr

  return (
    <Outlet context={found}/>

    
  )
}
export default Layout