import React from 'react'
import AddNote from './AddNote';
import Notes from './Notes';


const Home = (props) => {
	return (
		<>
			<div className="container row personalised-scrollbar" style={{ height: '72vh' }}>
				<div className="add-note col-lg-6 col-sm-12 my-2">
					<h3>Add a Note</h3>
					<AddNote showAlert={props.showAlert} />
				</div>

				<div className="display-notes col-lg-6 col-sm-12 my-2" style={{ height: '100%' }}>
					<h3>Your Notes</h3>
					<Notes showAlert={props.showAlert} />
				</div>
			</div>
		</>
	)
}

export default Home