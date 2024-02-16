import { FormEvent, FunctionComponent, useRef } from "react";
import Input from "../Input/Input";

import './SettingsForm.less';
import { useAppDispatch } from "../../store";
import { AxisSettings, setXAxis, setYAxix } from "../../model/chartReducer";

interface SettingsFormProps {
  type: 'xAxis' | 'yAxis';
  className: string;
}

const SettingsForm: FunctionComponent<SettingsFormProps> = ({ type, className }) => {
  const dispatch = useAppDispatch();

  const formRef = useRef<HTMLFormElement>(null);

  const setSettings = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const formDataObject: AxisSettings = {
      min: undefined,
      max: undefined,
      tick: undefined,
    };

    formData.forEach((value, key) => {
      const data = value as string;
      const formattedDelimiterData: string = data.replace(',', '.');

      let numberedData;

      if (formattedDelimiterData === '') {
        formDataObject[key] = undefined;
      } else {
        numberedData = Number(formattedDelimiterData);
        formDataObject[key] = isNaN(numberedData) ? undefined : numberedData;
      }
    });

    console.log(formDataObject);

    if (type === 'xAxis') {
      dispatch(setXAxis(formDataObject));
    } else {
      dispatch(setYAxix(formDataObject));
    }
  };

  return (
    <div className={`settings__form ${className}`}>
      <form ref={formRef} onSubmit={setSettings}>
        <Input name="min" />
        <Input name="max" />
        <Input name="tick" />

        <button className='settings__button'>Применить настройки</button>
      </form>
    </div>
  )
}

export default SettingsForm
