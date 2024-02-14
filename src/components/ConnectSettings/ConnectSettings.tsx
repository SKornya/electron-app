import { FunctionComponent } from "react";

import './ConnectSettings.less';

interface ConnectSettingsProps {
  closeModal: () => void;
}

const ConnectSettings: FunctionComponent<ConnectSettingsProps> = ({ closeModal }) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="connection" onClick={closeModal}>
      <div className="connection__content" onClick={handleModalClick}>
        <h2>Подключение прибора</h2>
        {/* <p>Содержимое модального окна...</p> */}
        <div className="connection__content-find"><button>Найти прибор</button></div>
        <div className="connection__content-selection">
          <select name="devices" id="devices">
            <option value="" disabled selected>Выберите прибор</option>
            <option value="1">1</option>
          </select>
        </div>
        <div className="connection__content-connect"><button>Подключение</button></div>

      </div>
    </div>
  )
};

export default ConnectSettings;
