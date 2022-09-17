import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";

import { banksAction } from "./../../redux/actions/banksAction";
import Wrapper from "./../../hoc/Wrapper";
import Spinners from "./../../components/UI/Spinners_Loading/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import TopHeaderCom from "./../../components/TopHeaderCom/TopHeaderCom";

import "./Banks.css";

const Banks = () => {
  const gridRef = useRef();
  let { gridApi, gridColumnApi } = "";
  const dispatch = useDispatch();
  const Banks = useSelector((state) => state.banks);
  const { loading, banks } = Banks;

  const headersCSV = [
    { lable: "نام بانک", key: "name" },
    { lable: "نوع بانک", key: "typeBank" },
  ];

  const csvReport = {
    filename: "لیست بانک ها",
    headers: headersCSV,
    data: banks,
  };

  useEffect(() => {
    dispatch(banksAction);
  }, [dispatch]);

  let onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
  };

  const columnDefs = [
    {
      headerName: "نام بانک",
      field: "name",
    },
    {
      headerName: "نوع بانک",
      field: "typeBank",
    },
    {
      headerName: "دستورات",
    },
  ];

  const defaultColDef = {
    sortable: true,
    width: 100,
    flex: 1,
  };

  let resalt = (
    <Modal show={true}>
      <Spinners />
    </Modal>
  );

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.paginationGoToPage(0);
  }, []);

  const paginationNumberFormatter = useCallback((params) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  if (!loading) {
    resalt = (
      <div className="w-100">
        <TopHeaderCom title="بانک ها" csvReport={csvReport}/>
        <div
          className="ag-theme-alpine"
          style={{
            width: "80%",
            height: "457px",
            fontFamily: "yekan",
            margin: "0 auto",
          }}
        >
          <AgGridReact
            ref={gridRef}
            onGridReady={onGridReady}
            animateRows={true}
            enableRtl={true}
            rowData={banks}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
            paginationNumberFormatter={paginationNumberFormatter}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
    );
  }

  return <Wrapper>{resalt}</Wrapper>;
};

export default Banks;

{
  /* <select onChange={onPageSizeChanged} id="page-size">
          <option value="0" >--نمایش --</option>
          <option value="5" >5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> */
}
