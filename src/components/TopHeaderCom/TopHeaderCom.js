import { CSVLink } from "react-csv";

import "./TopHeaderCom.css";

export default function TopHeaderCom({
  title,
  AddBankName,
  onPageSizeChanged,
  csvReport,
}) {
  return (
    <div className="Top-component-Header">
      <div className="d-flex justify-content-around align-items-center">
        <div className="d-flex align-items-center">
          <h5>{title}</h5>
          <button className="btn AddBankName" onClick={AddBankName}>
            <i className="bi bi-plus-square"></i>
          </button>
        </div>
        <div className="d-flex align-items-center">
          <h6 className="text-center">تعداد سطر</h6>

          <select
            className="form-select form-select-sm  w-100"
            onChange={onPageSizeChanged}
            id="page-size"
            defaultValue="10"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="d-none d-md-flex align-items-center BankName-Icon">
          <CSVLink {...csvReport}>
            <div>
              <i className="bi bi-file-earmark-excel excel-color"></i>
            </div>
          </CSVLink>
        </div>
      </div>
    </div>
  );
}
