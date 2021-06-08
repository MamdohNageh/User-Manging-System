import { Component } from "react";
import { connect } from "react-redux";
import User from "../components/user-component";
class Users extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-12 text-center">
          <h2 className="text-center mb-3">Users List</h2>
          {this.renderUsers(this.props)}
        </div>
      </div>
    );
  }

  renderUsers({ RecivedUsers }) {
    if (RecivedUsers) {
      return RecivedUsers.map((user) => {
        return (
          <User key={user.id} UserInfo={user} history={this.props.history} />
        );
      });
    } else {
      return <div className="alert alert-danger">No User Found</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    RecivedUsers: state.users.usersList,
  };
};

export default connect(mapStateToProps)(Users);
