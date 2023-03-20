import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CategoryService } from "services/category.service";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const categoryService = new CategoryService();

export const AllCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState<ICategory | undefined>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response?.status === 200) {
        const data: ICategoryResponse[] = response?.data;
        const cats: ICategory[] = data.map((item) => ({
          _id: item._id,
          name: item.name,
          artPieces: item.artPieces,
        }));
        setCategories(cats);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const categoryService = new CategoryService();
      const response = await categoryService.deleteCategory(id);
      if (response?.status === 204) {
        await getCategories();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCategory(undefined);
  };

  const handleDeleteCategory = async () => {
    if (category) {
      await deleteCategory(category._id);
      setShowDeleteModal(false);
      setCategory(undefined);
    }
  };

  return (
    <>
      <div>
        <div className="mb-4 d-flex justify-content-between">
          <h3>Categories</h3>
          <Button
            variant="dark"
            size="sm"
            onClick={() => navigate("add-category")}
          >
            Add New Category
          </Button>
        </div>
        <Card>
          <Card.Header>All Categories</Card.Header>
          <Card.Body>
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Art Pieces</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, idx) => (
                  <tr key={idx}>
                    <td>{category.name}</td>
                    <td>{category.artPieces}</td>
                    <td>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => navigate(`category/${category._id}`)}
                      >
                        View
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          navigate(`edit-category/${category._id}`)
                        }
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setCategory(category);
                          handleOpenDeleteModal();
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      <Modal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onHide={handleCloseDeleteModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Are you sure you want to delete{" "}
            <span style={{ fontWeight: "bold" }}>{category?.name}</span>{" "}
            category?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCloseDeleteModal}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
