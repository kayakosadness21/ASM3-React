import { useState } from "react";
import classes from "./ChatPopup.module.css";

// truy cập file svg  folder public trong reactjs 
import { ReactComponent as ReactLogo } from './resources/message.svg';
import { ReactComponent as MessageLogo } from './resources/messageIcon.svg';
import { ReactComponent as MessLogo } from './resources/message1.svg';
import { ReactComponent as MesageLogo } from './resources/message2.svg';

function Popup() {
  // Khai báo state cho popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // khai báo một state cho list message, giá trị mặc định là []
  const [listChatMessage, setListChatMessage] = useState([]);
  // Hàm xử lý khi người dùng click vào nút popup
  const handleOpenPopup = () => {
    setPopupOpen(popupOpen ? false : true);
  };

  // hàm nhan tham so la noi nddung mesage xử lý khi onclick vào button.  -> setstate lift mesage 
  // khai bao newlistmessage = listmessage để đặt tham số message vào
  // Push message, trong ô chat dùng  ['hi','hello'].map () để in ra

  const onSendMessage = () => {
    //kiem tra co input chua
    if (inputValue.length > 0) {
      setListChatMessage((prevState) => ([...prevState, inputValue]));
      setInputValue('');
    }
    else {
      alert('Vui long nhap gia tri');
    }
  }
  const handleChange = function (e) {
    var value = e.target.value;
    setInputValue(value);
  }
  console.log('listMessage', listChatMessage);
  console.log('inputValue', inputValue);

  return (
    <div>
      <button onClick={handleOpenPopup} className={classes["-button"]}>
        <MessageLogo />
      </button>
      {popupOpen ? (
        <div
          className={`bg-white rounded-4 shadow-lg ${classes["-popup"]} d-flex flex-column overflow-hidden`}
        >
          <div className="d-flex justify-content-between align-center border-bottom px-3 pt-3">
            <p className="text-dark fw-bold fs-6">Customer Support</p>
            <button className="border-0"> Let's  App</button>
          </div>
          {/* <div className="p-3 text-dark flex-fill">Message</div> */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', width: '100%', overflow: 'auto' }}>
            {listChatMessage.length && listChatMessage.map((chatMessage, index) => {
              return (
                <div key={index.toString()} className="text-dark fw-bold fs-6" style={{ width: '100%', display: 'flex', backgroundColor: 'red', marginBottom: 10 }}>{chatMessage}</div>
              )
            })}
          </div>
          <div className="bg-light px-3 border-top d-flex justify-content-between align-items-center py-1">
            <img src="./Resource/admin-icon.png" alt=""></img>
            <input type="text" placeholder="Enter Message!" value={inputValue} onChange={handleChange} />
            <ReactLogo />
            <MessLogo />
            <div onClick={onSendMessage}>
              <MesageLogo />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Popup;
