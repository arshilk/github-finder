import React from "react";

export default class Search extends React.Component {
  state = {
    text: "",
  };

  onchange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.text === "") {
      this.props.alert("Please Enter Something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({
        text: "",
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            value={this.state.text}
            onChange={this.onchange}
            name="text"
            placeholder="Search Users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.show && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}
