import React from 'react'
import {Link} from 'react-router-dom'
function UserItem({user:{login,avatar_url,html_url}}) {

	// const {login,avatar_url,html_url} = props.user
	return (
			<div className="card text-center">
				<img className='round-img' src={avatar_url}   style={{ width: '60px' }} alt="" />
				      <h3>{login}</h3>
				<Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>More</Link>
			</div>
	)
}


export default UserItem