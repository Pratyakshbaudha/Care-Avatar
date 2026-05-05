import React, { useState, useEffect } from "react";
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
import { Btn } from "../../AbstractElements";
import { resolveAssetUrl } from "../../Utils/media";

const resolveCategoryImage = (category) =>
  resolveAssetUrl(
    category?.filepath ||
      category?.image ||
      category?.icon ||
      category?.filePath
  );

const EditDonationModal = ({ category, editModal, EditModaltoggle, refreshCategories }) => {
  const [formData, setFormData] = useState({ name: "", file: null });

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name || "", file: null });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

 const handleEditCategory = async () => {
  if (!formData.name) {
    alert("Please enter a name.");
    return;
  }

  const data = new FormData();
  data.append("name", formData.name);
  if (formData.file) data.append("image", formData.file);

  try {
    // get token from localStorage
    const token = localStorage.getItem("token"); // or whatever key you use

    const res = await fetch(
      `https://api.careavatar.com/api/donationCategory/${category._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`, // add token here
        },
        body: data,
      }
    );

    if (!res.ok) throw new Error("Failed to update category");
    alert("Category updated successfully!");
    EditModaltoggle();
    if (refreshCategories) refreshCategories(); // refresh parent list
  } catch (err) {
    console.error(err);
    alert("Error updating category.");
  }
};


  return (
    <Modal isOpen={editModal} toggle={EditModaltoggle} size="md" centered>
      <ModalHeader toggle={EditModaltoggle}>Edit Donation Category</ModalHeader>
      <ModalBody>
        <Form className="theme-form">
          <FormGroup>
            <Label>Category Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Category Name"
            />
          </FormGroup>
          {resolveCategoryImage(category) && (
            <FormGroup>
              <img
                src={resolveCategoryImage(category)}
                width="60"
                height="60"
                alt="category"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            </FormGroup>
          )}
          <FormGroup>
            <Label>Upload Image</Label>
            <Col sm="12">
              <Input type="file" name="file" onChange={handleInputChange} />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Btn attrBtn={{ color: "secondary", onClick: EditModaltoggle }}>Close</Btn>
        <Btn attrBtn={{ color: "primary", onClick: handleEditCategory }}>Save</Btn>
      </ModalFooter>
    </Modal>
  );
};

export default EditDonationModal;
