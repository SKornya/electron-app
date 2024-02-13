import { FunctionComponent } from "react";

import './Sidebar.less';

interface SidebarProps {

}

const Sidebar: FunctionComponent<SidebarProps> = ({}) => {
  return (<div className="table-container">
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
    </table>
  </div>);
};

export default Sidebar;
