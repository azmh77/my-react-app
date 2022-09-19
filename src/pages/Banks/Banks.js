import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import swal from "sweetalert";
import axios from "axios";

import {
  banksAction,
  showAddBankModal,
  closeAddBankModal,
  showEditBankModal,
  closeEditeBankModal,
} from "./../../redux/actions/banksAction";

import Wrapper from "./../../hoc/Wrapper";
import Spinners from "./../../components/UI/Spinners_Loading/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import TopHeaderCom from "./../../components/TopHeaderCom/TopHeaderCom";
import Input from "./../../components/UI/Forms/Input/Input";
import Button from "./../../components/UI/Forms/Button/Button";

import "./Banks.css";

const Banks = () => {
  const addInput_Ref = useRef();
  const addSelect_Ref = useRef();
  const gridRef = useRef();
  let { gridApi, gridColumnApi } = "";
  const dispatch = useDispatch();
  const Banks = useSelector((state) => state.banks);
  const { loading, banks, addBank_Modal, editBank_Modal } = Banks;

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
    params.api.sizeColumnsToFit();
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
      field: "id",
      cellRendererFramework: (id) => (
        <div>
          <button className="btn editeBtn" onClick={() => EditeBank(id.value)}>
            <i
              className="bi bi-pencil-square"
              onClick={() => dispatch(showEditBankModal)}
            ></i>
          </button>
          <button
            className="btn deleteBtn"
            onClick={() => RemoveBank(id.value)}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    width: 100,
    flex: 1,
  };

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

  const EditeBank = (id) => {};

  const RemoveBank = (id) => {
    let message = "";
    let resultCode = "";
    swal({
      title: "آیا مطمئن هستید ؟",
      text: "پس از حذف ، این آیتم قابل بازیابی نیست !",
      icon: "warning",
      buttons: ["لغو", "تایید"],
      className: "text-center",
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios
          .delete(`http://37.32.26.0/api/Bank/${id}`)
          .then((response) => {
            resultCode = response.data.result;
            message = response.data.message;
          })
          .catch((error) => {
            message = error.message;
          });

        if (resultCode === 3) {
          swal("موفق بود !", `${message}`, "success");
          dispatch(banksAction);
        } else {
          swal("موفق نبود !", `${message}`, "error");
        }
      } else {
        swal("عملیات حذف لغو شد !");
      }
    });
  };

  const modalClose = () => {
    dispatch(closeAddBankModal);
    dispatch(closeEditeBankModal);
    addInput_Ref.current.value = "";
  };

  const addBankHandler = async (e) => {
    e.preventDefault();
    let message = "";
    let resultCode = "";
    let data = {
      id: 0,
      name: addInput_Ref.current.value,
      typeBank: addSelect_Ref.current.value,
    };
    await axios
      .post("http://37.32.26.0/api/Bank", data)
      .then((response) => {
        resultCode = response.data.result;
        message = response.data.message;
      })
      .catch((error) => {
        message = error.message;
      });

    if (resultCode === 3) {
      swal("موفق بود !", `${message}`, "success");
      dispatch(banksAction);
    } else {
      swal("موفق نبود !", `${message}`, "error");
    }
  };

  let resalt = (
    <Modal show={true}>
      <Spinners />
    </Modal>
  );

  if (!loading) {
    resalt = (
      <div className="w-100">
        <Modal show={addBank_Modal} modalClose={modalClose}>
          <form className="form-addBank showdow-lg" onSubmit={addBankHandler}>
            <h6>اضافه کردن بانک</h6>
            <Input
              type={"text"}
              placeholder="نام بانک ..."
              Ref={addInput_Ref}
            />
            <div>
              <select className="seletion" ref={addSelect_Ref}>
                <option value="0">دولتی</option>
                <option value="1">خصوصی</option>
                <option value="2">موسسه اعتباری</option>
                <option value="3">قرض الحسنه</option>
              </select>
            </div>
            <Button type={"submit"}>تایید</Button>
          </form>
        </Modal>
        <Modal show={editBank_Modal} modalClose={modalClose}>
          Hello Word ! -- edite bank
        </Modal>
        <TopHeaderCom
          title="بانک ها"
          csvReport={csvReport}
          onPageSizeChanged={onPageSizeChanged}
          AddBankName={() => dispatch(showAddBankModal)}
        />
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
