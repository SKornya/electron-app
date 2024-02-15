import { FunctionComponent, useState } from 'react';

import Settings from '../Settings/Settings';
import Chartjs from '../Chart/Chart';

import './Chart.less';

const ChartWrapper: FunctionComponent = () => {

  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // const addPoint = () => {
  //   const date = new Date();
  //   dispatch(setData(Math.ceil(Math.random() * 10)));
  //   dispatch(setTime(date));
  // };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     addPoint();
  //   }, 500);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [data, categories]);

  const hideSettings = () => {
    setShow(false);
  };

  const showSettings = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShow(!show);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {show && <Settings setYAxis={console.log} top={position.y} left={position.x} />}

      <div className='chartjs'
        onClick={hideSettings}
        onContextMenu={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => showSettings(e)}
      >
        <Chartjs />
        </div>
    </>
  );
};

export default ChartWrapper;
