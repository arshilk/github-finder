import React, { Fragment } from "react";
import Spinner from "../layout/spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";

export default class User extends React.Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
		this.props.getUserRepos(this.props.match.params.login);
	}
	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			company,
			public_gists,
			hirable,
		} = this.props.user;

		const { loading } = this.props;

		if (loading) {
			return <Spinner />;
		} else {
			return (
				<Fragment>
					<Link to="/" className="btn btn-light my2">
						Back To Search
					</Link>
					Hireable:{" "}
					{hirable ? (
						<i className="fas fa-check text-success" />
					) : (
						<i className="fas fa-times text-danger" />
					)}
					<div className="card grid-2">
						<div className="all-center">
							<img
								src={avatar_url}
								className="round-img"
								alt=""
								style={{ width: "150px" }}
							/>
							<h1>{name}</h1>
							{location && <p>Location: {location}</p>}
						</div>
						<div>
							{bio && (
								<Fragment>
									<h3>Bio</h3>
									<p>{bio}</p>
								</Fragment>
							)}
							<a href={html_url} className="btn btn-dark my-1">
								Visit Github Profile
							</a>
							<ul>
								<li>
									{login && (
										<Fragment>
											<strong>Username: {login}</strong>
										</Fragment>
									)}
								</li>

								<li>
									{company && (
										<Fragment>
											<strong>Company: {company}</strong>
										</Fragment>
									)}
								</li>

								<li>
									{blog && (
										<Fragment>
											<strong>Blog: {blog}</strong>
										</Fragment>
									)}
								</li>
							</ul>
						</div>
					</div>
					<div className="card text-center">
						<div className="badge badge-primary">
							Followers: {followers}
						</div>
						<div className="badge badge-success">
							Following: {following}
						</div>
						<div className="badge badge-danger">
							Public Repos: {public_repos}
						</div>
						<div className="badge badge-light">
							Public Gists: {public_gists}
						</div>
					</div>
					<Repos repos={this.props.repos} />
				</Fragment>
			);
		}
	}
}
