import React from "react";
import UserItem from "./UserItem";
import spinner from "../layout/spinner";

function Users({ loading, users }) {
	if (loading) {
		return <spinner />;
	} else {
		return (
			<div style={userStyle}>
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		);
	}
}

const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gridGap: "1rem",
};

export default Users;
