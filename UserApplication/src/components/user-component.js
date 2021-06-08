const User = ({ UserInfo, history }) => {
  console.log(history);
  if (UserInfo) {
    return (
      <div className="myCard row d-inline-flex">
        <div className="col-3">
          <div className="mx-3 my-3 card bg-warning" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={`http://localhost:3002/${UserInfo.profilePicture}`}
              alt="Card image cap"
              style={{width:"286px", height:"286px"}}
            />
            <div className="card-body">
              <h4 className="card-title">{UserInfo.userName}</h4>
              <a
                className="btn btn-primary"
                onClick={() => {
                  history.push(`/users/${UserInfo.id}`);
                }}
              >
                Visit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default User;
