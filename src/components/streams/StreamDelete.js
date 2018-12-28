import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  renderContent = () => {
    if (!this.props.stream) {
      return "Loading...";
    }
    return (
      "Are you sure you want to delete this stream? " + this.props.stream.title
    );
  };

  renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={this.onClickDelete} className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  onClickDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
    history.push("/");
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return (
      <Modal
        header="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.streams);
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
