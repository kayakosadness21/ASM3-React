import classes from "./Description.module.css";

function Description(props) {
  let content = "";

  if (props.desc) {
    content = props.desc.split("\n").map((e) => (
      <p key={Math.random()} className={classes["long-desc"]}>
        {e}
      </p>
    ));
  }

  return (
    <div className={`${classes.desc} mt-5`}>
      <h6>Description</h6>
      <h6>product description</h6>
      {content}
    </div>
  );
}

export default Description;
