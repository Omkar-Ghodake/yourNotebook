import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function Noteitem(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;

	return (
		<>
			<div className="card my-1">
				<div className="card-header">
					{props.tag}
				</div>
				<div className="card-body">
					<h5 className="card-title">{props.title}</h5>
					<p className="card-text">{props.description}</p>
					<i data-bs-toggle="modal" data-bs-target="#exampleModalDel" className="fa-solid fa-trash mr-1" onClick={() => {
						deleteNote(props._id);
						props.showAlert('Note deleted.', 'warning');
					}} ></i>
					<i className="fa-solid fa-pen-to-square mr-1" onClick={() => { props.updateNote(props.note) }}></i>
				</div>
				<div className="card-footer text-muted">
					{props.date}
				</div>
			</div>
		</>
	)
}

export default Noteitem