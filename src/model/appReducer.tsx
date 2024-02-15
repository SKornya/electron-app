interface AppSettings {
  state: string;
}

interface AppSettingsAction {
  type: string;
  payload: string;
}

const SET_STOPPED = 'SETSTOPPED';
const SET_PAUSED = 'SETPAUSED';
const SET_RUNNING = 'SETRUNNING';

const initialState: AppSettings = {
  state: 'stopped',
};

const setStopped = () => ({
  type: SET_STOPPED,
});

const setPaused = () => ({
  type: SET_PAUSED,
});

const setRunning = () => ({
  type: SET_RUNNING,
});

const appReducer = (state: AppSettings = initialState, action: AppSettingsAction) => {
  switch (action.type) {
    case SET_STOPPED:
      return ({
        state: 'stopped',
      });
    case SET_PAUSED:
      return ({
        state: 'paused',
      });
    case SET_RUNNING:
      return ({
        state: 'running',
      });
    default:
      return state;
  }
};

export { setRunning, setPaused, setStopped, appReducer };
