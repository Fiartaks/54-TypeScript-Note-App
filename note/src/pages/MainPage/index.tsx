import { Button, Col, Row, Stack, Form } from "react-bootstrap";
import type { Note, Tag } from "../../types";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import Card from "../../components/Card";

type MainPageProps = {
  notes: Note[];
  availableTags: Tag[];
};

const MainPage = ({ availableTags, notes }: MainPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filtredNotes = useMemo(
    () =>
      notes.filter((note) => {
        return (
          //Notun basligi aratilan metni iceriyorsa not u dondur
          (title === "" ||
            note.title.toLowerCase().includes(title.toLowerCase())) &&
          //Sectigimiz etiket tamami notta varsa not u dondur
          (selectedTags.length === 0 ||
            selectedTags.every((s_tag) =>
              note.tags.some((noteTag) => noteTag.value === s_tag.value)
            ))
        );
      }),
    [title, selectedTags, notes]
  );

  return (
    <div className="container py-5">
      {/* Ust Kisim */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1>Notlar</h1>

        <Link to={"/new"}>
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/* Filtrteleme Kismi */}
      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Gore Ara</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags)}
                options={availableTags}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* Notlar Kismi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="p-2 g-3 mt-4">
        {filtredNotes.map((note) => (
          <Col>
            <Card key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default MainPage;
