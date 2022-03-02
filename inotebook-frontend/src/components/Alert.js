import React from 'react'

function Alert(props) {
	return (
		<>

			{props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show d-flex align-items-center rounded-0`} role="alert">
				<strong>{props.alert.type === 'danger' ? 'Error' : props.alert.type.charAt(0).toUpperCase() + props.alert.type.slice(1)}:&nbsp;</strong>{props.alert.message}
			</div>}
		</>
	)
}

export default Alert