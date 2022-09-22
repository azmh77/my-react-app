import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import swal from "sweetalert";
import axios from "axios";

import {
  costCenterAction,
  showAddCostCenterModal,
  closeAddCostCenterModal,
  showEditCostCenterModal,
  closeEditeCostCenterModal,
} from "./../../redux/actions/costCenterAction/costCenterAction";
import { projectAction } from "./../../redux/actions/projectAction/projectAction";

import Wrapper from "./../../hoc/Wrapper";
import Spinners from "./../../components/UI/Spinners_Loading/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import TopHeaderCom from "./../../components/TopHeaderCom/TopHeaderCom";
import Input from "./../../components/UI/Forms/Input/Input";
import Button from "./../../components/UI/Forms/Button/Button";

import "./Costcenter.css";

const Costcenter = () => {
  let resalt = <Spinners title="در حال بارگذاری اطلاعات ..." />;
  const [id_For_Edit, setId_For_Edit] = useState();
  const addInput_Ref = useRef();
  const addSelect_Ref = useRef();
  const editInput_Ref = useRef();
  const editSelect_Ref = useRef();

  const gridRef = useRef();
  let { gridApi, gridColumnApi } = "";
  const dispatch = useDispatch();
  const costCenter = useSelector((state) => state.CostCenter);
  const Project = useSelector((state) => state.project);
  const { loading, CostCenter, addCostCenter_Modal, editCostCenter_Modal } =
    costCenter;
  const { project } = Project;

  const headersCSV = [
    { lable: "نام مرکز هزینه", key: "name" },
    { lable: "پروژه", key: "project.name" },
  ];

  const csvReport = {
    filename: "لیست مراکز هزینه",
    headers: headersCSV,
    data: CostCenter,
  };

  useEffect(() => {
    dispatch(costCenterAction);
    dispatch(projectAction);
  }, [dispatch]);

  let onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  const columnDefs = [
    {
      headerName: "نام مرکز هزینه",
      field: "name",
    },
    {
      headerName: "پروژه",
      field: "project.name",
    },
    {
      headerName: "دستورات",
      field: "id",
      cellRenderer: (id) => (
        <div>
          <button
            className="btn editeBtn"
            onClick={() => EditeCostcenter(id.value)}
          >
            <i
              className="bi bi-pencil-square"
              onClick={() => dispatch(showEditCostCenterModal)}
            ></i>
          </button>
          <button
            className="btn deleteBtn"
            onClick={() => RemoveCostcenter(id.value)}
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

  const EditeCostcenter = (id) => {
    const found = CostCenter.find((item) => item.id === id);
    let name = found.name;
    let project = found.project.id;
    setId_For_Edit(found.id);
    editInput_Ref.current.value = name;
    editSelect_Ref.current.value = project;
  };

  const RemoveCostcenter = (id) => {
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
          .delete(`http://37.32.26.0/api/CostCenter/${id}`)
          .then((response) => {
            resultCode = response.data.result;
            message = response.data.message;
          })
          .catch((error) => {
            message = error.message;
          });

        if (resultCode === 3) {
          swal("موفق بود !", `${message}`, "success");
          setTimeout(() => {
            dispatch(costCenterAction);
          }, 2000);
        } else {
          swal("موفق نبود !", `${message}`, "error");
        }
      } else {
        swal("عملیات حذف لغو شد !");
      }
    });
  };

  const modalClose = () => {
    dispatch(closeAddCostCenterModal);
    dispatch(closeEditeCostCenterModal);
    addInput_Ref.current.value = "";
    editInput_Ref.current.value = "";
    addSelect_Ref.current.value = "";
    editSelect_Ref.current.value = "";
  };

  const addCostcenterHandler = async (e) => {
    e.preventDefault();
    let message = "";
    let resultCode = "";
    let data = {
      id: 0,
      name: addInput_Ref.current.value,
      projectId: addSelect_Ref.current.value,
      companyId: 1,
    };
    console.log(data);
    if (data.name) {
      await axios
        .post("http://37.32.26.0/api/CostCenter", data)
        .then((response) => {
          resultCode = response.data.result;
          message = response.data.message;
        })
        .catch((error) => {
          message = error.message;
        });

      if (resultCode === 3) {
        swal("موفق بود !", `${message}`, "success");
        setTimeout(() => {
          dispatch(costCenterAction);
        }, 2000);
      } else {
        swal("موفق نبود !", `${message}`, "error");
      }
    } else {
      swal("موفق نبود !", "فیلد نباید خالی باشد !", "error");
    }
  };

  const editCostcenterHandler = async (e) => {
    e.preventDefault();
    let message = "";
    let resultCode = "";
    let data = {
      id: id_For_Edit,
      name: editInput_Ref.current.value,
      projectId: editSelect_Ref.current.value,
      companyId: 1,
    };
    await axios
      .put("http://37.32.26.0/api/CostCenter", data)
      .then((response) => {
        resultCode = response.data.result;
        message = response.data.message;
      })
      .catch((error) => {
        message = error.message;
      });

    if (resultCode === 3) {
      swal("موفق بود !", `${message}`, "success");
      setTimeout(() => {
        dispatch(costCenterAction);
      }, 2000);
    } else {
      swal("موفق نبود !", `${message}`, "error");
    }
  };

  if (!loading) {
    resalt = (
      <div className="w-100">
        <Modal show={addCostCenter_Modal} modalClose={modalClose}>
          <form
            className="form-Bank showdow-lg"
            onSubmit={addCostcenterHandler}
          >
            <h6>ثبت مرکز هزینه</h6>
            <Input
              type={"text"}
              placeholder="نام مرکز هزینه ..."
              Ref={addInput_Ref}
            />
            <div>
              <select className="seletion" ref={addSelect_Ref}>
                {project.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button type={"submit"}>تایید</Button>
          </form>
        </Modal>
        <Modal show={editCostCenter_Modal} modalClose={modalClose}>
          <form
            className="form-Bank showdow-lg"
            onSubmit={editCostcenterHandler}
          >
            <h6>ویرایش مرکز هزینه</h6>
            <Input
              type={"text"}
              placeholder="نام مرکز هزینه ..."
              Ref={editInput_Ref}
            />
            <div>
              <select className="seletion" ref={editSelect_Ref}>
                {project.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button type={"submit"}>تایید</Button>
          </form>
        </Modal>
        <TopHeaderCom
          title="لیست مراکز هزینه"
          csvReport={csvReport}
          onPageSizeChanged={onPageSizeChanged}
          AddBankName={() => dispatch(showAddCostCenterModal)}
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
            rowData={CostCenter}
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

export default Costcenter;
