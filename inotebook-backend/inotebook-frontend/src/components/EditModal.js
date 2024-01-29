import React, {useState} from 'react'

function EditModal(props) {
	const [note, setNote] = useState({title: "", description: "", tag: ""})

	const onChange = (e) => {
		setNote({...note, [e.target.name]: e.target.value});
	}

	return (
		<>
			<div className="modal fade" id="exampleModalEd" tabIndex="-1" aria-labelledby="exampleModalLabelEd" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabelEd">Edit Note</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							Edit "{props.title}"
						</div>

						<form className='container'>
							<div className="mb-3">
								<label htmlFor="title" className="form-label">Title</label>
								<input type="text" value={props.title} className="form-control" id="title" name='title' onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="description" className="form-label" >Description</label>
								<input type="text" value={props.description} className="form-control" id="description" name='description' onChange={onChange} />
							</div>
							<div className="mb-3">
								<label htmlFor="tag" className="form-label">Tag</label>
								<input type="text" value={props.tag} className="form-control" id="tag" name='tag' onChange={onChange} />
							</div>
							<button type="submit" className="btn btn-primary btn-sm" /*onClick={handleSaveClick}*/>Save</button>
						</form>

						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { props.deleteNote(props._id) }}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default EditModal