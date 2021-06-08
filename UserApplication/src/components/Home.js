import { Component } from "react";
import Filter from '../containers/filter-by-name';
import Users from '../containers/users-component';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid text-light" >
        <Filter />
        <br />
        <Users {...this.props}/>
      </div>
    );
  }
}

export default Home;