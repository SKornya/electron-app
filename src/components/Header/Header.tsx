import { FunctionComponent, useRef, useState } from 'react';

import ConnectSettings from '../ConnectSettings/ConnectSettings';
// @ts-expect-error unknown import error
import settingsIcon from '../../assets/icons/settings_icon.svg';

import './Header.less';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { resetData, setData, setTime } from '../../model/dataReducer';
import { setPaused, setRunning, setStopped } from '../../model/appReducer';

const Header: FunctionComponent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const dispatch = useAppDispatch();
  const appState = useSelector((state: RootState) => state.app.state);

  const settingsButtonRef = useRef<HTMLImageElement>(null);

  const addPoint = () => {
    const date = new Date();
    dispatch(setData(Math.ceil(Math.random() * 10)));
    dispatch(setTime(date));
  };

  const startDraw = () => {
    dispatch(setRunning());
    const id = setInterval(addPoint, 1000);
    setIntervalId(id);
  };

  const pauseDraw = () => {
    dispatch(setPaused());
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const stopDraw = () => {
    dispatch(setStopped());
    if (intervalId) {
      clearInterval(intervalId);
    }
    dispatch(resetData());
  };

  const showModalWindow = () => {
    if (settingsButtonRef.current) {
      settingsButtonRef.current.style.transform = 'rotate(90deg)';
    }
    setShowModal(true);
  };

  const closeModal = () => {
    if (settingsButtonRef.current) {
      settingsButtonRef.current.style.transform = 'rotate(0)';
    }
    setShowModal(false);
  }

  return (
    <>
      {showModal && <ConnectSettings closeModal={closeModal} />}
      <div className="header">
        <div className="header__buttons">
          <button onClick={startDraw} className="header__buttons-start" disabled={appState === 'running'}>
            Start
          </button>
          <button onClick={pauseDraw} className="header__buttons-pause" disabled={appState !== 'running'}>
            Pause
          </button>
          <button onClick={stopDraw} className="header__buttons-stop" disabled={appState === 'stopped'}>
            Stop
          </button>
        </div>

        <div className="header__settings" onClick={showModalWindow}>
          <img ref={settingsButtonRef} src={settingsIcon} alt="settings-logo" className="header__settings-logo" />
        </div>
      </div>
    </>
  );
};

export default Header;
