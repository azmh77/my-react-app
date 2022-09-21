import "./Spinners.css";

const Spinners = (props) => {
  return (
    <>
      <div className="backdrope"></div>
      <div className="spinner">
        <span className="loader"></span>
        <h6 className="loader-text">{props.title}</h6>
      </div>
    </>
  );
};

export default Spinners;
