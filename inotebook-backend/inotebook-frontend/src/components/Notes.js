import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;

	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')){
			getNotes();
		}
		else {
			navigate('/login');
		}
	}, [])

	const ref = useRef(null);
	const refClose = useRef(null);
	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
	}
	
	
	const handleUpdateClick = (e) => {
		e.preventDefault();
		if (note.etag === '') { note.etag = 'General' }
		if (note.etitle === '') { note.etitle = 'Untitled' }
		if (note.edescription === '') { note.edescription = 'No Description' }
		editNote(note.id, note.etitle, note.edescription, note.etag)
		refClose.current.click();
		props.showAlert('Note Updated.', 'info');
	}

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	}



	return (
		<>
			<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch modal
			</button>

			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">Title</label>
									<input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">Description</label>
									<input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
								</div>
								<div className="mb-3">
									<label htmlFor="tag" className="form-label">Tag</label>
									<input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button disabled={(note.etitle.length < 1 || note.etitle.replaceAll(/\s/g,'') === '') && (note.edescription.length < 1 || note.edescription.replaceAll(/\s/g,'') === '')} type="button" className="btn btn-primary" onClick={handleUpdateClick}>Update Note</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row" style={{ height: '100%', overflow: 'auto' }}>
				<div className="container">
					{(notes.length === 0) && 'No notes to display.'}
				</div>
				{notes.map((element) => {
					return <div className="col-lg-4 col-md-6" key={element._id}>
						<Noteitem showAlert={props.showAlert} title={element.title} description={element.description} tag={element.tag} date={element.date} _id={element._id} updateNote={updateNote} note={element} />
					</div>
				})}
			</div>
		</>

	)
}

export default Notes