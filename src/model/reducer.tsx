interface Data {
  data: Array<number>;
  categories: Array<Date>;
  // delay: number; TODO: кастомная задержка
}

interface DataAction {
  type: string;
  payload: number | Date;
}

const SET_DATA = 'SETDATA';
const SET_TIME = 'SETTIME';

const initialState: Data = {
  data: [],
  categories: [],
};

const setData = (value: number) => ({
  type: SET_DATA,
  payload: value,
});

const setTime = (value: Date) => ({
  type: SET_TIME,
  payload: value,
});

const reducer = (state: Data = initialState, action: DataAction) => {
  switch (action.type) {
    case SET_DATA:
      if (typeof action.payload === 'number') {
        return ({
          ...state,
          data: [...state.data, action.payload],
        });
      }
      return state;
    case SET_TIME:
      if (typeof action.payload !== 'number') {
        return ({
          ...state,
          categories: [...state.categories, action.payload],
        });
      }
      return state;
    default:
      return state;
  }
};

export { setData, setTime, reducer };
