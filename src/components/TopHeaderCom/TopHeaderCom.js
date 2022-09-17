import { FcAddDatabase } from "react-icons/fc";
import { CSVLink } from "react-csv";

import "./TopHeaderCom.css";

export default function TopHeaderCom(props) {
  return (
    <div className="Top-component-Header">
      <div className="d-flex justify-content-around align-items-center">
        <div className="d-flex align-items-center">
          <h5>{props.title}</h5>
          <button className="btnIcon" onClick={props.AddBankName}>
            <FcAddDatabase />
          </button>
        </div>
        <div className="d-none d-sm-flex align-items-center w-50">
          <h6>تعداد سطر :</h6>

          <select className="form-select form-select-sm w-25">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="d-none d-md-flex align-items-center BankName-Icon">
          <CSVLink {...props.csvReport}>
            <div>
              <i className="bi bi-file-earmark-excel excel-color"></i>
            </div>
          </CSVLink>
        </div>
      </div>
    </div>
  );
}
