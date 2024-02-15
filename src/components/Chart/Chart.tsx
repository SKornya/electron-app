import { FunctionComponent, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from '../../store';
import { setData, setTime } from '../../model/dataReducer';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TimeScale,
  Decimation,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Подключаем адаптер для работы с датами
import ZoomPlugin from 'chartjs-plugin-zoom';
import { ru } from 'date-fns/locale';

const Chart: FunctionComponent = memo(() => {
  
  const dispatch = useAppDispatch();
  const values = useSelector((state: RootState) => state.data.data);
  const categories = useSelector((state: RootState) => state.data.categories);

  const parsedData = values.map((value, i) => ({
    x: categories[i].getTime(),
    y: value,
  }));

  ChartJS.register(
    Title, 
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    ZoomPlugin,
    Decimation,
  );
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    parsing: false,
    scales: {
      x: {
        type: 'time',
        max: undefined,
        min: undefined,
        time: {
          parser: 'X',
          unit: 'second',
          displayFormats: {
            second: 'HH:mm:ss',
          },
        },
        ticks: {
          maxTicksLimit: 10,
        },
        grid: {
          color: '#707070',
        },  
        adapters: {
          date: {
            locale: ru,
          },
        },
      },
      y: {
        max: undefined,
        min: undefined,
        grid: {
          color: '#707070',
        },
        ticks: {
          stepSize: 1,
        },
      }
    },
    plugins: {
      decimation: {
        enabled: true,
        algorithm: 'lttb',
        threshold: 500,
        samples: 250,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          mode: 'x',
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
        },
      },
    },
    datasets: {
      line: {
        pointRadius: 0,
      },
    },
    layout: {
      padding: 20,
    },
    animation: false,
    backgroundColor: 'yellow',
  };
    
  const data: ChartData<'line'> = {
    datasets: [
      {
        label: 'Dataset 1',
        data: parsedData,
        borderColor: '#646cff',
        borderWidth: 1,
        backgroundColor: '#1a1a1a',
        indexAxis: 'x',
      },
    ],
  };

  const addPoint = () => {
    const date = new Date();
    dispatch(setData(Math.ceil(Math.random() * 10)));
    dispatch(setTime(date));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addPoint();
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return <Line  options={options} data={data} />;
})

export default Chart;
