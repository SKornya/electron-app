interface AxisSettings {
  min: number | undefined;
  max: number | undefined;
  tick: number | undefined;
}

interface ChatSettings {
  xAxis: AxisSettings;
  yAxis: AxisSettings;
}

interface ChatSettingsAction {
  type: string;
  payload: AxisSettings;
}

const SET_XAXIS = 'SETXAXIS';
const SET_YAXIS = 'SETYAXIS';

const initialState: ChatSettings = {
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

const chartReducer = (state: ChatSettings = initialState, action: ChatSettingsAction) => {
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
