// import { useState, useEffect, useRef, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AgGridReact } from "ag-grid-react";
// import swal from "sweetalert";
// import axios from "axios";

// import {
//   fiscalYearAction,
//   showAddFiscalYearModal,
//   closeAddFiscalYearModal,
//   showEditFiscalYearModal,
//   closeEditeFiscalYearModal,
// } from "./../../redux/actions/fiscalYearAction/fiscalYearAction";

// import Wrapper from "./../../hoc/Wrapper";
// import Spinners from "./../../components/UI/Spinners_Loading/Spinner";
// import Modal from "../../components/UI/Modal/Modal";
// import TopHeaderCom from "./../../components/TopHeaderCom/TopHeaderCom";
// import Input from "./../../components/UI/Forms/Input/Input";
// import Button from "./../../components/UI/Forms/Button/Button";

// import "./FiscalYear.css";

// const FiscalYear = () => {
//   let resalt = <Spinners title="در حال بارگذاری اطلاعات ..." />;
//   const [id_For_Edit, setId_For_Edit] = useState();
//   const addInput_Ref = useRef();
//   const addSelect_Ref = useRef();
//   const editInput_Ref = useRef();
//   const editSelect_Ref = useRef();

//   const gridRef = useRef();
//   let { gridApi, gridColumnApi } = "";
//   const dispatch = useDispatch();
//   const fiscalYear = useSelector((state) => state.FiscalYear);
//   const { loading, FiscalYear, addFiscalYear_Modal, editFiscalYear_Modal } =
//     fiscalYear;

//   const headersCSV = [
//     { lable: "نام بانک", key: "id" },
//     { lable: "نوع بانک", key: "title" },
//   ];

//   const csvReport = {
//     filename: "لیست بانک ها",
//     headers: headersCSV,
//     data: FiscalYear,
//   };

//   useEffect(() => {
//     dispatch(fiscalYearAction);
//   }, [dispatch]);

//   let onGridReady = (params) => {
//     gridApi = params.api;
//     gridColumnApi = params.columnApi;
//     params.api.sizeColumnsToFit();
//   };

