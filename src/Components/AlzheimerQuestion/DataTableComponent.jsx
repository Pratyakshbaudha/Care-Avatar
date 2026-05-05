import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn, Spinner } from "../../AbstractElements";
import { Col, Input, Form, FormGroup, Button } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../../Config/AppConstant";
const AlzheimerQuestionTable = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // 🔹 Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // if required
        const response = await axios.get(
          "https://api.careavatar.com/api/assesment/alzheimer/question/list",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setQuestions(response.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // 🔹 Pagination handlers
  const handlePageChange = (page) => setCurrentPage(page);
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage);
    setCurrentPage(page);
  };

  // 🔹 Search handlers
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearch(true);
    setCurrentPage(1);
  };
  const handleSearchClear = () => {
    setSearchInput("");
    setIsSearch(false);
    setCurrentPage(1);
  };

  // 🔹 Filtered + paginated data
  const filteredData = isSearch
    ? questions.filter((q) =>
        q.question.toLowerCase().includes(searchInput.toLowerCase())
      )
    : questions;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // 🔹 Columns same style as your blockHistory table
  const columns = [
    { name: "Index", selector: (row) => row.index, sortable: true, center: true },
    { name: "Category", selector: (row) => row.questionCategory?.name || "-", center: true },
    { name: "Question", selector: (row) => row.question || "-", wrap: true, grow: 2 },
    { name: "Points", selector: (row) => row.points || 0, center: true },
    {
      name: "Images",
      center: true,
      cell: (row) =>
        row.image && Object.keys(row.image).length > 0 ? (
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {Object.values(row.image).map((img, i) => (
              <img
                key={i}
                src={`${BASE_URL}/uploads/${img}`}
                alt="img"
                width="40"
                height="40"
                style={{ borderRadius: "5px", border: "1px solid #ccc", objectFit: "cover" }}
              />
            ))}
          </div>
        ) : (
          <span className="text-muted">No image</span>
        ),
    },
  ];

  if (loading) {
    return (
      <Col className="vh-100 d-flex align-items-center justify-content-center">
        <Spinner attrSpinner={{ className: "loader-5" }} />
      </Col>
    );
  }

  return (
    <Fragment>
      {/* 🔹 Search */}
      <Form onSubmit={handleSearch} className="mb-3">
        <FormGroup>
          <div className="d-flex gap-3">
            <Input
              type="text"
              placeholder="Search by question..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ width: "250px" }}
            />
            <Btn attrBtn={{ color: "primary", type: "submit" }}>Search</Btn>
            {isSearch && (
              <Button color="secondary" onClick={handleSearchClear}>
                Clear
              </Button>
            )}
          </div>
        </FormGroup>
      </Form>

      {/* 🔹 DataTable */}
      <DataTable
        data={paginatedData}
        columns={columns}
        striped
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={filteredData.length}
        paginationPerPage={perPage}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationDefaultPage={currentPage}
      />
    </Fragment>
  );
};

export default AlzheimerQuestionTable;
