import { FunctionComponent, useEffect, useRef } from "react";

import { RootState } from "../../store";
import { useSelector } from "react-redux";

import './Sidebar.less';

const Sidebar: FunctionComponent = () => {
  const data = useSelector((state: RootState) => state.data);
  const categories = useSelector((state: RootState) => state.categories);

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
          {data.map((value, index) => {
            return (
              <tr>
                <td>
                  {categories[index].toDateString()}
                  <br />
                  {`${categories[index].getHours()}:${categories[index].getMinutes().toString().padStart(2, '0')}`}
                </td>
                <td>
                  {value}
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
