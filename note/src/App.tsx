import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Tag, type Note } from "./types";
import { v4 } from "uuid";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  //Yeni etiket olusturma
  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  //Yeni Not olusturma id sini ekle
  const createNote = (noteData: NoteData): void => {
    //Objeye id ozellh#gi ekle
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };

    //State yeni not ekle
    setNotes((prev) => [...prev, newNote]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/new"
          element={
            <CreatePage
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/:id">
          <Route index element={<DetailPage />} />
          <Route path="edit" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
