import { FunctionComponent, useState } from "react";

import ConnectSettings from "../ConnectSettings/ConnectSettings";
// @ts-ignore
import settingsIcon from '../../assets/icons/settings_icon.svg';

import './Header.less';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header: FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const appState = useSelector((state: RootState) => state.app.state);

  const startDraw = () => {

  };

  const PauseDraw = () => {

  };

  const StopDraw = () => {

  };

  return (
    <>
      {showModal && <ConnectSettings closeModal={() => setShowModal(false)} />}
      <div className="header">
        <div className="header__buttons">
          <button className="header__buttons-start" disabled={appState === 'running'}>Start</button>
          <button className="header__buttons-pause" disabled={appState !== 'running'}>Pause</button>
          <button className="header__buttons-stop" disabled={appState === 'stopped'}>Stop</button>
        </div>
        
        <div className="header__settings" onClick={() => setShowModal(true)}>
          <img src={settingsIcon} alt="settings-logo" className="header__settings-logo" />
        </div>
      </div>
    </>
  );
};

export default Header;
