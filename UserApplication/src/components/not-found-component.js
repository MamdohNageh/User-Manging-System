const NotFound = () => {
  return (
    <div className="container-fluid mt-0">
      <div className="row">
        <div className="bg-secondary p-5 rounded col-12 m-auto card-img"
          style={{
            height: "872px",
            backgroundImage: "url(./error.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
