import Form from "../../components/CustomForm";
import type { NoteData, Tag } from "../../types";

export type CreatePageProps = {
  handleSubmit: (NoteData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];

} & Partial<NoteData>

const CreatePage = ({
  availableTags,
  handleSubmit,
  createTag,
}: CreatePageProps) => {
  return (
    <div className="conteiner py-5 m-3">
      <h2>Yeni Not Oluştur</h2>
      <Form
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags}
      />
    </div>
  );
};
export default CreatePage;
