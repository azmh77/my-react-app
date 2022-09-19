import "./Input.css";

const Input = ({ type, anotherClass, placeholder, value, onChange, Ref }) => {
  return (
    <>
      <input
        type={type}
        className={`input ${anotherClass}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={Ref}
      />
    </>
  );
};

export default Input;
