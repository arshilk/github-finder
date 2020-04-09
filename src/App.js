import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/Users/Users";
import axios from "axios";
import "./App.css";
import Search from "./components/Users/Search";
import User from "./components/Users/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/about";
class App extends React.Component {
	state = {
		users: [],
		loading: false,
		alert: null,
		user: {},
		repos: [],
	};
	async componentDidMount() {
		this.setState({
			loading: true,
		});
		const res = await axios.get(
			"https://api.github.com/users?client_id=${4619ef98d1b371fd63b3}&client_secret=${922fa52e0bdbb7fdb0bd123c1971d923237308b0}"
		);
		this.setState({
			users: res.data,
			loading: false,
		});
	}
	searchUsers = async (text) => {
		this.setState({
			loading: true,
		});
		const res = await axios.get(
			"https://api.github.com/search/users?q=" +
				text +
				"&client_id=4619ef98d1b371fd63b3&client_secret=922fa52e0bdbb7fdb0bd123c1971d923237308b0"
		);
		this.setState({
			users: res.data.items,
			loading: false,
		});
	};
	getUser = async (username) => {
		this.setState({
			loading: true,
		});
		const res = await axios.get(
			"https://api.github.com/users/" +
				username +
				"?client_id=4619ef98d1b371fd63b3&client_secret=922fa52e0bdbb7fdb0bd123c1971d923237308b0"
		);
		this.setState({
			user: res.data,
			loading: false,
		});
	};

	getUserRepos = async (username) => {
		this.setState({
			loading: true,
		});
		const res = await axios.get(
			"https://api.github.com/users/" +
				username +
				"/repos?per_page=5&sort=created:asc&client_id=4619ef98d1b371fd63b3&client_secret=922fa52e0bdbb7fdb0bd123c1971d923237308b0"
		);
		this.setState({
			repos: res.data,
			loading: false,
		});
	};

	clearUsers = () => {
		this.setState({
			users: [],
			loading: false,
		});
	};
	alert = (msg, style) => {
		this.setState({
			alert: {
				msg,
				style,
			},
		});
		setTimeout(
			() =>
				this.setState({
					alert: null,
				}),
			5000
		);
	};
	render() {
		return (
			<Router>
				{" "}
				<div className="App">
					{" "}
					<Navbar /> <Alert alert={this.state.alert} />{" "}
					<Switch>
						{" "}
						<Route
							exact
							path="/"
							render={(props) => (
								<Fragment>
									{" "}
									<Search
										alert={this.alert}
										clearUsers={this.clearUsers}
										show={
											this.state.users.length > 0
												? true
												: false
										}
										searchUsers={this.searchUsers}
									/>{" "}
									<Users
										loading={this.state.loading}
										users={this.state.users}
									/>{" "}
								</Fragment>
							)}
						/>{" "}
					</Switch>{" "}
					<Route exact path="/about" component={About} />{" "}
					<Route
						exact
						path="/user/:login"
						render={(props) => (
							<User
								{...props}
								getUser={this.getUser}
								getUserRepos={this.getUserRepos}
								loading={this.state.loading}
								user={this.state.user}
								repos={this.state.repos}
							/>
						)}
					/>{" "}
				</div>{" "}
			</Router>
		);
	}
}
export default App;
