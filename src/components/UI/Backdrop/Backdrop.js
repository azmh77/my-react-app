import "./Backdrop.css";

const Backdrop = (props) => {
  return props.show ? (
    <div className="backdrope" onClick={props.modalClose}></div>
  ) : null;
};

export default Backdrop;