//   const columnDefs = [
//     {
//       headerName: "عنوان",
//       field: "title",
//     },
//     {
//       headerName: "سال",
//       field: "year",
//     },
//     {
//       headerName: "شروع",
//       field: "start",
//     },
//     {
//       headerName: "پایان",
//       field: "end",
//     },
//     {
//       headerName: "مالیات",
//       field: "rateTax",
//     },
//     {
//       headerName: "عوارض",
//       field: "rateToll",
//     },
//     {
//       headerName: "دستورات",
//       field: "id",
//       cellRenderer: (id) => (
//         <div>
//           <button className="btn editeBtn" onClick={() => EditeBank(id.value)}>
//             <i
//               className="bi bi-pencil-square"
//               onClick={() => dispatch(showAddFiscalYearModal)}
//             ></i>
//           </button>
//           <button
//             className="btn deleteBtn"
//             onClick={() => RemoveBank(id.value)}
//           >
//             <i className="bi bi-trash3"></i>
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const defaultColDef = {
//     resizable: true,
//     sortable: true,
//     width: 100,
//     flex: 1,
//   };

//   const onFirstDataRendered = useCallback((params) => {
//     gridRef.current.api.paginationGoToPage(0);
//   }, []);

//   const paginationNumberFormatter = useCallback((params) => {
//     return "[" + params.value.toLocaleString() + "]";
//   }, []);

//   const onPageSizeChanged = useCallback(() => {
//     var value = document.getElementById("page-size").value;
//     gridRef.current.api.paginationSetPageSize(Number(value));
//   }, []);

//   const EditeBank = (id) => {
//     const found = FiscalYear.find((item) => item.id === id);
//     let name = found.name;
//     let typeBank = found.typeBank;

//     setId_For_Edit(found.id);
//     editInput_Ref.current.value = name;
//     editSelect_Ref.current.value = typeBank;
//   };

//   const RemoveBank = (id) => {
//     let message = "";
//     let resultCode = "";
//     swal({
//       title: "آیا مطمئن هستید ؟",
//       text: "پس از حذف ، این آیتم قابل بازیابی نیست !",
//       icon: "warning",
//       buttons: ["لغو", "تایید"],
//       className: "text-center",
//     }).then(async (willDelete) => {
//       if (willDelete) {
//         await axios
//           .delete(`http://37.32.26.0/api/Bank/${id}`)
//           .then((response) => {
//             resultCode = response.data.result;
//             message = response.data.message;
//           })
//           .catch((error) => {
//             message = error.message;
//           });

//         if (resultCode === 3) {
//           swal("موفق بود !", `${message}`, "success");
//           setTimeout(() => {
//             dispatch(fiscalYearAction);
//           }, 2000);
//         } else {
//           swal("موفق نبود !", `${message}`, "error");
//         }
//       } else {
//         swal("عملیات حذف لغو شد !");
//       }
//     });
//   };

//   const modalClose = () => {
//     dispatch(closeAddFiscalYearModal);
//     dispatch(closeEditeFiscalYearModal);
//     addInput_Ref.current.value = "";
//     editInput_Ref.current.value = "";
//     addSelect_Ref.current.value = "";
//     editSelect_Ref.current.value = "";
//   };

//   const addBankHandler = async (e) => {
//     e.preventDefault();
//     let message = "";
//     let resultCode = "";
//     let data = {
//       id: 0,
//       name: addInput_Ref.current.value,
//       typeBank: addSelect_Ref.current.value,
//     };

//     if (data.name) {
//       await axios
//         .post("http://37.32.26.0/api/Bank", data)
//         .then((response) => {
//           resultCode = response.data.result;
//           message = response.data.message;
//         })
//         .catch((error) => {
//           message = error.message;
//         });

//       if (resultCode === 3) {
//         swal("موفق بود !", `${message}`, "success");
//         setTimeout(() => {
//           dispatch(fiscalYearAction);
//         }, 2000);
//       } else {
//         swal("موفق نبود !", `${message}`, "error");
//       }
//     } else {
//       swal("موفق نبود !", "فیلد نباید خالی باشد !", "error");
//     }
//   };

//   const editBankHandler = async (e) => {
//     e.preventDefault();
//     let message = "";
//     let resultCode = "";
//     let data = {
//       id: id_For_Edit,
//       name: editInput_Ref.current.value,
//       typeBank: editSelect_Ref.current.value,
//     };
//     await axios
//       .put("http://37.32.26.0/api/Bank", data)
//       .then((response) => {
//         resultCode = response.data.result;
//         message = response.data.message;
//       })
//       .catch((error) => {
//         message = error.message;
//       });

//     if (resultCode === 3) {
//       swal("موفق بود !", `${message}`, "success");
//       setTimeout(() => {
//         dispatch(fiscalYearAction);
//       }, 2000);
//     } else {
//       swal("موفق نبود !", `${message}`, "error");
//     }
//   };

//   if (!loading) {
//     resalt = (
//       <div className="w-100">
//         <Modal show={addFiscalYear_Modal} modalClose={modalClose}>
//           <form className="form-Bank showdow-lg" onSubmit={addBankHandler}>
//             <h6>اضافه کردن بانک</h6>
//             <Input
//               type={"text"}
//               placeholder="نام بانک ..."
//               Ref={addInput_Ref}
//             />
//             <div>
//               <select className="seletion" ref={addSelect_Ref}>
//                 <option value="0">دولتی</option>
//                 <option value="1">خصوصی</option>
//                 <option value="2">موسسه اعتباری</option>
//                 <option value="3">قرض الحسنه</option>
//               </select>
//             </div>
//             <Button type={"submit"}>تایید</Button>
//           </form>
//         </Modal>
//         <Modal show={editFiscalYear_Modal} modalClose={modalClose}>
//           <form className="form-Bank showdow-lg" onSubmit={editBankHandler}>
//             <h6>ویرایش کردن نام بانک</h6>
//             <Input
//               type={"text"}
//               placeholder="نام بانک ..."
//               Ref={editInput_Ref}
//             />
//             <div>
//               <select className="seletion" ref={editSelect_Ref}>
//                 <option value="0">دولتی</option>
//                 <option value="1">خصوصی</option>
//                 <option value="2">موسسه اعتباری</option>
//                 <option value="3">قرض الحسنه</option>
//               </select>
//             </div>
//             <Button type={"submit"}>تایید</Button>
//           </form>
//         </Modal>
//         <TopHeaderCom
//           title="بانک ها"
//           csvReport={csvReport}
//           onPageSizeChanged={onPageSizeChanged}
//           AddBankName={() => dispatch(showEditFiscalYearModal)}
//         />
//         <div
//           className="ag-theme-alpine"
//           style={{
//             width: "80%",
//             height: "457px",
//             fontFamily: "yekan",
//             margin: "0 auto",
//           }}
//         >
//           <AgGridReact
//             ref={gridRef}
//             onGridReady={onGridReady}
//             animateRows={true}
//             enableRtl={true}
//             rowData={FiscalYear}
//             columnDefs={columnDefs}
//             defaultColDef={defaultColDef}
//             pagination={true}
//             paginationPageSize={10}
//             paginationNumberFormatter={paginationNumberFormatter}
//             onFirstDataRendered={onFirstDataRendered}
//           ></AgGridReact>
//         </div>
//       </div>
//     );
//   }

//   return <Wrapper>{resalt}</Wrapper>;
// };

// export default FiscalYear;
