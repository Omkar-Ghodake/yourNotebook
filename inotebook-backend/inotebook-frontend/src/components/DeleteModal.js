import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function DeleteModal(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	return (
		<>
			<div className="modal fade" id="exampleModalDel" tabIndex="-1" aria-labelledby="exampleModalLabelDel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabelDel">Delete Note</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							"{props.title}" will be deleted.
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {deleteNote(props._id)}}>Delete</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DeleteModal