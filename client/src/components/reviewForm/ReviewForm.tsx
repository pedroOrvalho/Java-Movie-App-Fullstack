import { Form, Button } from "react-bootstrap";

type Props = {
  handleSubmit: any;
  setReviewText: React.Dispatch<React.SetStateAction<string>>;
  labelText: string;
  value: string;
};

export default function ReviewForm({
  handleSubmit,
  setReviewText,
  labelText,
  value,
}: Props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextareal">
        <Form.Label>{labelText}</Form.Label>
        <Form.Control
          onChange={(e) => setReviewText(e.target.value)}
          as="textarea"
          rows={3}
          value={value}
        ></Form.Control>
      </Form.Group>
      <Button variant="outline-info" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
