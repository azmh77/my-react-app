import "./Button.css";

const Button = ({ children, type, anotherClass, onClick }) => {
  return (
    <>
      <button
        type={type}
        className={`Button ${anotherClass}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
