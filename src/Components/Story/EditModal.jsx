import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Btn } from "../../AbstractElements";
import { useDispatch, useSelector } from "react-redux";
import { editStory, fetchStories } from "../../Redux/stateSlice/storyReducer";
import { BASE_URL } from "../../Config/AppConstant";

const EditModal = ({ category, editModal, setEditModal }) => {
  const dispatch = useDispatch();
  const { editLoading } = useSelector((state) => state.stories);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullStory: "",
    order: "",
    file: null,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        title: category?.title || "",
        shortDescription: category?.shortDescription || "",
        fullStory: category?.fullStory || "",
        order: category?.order || "",
        file: null,
      });
    }
  }, [category]);

  const modalToggle = () => setEditModal(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = async () => {
    if (!category?._id) return;
    if (!formData.title || !formData.shortDescription || !formData.fullStory || !formData.order) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("shortDescription", formData.shortDescription);
    data.append("fullStory", formData.fullStory);
    data.append("order", formData.order);
    if (formData.file) {
      data.append("image", formData.file);
    }

    await dispatch(editStory(category._id, data));
    await dispatch(fetchStories(1, 10));
    modalToggle();
  };

  const previewImage = category?.image || category?.filepath || category?.storyImage;
  const previewSrc = previewImage
    ? previewImage.startsWith("http")
      ? previewImage
      : previewImage.startsWith("/uploads")
      ? `${BASE_URL}${previewImage}`
      : `${BASE_URL}/uploads/${previewImage}`
    : null;

  return (
    <Modal isOpen={editModal} toggle={modalToggle} size="lg" centered>
      <ModalHeader toggle={modalToggle}>Edit Story</ModalHeader>
      <ModalBody>
        <Form className="theme-form">
          <FormGroup>
            <Label className="col-form-label pt-0">Title</Label>
            <Input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label pt-0">Short Description</Label>
            <Input type="textarea" name="shortDescription" rows="3" value={formData.shortDescription} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label pt-0">Full Story</Label>
            <Input type="textarea" name="fullStory" rows="6" value={formData.fullStory} onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label pt-0">Order</Label>
            <Input type="number" name="order" value={formData.order} onChange={handleInputChange} />
          </FormGroup>
          {previewSrc && (
            <FormGroup>
              <Label className="col-form-label pt-0">Current Image</Label>
              <div>
                <img src={previewSrc} alt="Story" width="70" height="70" style={{ objectFit: "cover", borderRadius: "8px" }} />
              </div>
            </FormGroup>
          )}
          <FormGroup>
            <Label className="col-sm-3 col-form-label">Upload New Image</Label>
            <Col sm="9">
              <Input className="form-control" type="file" name="file" accept="image/*" onChange={handleInputChange} />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "secondary", onClick: modalToggle, disabled: editLoading }}>Close</Btn>
        <Btn attrBtn={{ color: "primary", onClick: handleSave, disabled: editLoading }}>
          {editLoading ? "Updating..." : "Update"}
        </Btn>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
