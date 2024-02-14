import { FunctionComponent, useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../store';
import { setData, setTime } from '../../model/reducer';

import * as Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import exportingOption from 'highcharts/modules/exporting';
import offlineOption from 'highcharts/modules/offline-exporting';
import Boost from 'highcharts/modules/boost';
import HighchartsCustomEvents from 'highcharts-custom-events';

import options from '../../utils/commonPlotOptions';
import Settings from '../Settings/Settings';

import './Chart.less';

const Chart: FunctionComponent = () => {

  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.data);
  const categories = useSelector((state: RootState) => state.categories);

  // const [data, setData] = useState<Array<number>>([]);
  // const [categories, setCategories] = useState<Array<string>>([]);
  const [yAxis, setYAxis] = useState<Highcharts.YAxisOptions>({
    min: null,
    max: null,
    tickInterval: 1
  });

  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  exportingOption(Highcharts);
  offlineOption(Highcharts);
  Boost(Highcharts);
  HighchartsCustomEvents(Highcharts);

  const desiredTickCount = 10;

  const extendedOptions: Highcharts.Options = {
    ...options,

    xAxis: {
      categories: categories.map((date: Date) => {
        const hours = date.getHours();
        const mins = date.getMinutes();
        return `${hours}:${mins.toString().padStart(2, '0')}`;
      }),
      tickInterval: Math.ceil(categories.length / desiredTickCount),
      gridLineWidth: 1,
      gridLineColor: '#595959',
      title: {
        text: 'Time'
      },
      labels: {
        style: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      ...yAxis,
      title: {
        text: 'Watts'
      },
      gridLineColor: '#595959',
      labels: {
        style: {
          color: '#fff'
        }
      },
      grid: {}
    },
    chart: {
      ...options.chart,
      events: {
        // TODO: Разобраться с кастомными событиями (настройки на правую кнопку?)
        click: (event: MouseEvent) => {
          // console.log(event);
          event.preventDefault();

          // if (event.button === 2) {
            setShow(!show);
            setPosition({ x: event.clientX, y: event.clientY });
          // }

          // setShow(false);
        },
      },
    },
    series: [
      {
        type: 'spline',
        data,
        name: 'Power',
        marker: {
          enabled: false
        },
      },
    ],
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x}: {point.y}'
    },
    exporting: {
      chartOptions: {
        chart: {
          width: 1000,
          height: 500
        }
      },
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
        }
      }
    }
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const addPoint = () => {
    const date = new Date();
    dispatch(setData(Math.ceil(Math.random() * 10)));
    dispatch(setTime(date));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addPoint();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [data, categories]);

  // const hideSettings = () => {
  //   setShow(false);
  // };

  // const showSettings = (e: MouseEvent) => {
  //   setShow(!show);
  //   setPosition({ x: e.clientX, y: e.clientY });
  // };

  // useEffect(() => {
  //   window.addEventListener('contextmenu', showSettings);
  //   window.addEventListener('click', hideSettings, true);

  //   return () => {
  //     window.removeEventListener('contextmenu', showSettings);
  //     window.removeEventListener('click', hideSettings);
  //   };
  // }, []);

  useEffect(() => {
    const resizeHandle = () => {
      if (chartComponentRef.current && chartComponentRef.current.chart) {
        chartComponentRef.current.chart.setSize(undefined, undefined, true);
      }
    };
  
    window.addEventListener('resize', resizeHandle);
  
    return () => {
      window.removeEventListener('resize', resizeHandle);
    }
  }, []);
  

  return (
    <>
      {/* <div className="plot"> */}
      {show && <Settings setYAxis={setYAxis} top={position.y} left={position.x} />}

      {/* <div className="plot__container" onClick={hideSettings} onContextMenu={(e) => showSettings(e)}> */}
      <HighchartsReact
        // onClick={hideSettings}
        // onContextMenu={(e) => showSettings(e)}
        highcharts={Highcharts}
        options={extendedOptions}
        ref={chartComponentRef}
      />
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Chart;
