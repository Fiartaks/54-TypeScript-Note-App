import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Tag, type Note } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";

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

  //Note silme

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
  //Note guncelleme
  const updateNote = (id: string, updatedData: NoteData) => {
    const updated = notes.map((note) =>
      note.id == id
        ? {
            id,
            ...updatedData,
          }
        : note
    );
    //State guncelle
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
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

        <Route path="/:id" element={<Layout notes={notes} />}>
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditPage
                createTag={createTag}
                availableTags={tags}
                onSubmit={updateNote}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
