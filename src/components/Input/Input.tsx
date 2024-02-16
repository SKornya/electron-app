import { ChangeEvent, FunctionComponent, useState } from 'react';

import inputsTranslation from '../../utils/plotSettingsTranslations';
import './Input.less';

interface InputProps {
  name: string;
}

const Input: FunctionComponent<InputProps> = ({ name }) => {
  const [initialValue, setInitialValue] = useState<string>('');
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInitialValue(event.target.value);
  }

  return (
    <div className="settings__inputs">
      <label htmlFor={name}>{inputsTranslation[name]}</label>

      <input type="text" name={name} value={initialValue} onChange={handleChange} id={name} autoComplete="false" />
    </div>
  );
};

export default Input;
