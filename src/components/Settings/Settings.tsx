import React, { FormEvent, FunctionComponent, useRef } from 'react';
// import { AxisInterface } from '../Chart/Chart';
import Input from '../Input/Input';

import './Settings.less';

interface SettingsProps {
  setYAxis: React.Dispatch<React.SetStateAction<Highcharts.YAxisOptions>>;
  top: number;
  left: number;
}

const Settings: FunctionComponent<SettingsProps> = ({ setYAxis, top, left }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const setSettings = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const formDataObject: { [key: string]: number | null } = {};
    formData.forEach((value, key) => {
      const data = value as string;
      const formattedDelimiterData: string = data.replace(',', '.');

      let numberedData;

      if (formattedDelimiterData === '') {
        formDataObject[key] = null;
      } else {
        numberedData = Number(formattedDelimiterData);
        formDataObject[key] = isNaN(numberedData) ? null : numberedData;
      }
    });

    console.log(formDataObject);

    setYAxis(formDataObject as Highcharts.YAxisOptions);
  };

  return (
    <div className="settings" style={{ position: 'absolute', top, left }}>
      <form ref={formRef} onSubmit={setSettings}>
        <Input name="min" />
        <Input name="max" />
        <Input name="tickInterval" />

        <button className='settings__button'>Применить настройки</button>
      </form>
    </div>
  );
};

export default Settings;
