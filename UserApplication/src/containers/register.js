import { bindActionCreators } from "redux";
import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../actions/index";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBInput,
} from "mdbreact";
import React from "react";

const Register = (props) => {
  const [userName, setUserName] = useState("");
  const [city, setUserCity] = useState("");
  const [email, setUserEmail] = useState("");
  const [profilePicture, setUserProfile] = useState();
  return (
    <MDBContainer
      className="regcontainer container-fluid col-12 img-responsive"
      style={{ backgroundImage: "url('./bg.jpg')", height: "872px" }}
    >
      <MDBRow>
        <MDBCol className="mx-auto col-6">
          <MDBCard
            className="card-image regimg col-12"
            style={{
              backgroundImage: "url(./reg.jpg)",
              width: "55rem",
            }}
          >
            <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="text-center">
                <h3 className="white-text mb-5 mt-4 font-weight-bold">
                  <strong>SIGN</strong>
                  <a
                    href="/register"
                    className="text-decoration-none green-text font-weight-bold"
                  >
                    <strong> UP</strong>
                  </a>
                </h3>
              </div>
              <MDBInput
                label="User Name"
                group
                type="text"
                validate
                labelClass="white-text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              {(userName === "" || userName.length < 5) && (
                <p className="text-center text-danger">
                  *User Name is Not Valid
                </p>
              )}
              <MDBInput
                label="Email"
                group
                type="email"
                validate
                labelClass="white-text"
                value={email}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
              {email === "" &&
                !email.match(
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                ) && (
                  <p className="text-center text-danger">*Email is Not Valid</p>
                )}
              <MDBInput
                label="City"
                group
                type="text"
                validate
                labelClass="white-text"
                alert
                value={city}
                onChange={(e) => {
                  setUserCity(e.target.value);
                }}
              />
              {(city === "" || city.length < 3) && (
                <p className="text-center text-danger">
                  *City is not specified or charchters less than three
                </p>
              )}
              <MDBInput
                label="Profile Picture"
                group
                type="file"
                validate
                labelClass="white-text"
                onChange={(e) => {
                  setUserProfile(e.target.files[0]);
                }}
              />
              {profilePicture === undefined && (
                <p className="text-center text-danger">
                  *Profile Picture is required
                </p>
              )}
              <div className="md-form pb-3"></div>
              <MDBRow className="d-flex align-items-center mb-4">
                <div className="text-center mb-3 col-md-12">
                  <MDBBtn
                    color="success"
                    rounded
                    type="button"
                    className="btn-block z-depth-1 col-5 mx-auto"
                    onClick={async () => {
                      if (
                        userName !== "" &&
                        email !== "" &&
                        city !== "" &&
                        profilePicture != undefined
                      ) {
                        if (
                          email.match(
                            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                          )
                        ) {
                          const user = new FormData();
                          user.append("userName", userName);
                          user.append("email", email);
                          user.append("profilePicture", profilePicture);
                          user.append("city", city);
                          await props.register(user);
                          props.history.push("/");
                        } else {
                          alert("Please enter a valid email address");
                        }
                      } else {
                        alert("You are missing some informations!");
                      }
                    }}
                  >
                    Sign up
                  </MDBBtn>
                </div>
              </MDBRow>
              <MDBCol md="12">
                <p className="font-small white-text d-flex justify-content-end">
                  Have an account?
                  <a href="#!" className="green-text ml-1 font-weight-bold">
                    Log in
                  </a>
                </p>
              </MDBCol>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ register }, dispatch);
};

export default connect(null, mapDispatchToProps)(Register);
