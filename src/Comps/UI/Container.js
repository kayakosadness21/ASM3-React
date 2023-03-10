import classUI from "./Container.module.css";

function Container(props) {
  return (
    <div className={`${classUI.container} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Container;
