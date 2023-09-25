import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openWindow } from "./slices/modal";
import MyModal from "./componets/modal";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const getData = async () => {
    const booksData = await axios.get('/api/books');
    const authorsData = await axios.get('api/authors');
    setBooks(booksData.data);
    setAuthors(authorsData.data)
  }

  useEffect(() => {
    getData();
  }, [books, authors])
 /* eslint-disable */
  return (
    <>
    <MyModal books={books} authors={authors}/>
    <Container className="w-75">
      <div className="d-flex mt-5 justify-content-between">
        <h1 className="ms-2">Книги</h1>
        <Button onClick={() => dispatch(openWindow({typeOfForm: "addBookForm"}))} className="btn btn-lg ">Добавить книгу в коллекцию</Button>
      </div>
      <Row className="mt-5">
        <Col md={1}>
          <h4>№</h4>
          {books.map((book) => <Row key={book.id} className="mt-3 ms-1">{book.id}</Row>)}
        </Col>
        <Col md={2}>
          <h4>АВТОР</h4>
          {books.map((book) => <Row onClick={() => dispatch(openWindow({typeOfForm: 'BioModal', authorStrId: book.authorStrId}))} key={book.id} className="mt-3"><a>{authors.find((author) => author.authorStrId === book.authorStrId).author}</a></Row>)}
        </Col>
        <Col md={7}>
          <h4>НАЗВАНИЕ</h4>
          {books.map((book) => <Row key={book.id} className="mt-3">{book.title}</Row>)}
        </Col>
        <Col className="mt-3">
          {books.map((book) => <Row onClick={() => dispatch(openWindow({typeOfForm: 'redactBookForm', authorStrId: book.authorStrId}))} key={book.id} className="mt-3"><a>Редактировать</a></Row>)}
        </Col>
      </Row>
    </Container>
    </>
  );
}



export default App;
