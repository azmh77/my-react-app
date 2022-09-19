import "./Modal.css";
import Wrapper from "./../../../hoc/Wrapper";
import Backdrop from "./../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Wrapper>
      <Backdrop show={props.show} modalClose={props.modalClose} />
      <div
        className="Modale"
        style={{
          transform: props.show ? "scale(1)" : "scale(0.1)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Wrapper>
  );
};

export default Modal;
