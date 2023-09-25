import React, { useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { closeWindow } from "../slices/modal";
import { useFormik } from "formik";
import axios from "axios";

const AddBookForm = ({ books, authors, closeModal }) => {
	const inputRef = useRef(null);
	const formik = useFormik({
		initialValues: {
			author: '',
			bio: '',
			title: ''
		},
		onSubmit: async (values) => {
			try {
				await axios.post('/api/books', {author: values.author, title: values.title, bio: values.bio});
				closeModal();
			} catch(e) {
				alert(e);
			}
		},
	})

	useEffect(() => {
		inputRef.current.focus();
	})


	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Добавить автора</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group className="m-2 position-relative form-floating">
						<Form.Control
							ref={inputRef}
							placeholder="Имя автора"
							id="author"
							type="text"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="author"
							value={formik.values.author}
						/>
						<label htmlFor="author">Имя автора</label>
					</Form.Group>
					<Form.Group className="m-2 position-relative form-floating">
						<Form.Control
							placeholder="Название"
							id="title"
							type="text"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="title"
							value={formik.values.title}
						/>
						<label htmlFor="title">Название</label>
					</Form.Group>
					<Form.Group className="m-2 position-relative form-floating">
						<Form.Control
							as="textarea"
							placeholder="Описание"
							id="bio"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="bio"
							value={formik.values.bio}
						/>
						<label htmlFor="bio">Описание</label>
					</Form.Group>
					<div className="d-flex justify-content-end mt-3">
						<Button disabled={formik.isSubmitting} type="submit">Добавить</Button>
						<Button className="mx-2" onClick={closeModal}>Закрыть</Button>
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}

const RedactBookForm = ({ books, authors, closeModal }) => {
	const authorStrId = useSelector((state) => state.modalData.authorStrId);
	const bio = authors.find((author) => author.authorStrId === authorStrId).bio;
	const author = authors.find((author) => author.authorStrId === authorStrId).author;
	const title = books.find((book) => book.authorStrId === authorStrId).title;
	const inputRefAuthor = useRef(null);
	const inputRefTitle = useRef(null);
	const inputRefBio = useRef(null);
	
	const formik = useFormik({
		initialValues: {
			author: author,
			bio: bio,
			title: title
		},
		onSubmit: async (values) => {
			try {
				await axios.post('/api/books/redact', {author: values.author, title: values.title, bio: values.bio, authorStrId});
				closeModal();
			} catch(e) {
				alert(e);
			}
		},
	})

	useEffect(() => {
		setTimeout(() => {
			inputRefAuthor.current.focus();
			inputRefAuthor.current.select();
		}, 0)
	}, [])

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>Редактировать</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Group className="m-2 position-relative form-floating">
						<Form.Control
							ref={inputRefAuthor}
							placeholder="Имя автора"
							id="author"
							type="text"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="author"
							value={formik.values.author}
						/>
						<label htmlFor="author">Имя автора</label>
					</Form.Group>
					<Form.Group className="m-2 position-relative form-floating">
						<Form.Control
							ref={inputRefTitle}
							placeholder="Название"
							id="title"
							type="text"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="title"
							value={formik.values.title}
						/>
						<label htmlFor="title">Название</label>
					</Form.Group>
					<Form.Group className="m-2 position-relative form-floating">
						<Form.Control
							ref={inputRefBio}
							as="textarea"
							placeholder="Описание"
							id="bio"
							disabled={formik.isSubmitting}
							required
							onChange={formik.handleChange}
							name="bio"
							value={formik.values.bio}
						/>
						<label htmlFor="bio">Описание</label>
					</Form.Group>
					<div className="d-flex justify-content-end mt-3">
						<Button disabled={formik.isSubmitting} type="submit">Редактировать</Button>
						<Button className="mx-2" onClick={closeModal}>Закрыть</Button>
					</div>
				</Form>
			</Modal.Body>
		</>
	)
}

const BioModal = ({ books, authors, closeModal }) => {
	const authorStrId = useSelector((state) => state.modalData.authorStrId);
	const bio = authors.find((author) => author.authorStrId === authorStrId).bio;
	return (
		<>
			<Modal.Body>{bio}</Modal.Body>
			<Modal.Footer>
			<Button onClick={closeModal}>Close</Button>
			</Modal.Footer>
		</>
	)
}

const MyModal = ({ books, authors }) => {
	const mapping = {
		addBookForm: AddBookForm,
		redactBookForm: RedactBookForm,
		BioModal: BioModal,
	}

	const dispatch = useDispatch();
	
	const closeModal = () => {
		dispatch(closeWindow())
	};

	const isOpened = useSelector((state) => state.modalData.isOpen);
	const type = useSelector((state) => state.modalData.typeOfForm);

	const SelectModal = mapping[type];


	return (
		<Modal show={isOpened} onHide={closeModal} centered>
			{SelectModal ? <SelectModal books={books} authors={authors} closeModal={closeModal} /> : null}
		</Modal>
	)
}

export default MyModal;