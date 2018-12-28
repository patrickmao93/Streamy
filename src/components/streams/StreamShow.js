import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  renderContent = () => {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <React.Fragment>
        <h2>{title}</h2>
        <h5>{description}</h5>
      </React.Fragment>
    );
  };

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    return <div className="">{this.renderContent()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
