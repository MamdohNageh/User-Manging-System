import { Component } from "react";
import { connect } from "react-redux";
import {getUsers} from "../actions/index";
import {bindActionCreators} from 'redux'
import {useState, useEffect} from 'react'

const Filter = (props) => {
    const [userName, setUserName] = useState("");  
    useEffect(() => {
      props.getUsers(userName);
    }, [userName]);
    return (
      <div className='col-12'>
        <div className='form-group '>
          <h2 className="text-center">Filter Users By Name</h2>
          <input
            type='text'
            //ref={brandRef}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder='Filter By Name'
            className='form-control rounded-pill mx-auto text-center m-4 w-50'
          />
        </div>
      </div>
    );
  };
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getUsers }, dispatch);
  };
  
  export default connect(null, mapDispatchToProps)(Filter);