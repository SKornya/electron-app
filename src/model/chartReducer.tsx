export interface AxisSettings {
  min: number | undefined;
  max: number | undefined;
  tick: number | undefined;
  [key: string]: number | undefined;
}

interface ChartSettings {
  xAxis: AxisSettings;
  yAxis: AxisSettings;
}

interface ChartSettingsAction {
  type: string;
  payload: AxisSettings;
}

const SET_XAXIS = 'SETXAXIS';
const SET_YAXIS = 'SETYAXIS';

const initialState: ChartSettings = {
  xAxis: {
    min: undefined,
    max: undefined,
    tick: undefined,
  },
  yAxis: {
    min: undefined,
    max: undefined,
    tick: undefined,
  },
};

const setXAxis = (value: AxisSettings) => ({
  type: SET_XAXIS,
  payload: value,
});

const setYAxix = (value: AxisSettings) => ({
  type: SET_YAXIS,
  payload: value,
});

const chartReducer = (state: ChartSettings = initialState, action: ChartSettingsAction) => {
  switch (action.type) {
    case SET_XAXIS:
      return ({
        ...state,
        xAxis: action.payload,
      });
    case SET_YAXIS:
      return ({
        ...state,
        yAxis: action.payload,
      });
    default:
      return state;
  }
};

export { setXAxis, setYAxix, chartReducer };
