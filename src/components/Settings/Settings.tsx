  import { FunctionComponent, RefAttributes, forwardRef, useState } from 'react';

  import './Settings.less';
  import SettingsForm from '../SettingsForm/SettingsForm';

  interface SettingsProps {
    top: number;
    left: number;
  }

  const Settings: FunctionComponent<SettingsProps & RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, SettingsProps>(({ top, left }, ref) => {
    const [activeAxis, setActiveAxis] = useState<'first' | 'second'>('first');

    return (
      <div className="settings" style={{ position: 'absolute', top, left }} ref={ref}>
        <div className="settings__tabs">
          <button className={`settings__tabs-button ${activeAxis === 'first' ? 'active' : ''}`} onClick={() => setActiveAxis('first')}>
            Ось X
          </button>
          <button className={`settings__tabs-button ${activeAxis === 'second' ? 'active' : ''}`} onClick={() => setActiveAxis('second')}>
            Ось Y
          </button>
        </div>

      <div className='settings__tabs-content'>
        <SettingsForm type={'xAxis'} className={activeAxis === 'first' ? 'active' : ''} />
        <SettingsForm type={'yAxis'} className={activeAxis === 'second' ? 'active' : ''} />
      </div>

      </div>
    );
  });

  export default Settings;
