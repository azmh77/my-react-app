import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import swal from "sweetalert";
import axios from "axios";

import {
  guildAction,
  showAddProjectModal,
  closeAddProjectModal,
  showEditProjectModal,
  closeEditeProjectModal,
} from "../../redux/actions/guildAction/guildAction";

import Wrapper from "./../../hoc/Wrapper";
import Spinners from "./../../components/UI/Spinners_Loading/Spinner";
import Modal from "../../components/UI/Modal/Modal";
import TopHeaderCom from "./../../components/TopHeaderCom/TopHeaderCom";
import Input from "./../../components/UI/Forms/Input/Input";
import Button from "./../../components/UI/Forms/Button/Button";

import "./Guild.css";

const Guild = () => {
  let resalt = <Spinners title="در حال بارگذاری اطلاعات ..." />;
  const [id_For_Edit, setId_For_Edit] = useState();
  const addInput_Ref = useRef();
  const editInput_Ref = useRef();

  const gridRef = useRef();
  let { gridApi, gridColumnApi } = "";
  const dispatch = useDispatch();
  const GuilD = useSelector((state) => state.guild);
  const { loading, guild, addGuild_Modal, editGuild_Modal } = GuilD;

  const headersCSV = [{ lable: "نام صنف", key: "name" }];

  const csvReport = {
    filename: "لیستد صنوف",
    headers: headersCSV,
    data: guild,
  };

  useEffect(() => {
    dispatch(guildAction);
  }, [dispatch]);

  let onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  const columnDefs = [
    {
      headerName: "نام صنف",
      field: "name",
    },
    {
      headerName: "دستورات",
      field: "id",
      cellRenderer: (id) => (
        <div>
          <button className="btn editeBtn" onClick={() => EditeGuild(id.value)}>
            <i
              className="bi bi-pencil-square"
              onClick={() => dispatch(showEditProjectModal)}
            ></i>
          </button>
          <button
            className="btn deleteBtn"
            onClick={() => RemoveGuild(id.value)}
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

  const EditeGuild = (id) => {
    const found = guild.find((item) => item.id === id);
    let name = found.name;

    setId_For_Edit(found.id);
    editInput_Ref.current.value = name;
  };

  const RemoveGuild = (id) => {
    console.log(id)
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
          .delete(`http://37.32.26.0/api/Guild/${id}`)
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
            dispatch(guildAction);
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
    dispatch(closeAddProjectModal);
    dispatch(closeEditeProjectModal);
    addInput_Ref.current.value = "";
    editInput_Ref.current.value = "";
  };

  const addGuildHandler = async (e) => {
    e.preventDefault();
    let message = "";
    let resultCode = "";
    let data = {
      id: 0,
      name: addInput_Ref.current.value,
    };

    if (data.name) {
      await axios
        .post("http://37.32.26.0/api/Guild", data)
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
          dispatch(guildAction);
        }, 2000);
      } else {
        swal("موفق نبود !", `${message}`, "error");
      }
    } else {
      swal("موفق نبود !", "فیلد نباید خالی باشد !", "error");
    }
  };

  const editGuildHandler = async (e) => {
    e.preventDefault();
    let message = "";
    let resultCode = "";
    let data = {
      id: id_For_Edit,
      name: editInput_Ref.current.value,
    };
    await axios
      .put("http://37.32.26.0/api/Guild", data)
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
        dispatch(guildAction);
      }, 2000);
    } else {
      swal("موفق نبود !", `${message}`, "error");
    }
  };

  if (!loading) {
    resalt = (
      <div className="w-100">
        <Modal show={addGuild_Modal} modalClose={modalClose}>
          <form className="form-Bank showdow-lg" onSubmit={addGuildHandler}>
            <h6>اضافه کردن بانک</h6>
            <Input type={"text"} placeholder="نام صنف ..." Ref={addInput_Ref} />
            <Button type={"submit"}>تایید</Button>
          </form>
        </Modal>
        <Modal show={editGuild_Modal} modalClose={modalClose}>
          <form className="form-Bank showdow-lg" onSubmit={editGuildHandler}>
            <h6>ویرایش کردن نام صنف</h6>
            <Input
              type={"text"}
              placeholder="نام صنف ..."
              Ref={editInput_Ref}
            />
            <Button type={"submit"}>تایید</Button>
          </form>
        </Modal>
        <TopHeaderCom
          title="لیست صنوف"
          csvReport={csvReport}
          onPageSizeChanged={onPageSizeChanged}
          AddBankName={() => dispatch(showAddProjectModal)}
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
            rowData={guild}
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

export default Guild;
