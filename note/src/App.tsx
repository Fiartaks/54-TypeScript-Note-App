import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new" element={<CreatePage />} />

        <Route path="/:id">
          <Route index element={<DetailPage />} />
          <Route path="edit" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
