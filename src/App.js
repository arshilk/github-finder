import React, { Fragment, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/Users/Users";
import axios from "axios";
import "./App.css";
import Search from "./components/Users/Search";
import User from "./components/Users/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/pages/about";

const App = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);

	const searchUsers = async (text) => {
		setLoading(true);
		const res = await axios.get(
			"https://api.github.com/search/users?q=" +
				text +
				"&client_id=4619ef98d1b371fd63b3&client_secret=922fa52e0bdbb7fdb0bd123c1971d923237308b0"
		);

		setUsers(res.data.items);
		setLoading(false);
	};
	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			"https://api.github.com/users/" +
				username +
				"?client_id=4619ef98d1b371fd63b3&client_secret=922fa52e0bdbb7fdb0bd123c1971d923237308b0"
		);

		setUser(res.data);
		setLoading(false);
	};

	const getUserRepos = async (username) => {
		setLoading(true);
		const res = await axios.get(
			"https://api.github.com/users/" +
				username +
				"/repos?per_page=5&sort=created:asc&client_id=4619ef98d1b371fd63b3&client_secret=922fa52e0bdbb7fdb0bd123c1971d923237308b0"
		);
		setRepos(res.data);
		setLoading(false);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const showalert = (msg, style) => {
		setAlert({ msg, style });
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<Router>
			{" "}
			<div className="App">
				{" "}
				<Navbar /> <Alert alert={alert} />{" "}
				<Switch>
					{" "}
					<Route
						exact
						path="/"
						render={(props) => (
							<Fragment>
								{" "}
								<Search
									alert={showalert}
									clearUsers={clearUsers}
									show={users.length > 0 ? true : false}
									searchUsers={searchUsers}
								/>{" "}
								<Users loading={loading} users={users} />{" "}
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
							getUser={getUser}
							getUserRepos={getUserRepos}
							loading={loading}
							user={user}
							repos={repos}
						/>
					)}
				/>{" "}
			</div>{" "}
		</Router>
	);
};
export default App;
