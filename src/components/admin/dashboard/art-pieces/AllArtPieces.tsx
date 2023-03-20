import React, { useCallback, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ArtPieceService } from "services/artPiece.service";
import { CategoryService } from "services/category.service";
import { useNavigate } from "react-router-dom";

const artPieceService = new ArtPieceService();
const categoryService = new CategoryService();

export const AllArtPieces = () => {
    const navigate = useNavigate();

    const [artPieces, setArtPieces] = useState<IArtPiece[]>([]);
    const [artPiece, setArtPiece] = useState<IArtPiece | undefined>();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const getArtPieces = async (categories: ICategory[]) => {
        try {
            const response = await artPieceService.getArtPieces();
            if (response?.status === 200) {
                const data: IArtPieceResponse[] = response?.data;
                const artPieces: IArtPiece[] = data.map((item) => ({
                    _id: item._id,
                    title: item.title,
                    category:
                        categories.find((cat) => cat._id === item.categoryId)
                            ?.name ?? "",
                    dateAdded: item.createdAt,
                }));
                setArtPieces(artPieces);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getCategories = useCallback(async () => {
        try {
            const response = await categoryService.getCategories();
            if (response?.status === 200) {
                const data: ICategoryResponse[] = response?.data;
                const cats: ICategory[] = data.map((item) => ({
                    _id: item._id,
                    name: item.name,
                    artPieces: item.artPieces,
                }));
                getArtPieces(cats);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    const deleteArtPiece = async (id: string) => {
        try {
            const response = await artPieceService.deleteArtPiece(id);
            if (response?.status === 204) {
                await getCategories();
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setArtPiece(undefined);
    };

    const handleDeleteArtPiece = async () => {
        if (artPiece) {
            await deleteArtPiece(artPiece._id);
            setShowDeleteModal(false);
            setArtPiece(undefined);
        }
    };

    return (
        <>
            <div>
                <div className="mb-4 d-flex justify-content-between">
                    <h3>Art Pieces</h3>
                    <Button
                        variant="dark"
                        size="sm"
                        onClick={() => navigate("add-art-piece")}
                    >
                        Add New Art Piece
                    </Button>
                </div>
                <Card>
                    <Card.Header>All Art Pieces</Card.Header>
                    <Card.Body>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Date Added</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {artPieces.map((artPiece, idx) => (
                                    <tr key={idx}>
                                        <td>{artPiece.title}</td>
                                        <td>{artPiece.category}</td>
                                        <td>
                                            {new Date(
                                                artPiece.dateAdded
                                            ).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td>
                                            <Button
                                                variant="light"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(
                                                        `art-piece/${artPiece._id}`
                                                    )
                                                }
                                            >
                                                View
                                            </Button>{" "}
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(
                                                        `edit-art-piece/${artPiece._id}`
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>{" "}
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => {
                                                    setArtPiece(artPiece);
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
                    <Modal.Title>Delete Art Piece</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure you want to delete{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {artPiece?.title}
                        </span>
                        ?
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
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDeleteArtPiece}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
