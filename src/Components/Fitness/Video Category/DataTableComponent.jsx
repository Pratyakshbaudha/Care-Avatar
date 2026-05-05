import React, { Fragment, useEffect, useState, useCallback } from "react";
import DataTable from "react-data-table-component";
import { Btn, H4, H6, Image, Spinner } from "../../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../Redux/stateSlice/userReducer";
import { Col } from "reactstrap";
import ViewModal from "./ViewModal";
import { BASE_URL } from "../../../Config/AppConstant";
import EditModal from "./EditModal";
import { fetchVideoCategories } from "../../../Redux/stateSlice/allVideoCategory";

const DataTableComponent = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewData, setViewData] = useState("");
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector((state) => state.videoCategory);

  useEffect(() => {
    dispatch(fetchVideoCategories());
  }, [dispatch, currentPage]);

  const handleEditToggle = (data) => {
    setViewData(data);
    setEditModal(true);
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id)); 
    dispatch(fetchVideoCategories()); 
  };

  const handleView = (data) => {
    setViewModal(true);
    setViewData(data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Col className="vh-100 d-flex align-items-center justify-content-center">
        <div className="loader-box">
          <Spinner attrSpinner={{ className: "loader-5" }} />
        </div>
      </Col>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const CustomOption = ({ row }) => (
    <div className="d-flex">
      <button className="btn btn-light p-2 mx-1" onClick={() => handleView(row)}>
        <i className="fa fa-arrows-alt" style={{ fontSize: "large", color: "#494949" }}></i>
      </button>
      <button className="btn btn-light p-2 mx-1" onClick={() => handleEditToggle(row)}>
        <i className="fa fa-edit" style={{ fontSize: "large", color: "#494949" }}></i>
      </button>
      <button className="btn btn-light p-2 mx-1" onClick={() => row._id && handleDelete(row._id)}>
        <i className="fa fa-trash-o" style={{ fontSize: "large", color: "#494949" }}></i>
      </button>
    </div>
  );

  const tableColumns = [
    // {
    //   name: "Id",
    //   selector: (row) => row?._id || "N/A",
    //   sortable: true,
    //   center: true,
    // },
    {
      name: "Profile",
      sortable: true,
      center: true,
      cell: (row) =>
        row?.fitnessCategoryId?.categoryIcon ? (
          <div className="avatar">
            <Image
              attrImage={{
                body: true,
                className: "img-60 rounded-circle",
                src: `${BASE_URL}/uploads/${row.fitnessCategoryId.categoryIcon}`, 
                alt: "Category Icon",
              }}
            />
          </div>
        ) : (
          "No Image"
        ),
    },
    {
      name: "Category Name",
      selector: (row) => row?.videoCategoryName || "N/A",
      sortable: true,
      center: true,
    },
    // {
    //   name: "Tags",
    //   selector: (row) => row?.videoCategoryTags?.join(", ") || "No Tags",
    //   sortable: true,
    //   center: true,
    // },
    {
      name: "Option",
      center: true,
      minWidth: "150px",
      button: true,
      cell: (row) => <CustomOption row={row} />,
    },
  ];

  return (
    <Fragment>
      <DataTable
        data={categories?.length ? categories : []}
        columns={tableColumns}
        striped
        center
        pagination
        paginationServer
        onChangePage={handlePageChange}
        paginationDefaultPage={currentPage}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
      />
      <ViewModal data={viewData} viewModal={viewModal} setViewModal={setViewModal} />
      <EditModal data={viewData} editModal={editModal} setEditModal={setEditModal} />
    </Fragment>
  );
};

export default DataTableComponent;
