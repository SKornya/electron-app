import React, { FunctionComponent, useRef, useState } from 'react';

import Settings from '../Settings/Settings';
import Chartjs from '../Chart/Chart';

import './ChartWrapper.less';

const ChartWrapper: FunctionComponent = () => {

  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const settingsRef = useRef<HTMLDivElement>(null);

  const coordsCalculate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): { x: number, y: number } => {
    const CONTAINER_WIDTH = 300;
    const CONTAINER_HEIGHT = 300;

    const spaceRight: number = window.innerWidth - event.clientX;
    const spaceBottom: number = window.innerHeight - event.clientY;

    const x = spaceRight < CONTAINER_WIDTH ? event.clientX - CONTAINER_WIDTH : event.clientX;
    const y = spaceBottom < CONTAINER_HEIGHT ? event.clientY - CONTAINER_HEIGHT : event.clientY;
  
    return { x, y };
  };

  const hideSettings = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (show) {
      setShow(false);
      
      const coords = coordsCalculate(event);
      const { x, y } = coords;
      setPosition({ x, y });
    }
  };

  const showSettings = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    const coords = coordsCalculate(event);
    const { x, y } = coords;
    setPosition({ x, y });
    
    setShow(!show);
  };

  return (
    <>
      {show && <Settings ref={settingsRef} top={position.y} left={position.x} />}

      <div className='chart'
        onClick={hideSettings}
        onContextMenu={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => showSettings(e)}
      >
        <Chartjs />
        </div>
    </>
  );
};

export default ChartWrapper;
