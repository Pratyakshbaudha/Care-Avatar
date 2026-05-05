import React, { useEffect, useState, Fragment } from "react";
import DataTable from "react-data-table-component";
import { Col, Input, FormGroup, Form, Button, Spinner } from "reactstrap";
import { H5, Btn } from "../../../AbstractElements";
import Delete from "../../../CommonElements/deleteModal";
import alzheimerService from "../../../Services/alzheimer";
import AddAssessmentCategory from "./create";
import UpdateAssessmentCategory from "./update";
import ViewAssessmentCategory from "./view";

const AssessmentCategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

 const fetchData = async () => {
  setLoading(true);
  try {
    // Dummy data for testing UI
    const dummy = [
      {
        _id: "1",
        name: "Shapes Recognition",
        description: "Assessment related to identifying basic shapes",
      },
      {
        _id: "2",
        name: "Memory Test",
        description: "Assessment to test short-term memory",
      },
      {
        _id: "3",
        name: "Cognitive Test",
        description: "General cognitive ability test for patients",
      },
    ];
    setCategories(dummy);
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async () => {
    try {
      await alzheimerService.deleteAssessmentCategory(selected._id);
      setDeleteModal(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredData = categories.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "_id",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex">
          <button
            onClick={() => {
              setSelected(row);
              setEditModal(true);
            }}
            className="btn btn-light p-1 mx-1"
          >
            <i className="fa fa-edit" />
          </button>
          <button
            onClick={() => {
              setSelected(row);
              setViewModal(true);
            }}
            className="btn btn-light p-1 mx-1"
          >
            <i className="fa fa-eye" />
          </button>
          <button
            onClick={() => {
              setSelected(row);
              setDeleteModal(true);
            }}
            className="btn btn-light p-1 mx-1"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <H5>Alzheimer Categories</H5>
        <Form inline onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormGroup>
        </Form>
        <Btn attrBtn={{ color: "primary", onClick: () => setAddModal(true) }}>
          Add Category
        </Btn>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        progressPending={loading}
        pagination
      />

      <AddAssessmentCategory modal={addModal} setModal={setAddModal} refresh={fetchData} />
      <UpdateAssessmentCategory modal={editModal} setModal={setEditModal} data={selected} refresh={fetchData} />
      <ViewAssessmentCategory modal={viewModal} setModal={setViewModal} data={selected} />
      <Delete isDelete={deleteModal} setIsDelete={setDeleteModal} onDelete={handleDelete} />
    </Fragment>
  );
};

export default AssessmentCategoryTable;