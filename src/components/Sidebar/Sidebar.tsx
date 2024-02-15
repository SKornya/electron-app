import { FunctionComponent, useEffect, useRef } from "react";

import { RootState } from "../../store";
import { useSelector } from "react-redux";

import './Sidebar.less';

const Sidebar: FunctionComponent = () => {
  const data = useSelector((state: RootState) => state.data.data);
  const categories = useSelector((state: RootState) => state.data.categories);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTo({
        top:  tableContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [data, categories]);

  return (
    <div className="table-container" ref={tableContainerRef}>
      <table className="table">
        <thead>
          <tr>
            <th>
              Время
            </th>
            <th>
              Значение
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((value, index) => {
            return (
              <tr key={value.getTime()}>
                <td>
                  {value.toDateString()}
                  <br />
                  {`${value.getHours()}:${value.getMinutes().toString().padStart(2, '0')}`}
                </td>
                <td>
                  {data[index]}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
