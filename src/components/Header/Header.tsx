import { FunctionComponent, useState } from "react";

import ConnectSettings from "../ConnectSettings/ConnectSettings";
// @ts-ignore
import settingsIcon from '../../assets/icons/settings_icon.svg';

import './Header.less';

const Header: FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  return (
    <>
      {showModal && <ConnectSettings closeModal={() => setShowModal(false)} />}
      <div className="header">
        <div className="header__settings" onClick={() => setShowModal(true)}>
          <img src={settingsIcon} alt="settings-logo" className="header__settings-logo" />
        </div>
      </div>
    </>
  );
};

export default Header;
