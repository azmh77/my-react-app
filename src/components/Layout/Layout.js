import Wrapper from "../../hoc/Wrapper";

const Layout = (props) => {
  return (
    <Wrapper>
      <div className="d-flex">{props.children}</div>
    </Wrapper>
  );
};

export default Layout;
