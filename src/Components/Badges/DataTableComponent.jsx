import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Btn, H5, Image, Spinner } from "../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import { BASE_URL } from "../../Config/AppConstant";
import AddModal from "./AddModal";
import { fetchBadges } from "../../Redux/stateSlice/badgeReducer";

const resolveBadgeIcon = (badge) => {
  const icon = badge?.icon || badge?.image || badge?.filepath;
  if (!icon) return "/default-avatar.png";
  if (typeof icon === "string" && icon.startsWith("http")) return icon;
  if (typeof icon === "string" && icon.startsWith("/uploads")) return `${BASE_URL}${icon}`;
  return `${BASE_URL}/uploads/${icon}`;
};

const DataTableComponent = () => {
  const [viewModal, setViewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const dispatch = useDispatch();
  const { loading, badges, error, pagination } = useSelector((state) => state.badges);

  useEffect(() => {
    dispatch(fetchBadges(currentPage, perPage));
  }, [dispatch, currentPage, perPage]);

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

  const tableColumns = [
    {
      name: "Icon",
      cell: (row) => (
        <Image
          attrImage={{
            className: "img-60 rounded-circle",
            src: resolveBadgeIcon(row),
            alt: row?.name || "Badge",
          }}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row?.name || "-",
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row?.price || "-",
      sortable: true,
      center: true,
      cell: (row) => <span>{row?.price ? `Rs. ${row.price}` : "-"}</span>,
    },
    {
      name: "Status",
      center: true,
      cell: () => <span className="badge badge-light-success">Active</span>,
    },
  ];

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-between p-2">
        <H5 attrH5={{ className: "text-muted m-0" }}>Badges</H5>
        <Btn attrBtn={{ color: "primary", onClick: () => setViewModal(true) }}>
          Add Badge
        </Btn>
      </div>

      <DataTable
        data={Array.isArray(badges) ? badges : []}
        columns={tableColumns}
        striped
        pagination
        paginationServer
        paginationPerPage={perPage}
        paginationTotalRows={pagination?.totalItems || pagination?.totalBadges || badges.length}
        onChangePage={setCurrentPage}
        paginationDefaultPage={currentPage}
        noDataComponent={<div className="text-center p-4">No badges found</div>}
      />

      <AddModal viewModal={viewModal} setViewModal={setViewModal} />
    </Fragment>
  );
};

export default DataTableComponent;
