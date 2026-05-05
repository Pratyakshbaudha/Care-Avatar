import React, { useState } from "react";
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";
import { Btn } from "../../../AbstractElements";
import { useDispatch } from "react-redux";
import { fetchDietCharts, uploadDietChart } from "../../../Redux/stateSlice/dietChartReducer";

const AddModal = ({ viewModal, modalToggle }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadDietChart = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("attachment", file);

      console.log("Uploading file:", file.name);
      console.log("FormData content:", formData.get("attachment"));

      const response = await dispatch(uploadDietChart(formData));
      console.log("Upload response:", response);

      await dispatch(fetchDietCharts(1, 10));
      modalToggle(); // Close modal after successful upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Modal isOpen={viewModal} toggle={modalToggle} size="md" centered>
      <ModalHeader toggle={modalToggle}>Upload Excel File</ModalHeader>
      <hr />
      <ModalBody>
        <Form>
          <FormGroup>
            <Label className="col-sm-3 col-form-label">Upload File</Label>
            <Col sm="9">
              <Input type="file" onChange={handleInputChange} accept=".xlsx, .xls" />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        {/* Ensure the cancel button properly toggles the modal */}
        <Btn attrBtn={{ color: "secondary", onClick: modalToggle }}>Cancel</Btn>
        <Btn attrBtn={{ color: "primary", onClick: handleUploadDietChart }}>Save</Btn>
      </ModalFooter>
    </Modal>
  );
};

export default AddModal;
