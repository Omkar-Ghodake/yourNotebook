import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
	const context = useContext(noteContext);
	const { addNote } = context;

	const [note, setNote] = useState({title: "", description: "", tag: ""})

	const handleSaveClick = (e) => {
		e.preventDefault();
		if(note.tag === '') {note.tag = 'General'}
		if(note.title === '') {note.title = 'Untitled'}
		if(note.description === '') {note.description = 'No Description'}
		addNote(note.title, note.description, note.tag);

		setNote({title: "", description: "", tag: ""});

		props.showAlert('Note Added.', 'info');
	}

	const onChange = (e) => {
		setNote({...note, [e.target.name]: e.target.value});
	}

	return (
		<>
			<form>
				<div className="mb-3">
					<label htmlFor="title" className="form-label">Title</label>
					<input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label" >Description</label>
					<input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="tag" className="form-label">Tag</label>
					<input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
				</div>
				<button disabled={(note.title.length < 1 || note.title.replaceAll(/\s/g,'') === '') && (note.description.length < 1 || note.description.replaceAll(/\s/g,'') === '')} type="submit" className="btn btn-primary btn-sm" onClick={handleSaveClick}>Save</button>
			</form>
		</>
	)
}

export default AddNote