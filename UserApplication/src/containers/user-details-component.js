import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserByID, clearData, deleteById, editUserByID } from "../actions";
import { Modal, Button } from "react-bootstrap";

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenn: false,
      userName: "",
      city: "",
      email: "",
      profilePicture: "",
    };
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  openModall = () => this.setState({ isOpenn: true });
  closeModall = () => this.setState({ isOpenn: false });

  renderUserDetails({ user }) {
    console.log("dksdjfkjsdfj", user);
    if (user) {
      if (user.id == 0) {
        return <div className="alert alert-danger">No User With This ID</div>;
      } else {
        return (
          <div className="alert alert-heading detailsCard" key={user.id}>
            <h2 className="text-center mb-3 mt-2">Profile</h2>
            <img
              style={{ height: "200px", width: "200px", borderRadius: "20%" }}
              className="mb-3 mx-auto img-fluid"
              src={`http://127.0.0.1:3002/${user.profilePicture}`}
            />
            <h4 className="my-3 text-left" style={{ marginLeft: "25%" }}>
              Full Name : {user.userName}
            </h4>
            <h4 className="my-3 text-left" style={{ marginLeft: "25%" }}>
              Email : {user.email}
            </h4>
            <h4 className="mt-3 mb-5 text-left" style={{ marginLeft: "25%" }}>
              City : {user.city}
            </h4>
            <input
              type="button"
              className="btn btn-primary mx-5"
              value="Edit Account"
              onClick={() => {
                this.openModall();
              }}
            />
            <input
              type="button"
              className="btn btn-primary mx-5"
              value="Delete Account"
              onClick={this.openModal}
            />
          </div>
        );
      }
    }
    return <div className="alert alert-danger">User Not Found</div>;
  }

  renderEdit({ user }) {
    console.log("dksdjfkjsdfj", user);
    if (user) {
      if (user.id == 0) {
        return <div className="alert alert-danger">No User With This ID</div>;
      } else {
        return (
          <div className="container">
            <div className="col-md-12 text-center">
              <Modal
                show={this.state.isOpenn}
                onHide={this.closeModall}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>My WebSite</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Update Profile Data</p>
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Enter User Name"
                        className="form-control rounded-pill mx-auto text-center m-5 w-50"
                        value={`${this.state.userName}` || ``}
                        onChange={(e) => {
                          this.setState({ userName: e.target.value });
                        }}
                      />
                      {(this.state.userName === "" ||
                        this.state.userName.length < 5) && (
                        <p className="text-center text-danger">
                          *User Name is Not Valid
                        </p>
                      )}
                      <input
                        type="text"
                        placeholder="Enter User City"
                        className="form-control rounded-pill mx-auto text-center m-5 w-50"
                        value={`${this.state.city}` || ``}
                        onChange={(e) => {
                          this.setState({ city: e.target.value });
                        }}
                      />
                      {(this.state.city === "" ||
                        this.state.city.length < 3) && (
                        <p className="text-center text-danger">
                          *City is not specified or charchters less than three
                        </p>
                      )}
                      <input
                        type="email"
                        placeholder="Enter User Email"
                        className="form-control rounded-pill mx-auto text-center m-5 w-50"
                        value={`${this.state.email}` || ``}
                        onChange={(e) => {
                          this.setState({ email: e.target.value });
                        }}
                      />
                      {this.state.email === "" &&
                        !this.state.email.match(
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                        ) && (
                          <p className="text-center text-danger">
                            *Email is Not Valid
                          </p>
                        )}
                      <input
                        type="file"
                        placeholder="Uplaod Photo"
                        className="form-control rounded-pill mx-auto text-center m-5 w-50"
                        onChange={async (e) => {
                          await this.setState({
                            newProfilePicture: e.target.files[0],
                          });
                          console.log(this.state.newProfilePicture);
                        }}
                      />
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.closeModall}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={async () => {
                      if (
                        this.state.userName !== "" &&
                        this.state.email !== "" &&
                        this.state.city != ""
                      ) {
                        if (
                          this.state.email.match(
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                          )
                        ) {
                          if (this.state.newProfilePicture) {
                            await this.setState({
                              profilePicture: this.state.newProfilePicture,
                            });
                          }
                          const user = new FormData();
                          user.append("userName", this.state.userName);
                          user.append("email", this.state.email);
                          user.append(
                            "profilePicture",
                            this.state.profilePicture
                          );
                          user.append("city", this.state.city);
                          await this.props.editUserByID(
                            this.props.user.id,
                            user
                          );
                          location.assign(`/users/${this.props.user.id}`);
                        } else {
                          alert("Please enter a valid email address");
                        }
                      } else {
                        await alert("You are missing some informations!");
                      }
                    }}
                  >
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        );
      }
    }
    return <div className="alert alert-danger">User Not Found</div>;
  }

  render() {
    console.log("3--", this.props);
    return (
      <div>
        <div className="col-md-12 text-center text-light userDetails">
          {this.renderUserDetails(this.props)}
          {this.renderEdit(this.props)}
          <Modal
            show={this.state.isOpen}
            onHide={this.closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>My WebSite</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do You Really Want To delete Your Account?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeModal}>
                No
              </Button>
              <Button
                variant="primary"
                onClick={async () => {
                  await this.props.deleteById(this.props.match.params.id);
                  this.closeModal();
                  this.props.history.push("/");
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    // debugger;
    await this.props.getUserByID(this.props.match.params.id);
    if (this.props.user) {
      this.setState({
        userName: this.props.user.userName,
        city: this.props.user.city,
        email: this.props.user.email,
        profilePicture: this.props.user.profilePicture,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearData();
  }
}

export default connect(
  (state) => {
    return {
      user: state.users.userDetails,
    };
  },
  (dispatch) => {
    return bindActionCreators(
      { getUserByID, clearData, deleteById, editUserByID },
      dispatch
    );
  }
)(UserDetails);
