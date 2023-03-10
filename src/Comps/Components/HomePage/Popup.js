import { CloseButton } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { popupActions } from "../../../store/index";
import { convertNumberToString } from "../../Hooks/utils";
import DarkButton from "../../UI/DarkButton";
import classes from "./Popup.module.css";

function Popup(props) {
  const dispatch = useDispatch();
  let data = {};

  if (props.show) {
    data = props.data;
  }

  function closePopup() {
    dispatch(popupActions.hide());
  }

  return (
    <div>
      <Modal
        {...props}
        centered
        size="xl"
        scrollable={false}
        className={classes.popup}
      >
        <Modal.Body className="row">
          <img src={data.img1} alt="" className="img-fluid w-50 col-lg-6"></img>
          <div className="p-5 w-lg-50 col-lg-6">
            <CloseButton
              className="position-absolute top-0 end-0 mt-4 me-5"
              onClick={closePopup}
            />
            <h4>{data.name}</h4>
            <p>{data.price ? convertNumberToString(data.price) : ""} VND</p>
            <p>{data.short_desc}</p>
            <DarkButton to={`${props.show ? `/detail/${data._id.$oid}` : "#"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#fcfcfc"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path d="M223.9,65.4l-12.2,66.9A24,24,0,0,1,188.1,152H72.1l4.4,24H184a24,24,0,1,1-24,24,23.6,23.6,0,0,1,1.4-8H102.6a23.6,23.6,0,0,1,1.4,8,24,24,0,1,1-42.2-15.6L34.1,32H16a8,8,0,0,1,0-16H34.1A16,16,0,0,1,49.8,29.1L54.7,56H216a7.9,7.9,0,0,1,6.1,2.9A7.7,7.7,0,0,1,223.9,65.4Z"></path>
              </svg>
              View Detail
            </DarkButton>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Popup;
