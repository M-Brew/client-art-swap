import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { CategoryService } from "services/category.service";
import { ArtPieceService } from "services/artPiece.service";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";

const categoryService = new CategoryService();
const artPieceService = new ArtPieceService();

export const EditArtPiece = () => {
    const navigate = useNavigate();
    const { artPieceId } = useParams();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [artPiece, setArtPiece] = useState<IArtPieceResponse>();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>();
    const [successMessage, setSuccessMessage] = useState<string>();
    const [otherSizes, setOtherSizes] = useState<INewSize[]>([]);

    const getArtPiece = async (id: string) => {
        setLoading(true);
        try {
            const response = await artPieceService.getArtPiece(id);
            if (response?.status === 200) {
                const data: IArtPieceResponse = response?.data;
                setArtPiece(data);
                if (data.otherSizes) {
                    setOtherSizes(data.otherSizes);
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

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

    const handleAddAnotherSize = () => {
        const id = otherSizes.length === 0 ? 1 : otherSizes.length + 1;
        setOtherSizes([
            ...otherSizes,
            { id: id.toString(), width: 0, height: 0, price: 0 },
        ]);
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (artPieceId) {
            getArtPiece(artPieceId);
        }
    }, [artPieceId]);

    const artPieceValidationSchema = Yup.object({
        title: Yup.string().required("Title Is Required"),
        category: Yup.string().required("Category Is Required"),
        brief: Yup.string().required("Brief Is Required"),
        width: Yup.number().required("Width Is Required"),
        height: Yup.number().required("Height Is Required"),
        price: Yup.number().required("Price Is Required"),
        year: Yup.number().required("Year Is Required"),
    });

    const handleDeleteSize = (id: string) => {
        const update = otherSizes.filter((size) => size.id !== id);
        setOtherSizes(update);
    };

    const handleUpdateSize = (
        id: string,
        name: "width" | "height" | "price",
        value: number
    ) => {
        const update = otherSizes.map((size) =>
            size.id === id ? { ...size, [name]: value } : size
        );
        setOtherSizes(update);
    };

    const onSubmit = async (values: IArtPieceDetails) => {
        try {
            setErrors(undefined);

            if (artPiece) {
                const response = await artPieceService.updateArtPiece(
                    artPiece._id,
                    { ...values, otherSizes }
                );

                if (response?.status === 200) {
                    setSuccessMessage("art piece updated successfully");
                    setTimeout(() => {
                        setSuccessMessage(undefined);
                        navigate("/admin/dashboard/art-pieces");
                    }, 2000);
                } else {
                    console.log(response);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(Object.values(error.response?.data));
            } else {
                console.log(error);
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    return (
        <Container className="py-2">
            <h3
                className="mb-4 pb-3"
                style={{
                    borderBottom: "1px solid #dee2e6",
                }}
            >
                Edit Art Piece
            </h3>
            <Formik
                initialValues={{
                    title: artPiece?.title ?? "",
                    category: artPiece?.categoryId ?? "",
                    brief: artPiece?.brief ?? "",
                    image: null,
                    width: artPiece?.width ?? 0,
                    height: artPiece?.height ?? 0,
                    price: artPiece?.price ?? 0,
                    year: artPiece?.year ?? 0,
                }}
                validationSchema={artPieceValidationSchema}
                onSubmit={onSubmit}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <Row>
                            <Col xs="12">
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        value={props.values.title}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.title &&
                                            !!props.errors.title
                                        }
                                    />
                                    {props.touched.title &&
                                        !!props.errors.title && (
                                            <small className="text-danger p-2">
                                                {props.errors.title}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="12">
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        name="category"
                                        value={props.values.category}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.category &&
                                            !!props.errors.category
                                        }
                                    >
                                        <option>Select Category</option>
                                        {categories.map((category, idx) => (
                                            <option
                                                key={idx}
                                                value={category._id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {props.touched.category &&
                                        !!props.errors.category && (
                                            <small className="text-danger p-2">
                                                {props.errors.category}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="12">
                                <Form.Group className="mb-3">
                                    <Form.Label>Brief</Form.Label>
                                    <Form.Control
                                        name="brief"
                                        type="text"
                                        placeholder="Brief"
                                        as="textarea"
                                        rows={3}
                                        value={props.values.brief}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.brief &&
                                            !!props.errors.brief
                                        }
                                    />
                                    {props.touched.brief &&
                                        !!props.errors.brief && (
                                            <small className="text-danger p-2">
                                                {props.errors.brief}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="12">
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        name="image"
                                        type="file"
                                        accept="image/jpeg, image/jpg, image/png"
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            props.setFieldValue(
                                                "image",
                                                event.currentTarget.files?.[0]
                                            );
                                        }}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.image &&
                                            !!props.errors.image
                                        }
                                    />
                                    {props.touched.image &&
                                        !!props.errors.image && (
                                            <small className="text-danger p-2">
                                                {props.errors.image}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Width</Form.Label>
                                    <Form.Control
                                        name="width"
                                        type="number"
                                        placeholder="Width"
                                        value={props.values.width}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.width &&
                                            !!props.errors.width
                                        }
                                        className="w-100"
                                    />
                                    {props.touched.width &&
                                        !!props.errors.width && (
                                            <small className="text-danger p-2">
                                                {props.errors.width}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Height</Form.Label>
                                    <Form.Control
                                        name="height"
                                        type="number"
                                        placeholder="Height"
                                        value={props.values.height}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.height &&
                                            !!props.errors.height
                                        }
                                        className="w-100"
                                    />
                                    {props.touched.height &&
                                        !!props.errors.height && (
                                            <small className="text-danger p-2">
                                                {props.errors.height}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        name="price"
                                        type="number"
                                        placeholder="Price"
                                        value={props.values.price}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.price &&
                                            !!props.errors.price
                                        }
                                        className="w-100"
                                    />
                                    {props.touched.price &&
                                        !!props.errors.price && (
                                            <small className="text-danger p-2">
                                                {props.errors.price}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                            <Col xs="6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                        name="year"
                                        type="number"
                                        placeholder="Year"
                                        value={props.values.year}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        isInvalid={
                                            props.touched.year &&
                                            !!props.errors.year
                                        }
                                        className="w-100"
                                    />
                                    {props.touched.year &&
                                        !!props.errors.year && (
                                            <small className="text-danger p-2">
                                                {props.errors.year}
                                            </small>
                                        )}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            {otherSizes.map((size, idx) => (
                                <Col xs={12} key={idx}>
                                    <AddNewSize
                                        details={{
                                            id: size.id,
                                            width: size.width,
                                            height: size.height,
                                            price: size.price,
                                        }}
                                        onDelete={handleDeleteSize}
                                        onUpdate={handleUpdateSize}
                                    />
                                </Col>
                            ))}
                            <Col className="mt-3" xs="12">
                                <Button
                                    variant="light"
                                    onClick={handleAddAnotherSize}
                                >
                                    Add Another Size
                                </Button>
                            </Col>
                        </Row>

                        <div
                            className="pt-3 d-flex justify-content-end"
                            style={{
                                borderTop: "1px solid #dee2e6",
                                marginTop: "3rem",
                            }}
                        >
                            <Button type="submit" variant="dark">
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            {successMessage && (
                <Alert
                    className="mt-4 text-center text-small p-0"
                    variant="success"
                >
                    <small style={{ textTransform: "capitalize" }}>
                        {successMessage}
                    </small>
                </Alert>
            )}
            {errors && (
                <Alert
                    className="mt-4 text-center text-small p-0"
                    variant="danger"
                >
                    {errors.map((error, idx) => (
                        <span key={idx}>
                            <small style={{ textTransform: "capitalize" }}>
                                {error}
                            </small>
                            <br />
                        </span>
                    ))}
                </Alert>
            )}
        </Container>
    );
};

const AddNewSize = (props: IAddNewSize) => {
    const [newSize, setNewSize] = useState<INewSize>(props.details);

    useEffect(() => {
        setNewSize(props.details);
    }, [props.details]);

    const handleDelete = () => {
        props.onDelete(newSize.id);
    };

    return (
        <Row>
            <Col xs={12} lg={2}>
                <div className="mb-4">
                    <b>Other Size</b>
                </div>
            </Col>
            <Col xs={12} lg={10}>
                <Row>
                    <Col xs="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Width</Form.Label>
                            <Form.Control
                                name="width"
                                type="number"
                                placeholder="Width"
                                value={newSize.width}
                                onChange={(e) => {
                                    props.onUpdate(
                                        newSize.id,
                                        "width",
                                        Number.parseFloat(e.target.value)
                                    );
                                }}
                                className="w-100"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                name="height"
                                type="number"
                                placeholder="Height"
                                value={newSize.height}
                                onChange={(e) => {
                                    props.onUpdate(
                                        newSize.id,
                                        "height",
                                        Number.parseFloat(e.target.value)
                                    );
                                }}
                                className="w-100"
                            />
                        </Form.Group>
                    </Col>
                    <Col xs="6">
                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name="price"
                                type="number"
                                placeholder="Price"
                                value={newSize.price}
                                onChange={(e) => {
                                    props.onUpdate(
                                        newSize.id,
                                        "price",
                                        Number.parseFloat(e.target.value)
                                    );
                                }}
                                className="w-100"
                            />
                        </Form.Group>
                    </Col>
                    <Col
                        xs="6"
                        style={{
                            display: "flex",
                            alignItems: "end",
                            paddingBottom: "1rem",
                        }}
                    >
                        <Button
                            variant="light"
                            size="sm"
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faCancel} className="mx-2" />{" "}
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

interface IAddNewSize {
    details: INewSize;
    onDelete: (id: string) => void;
    onUpdate: (
        id: string,
        name: "width" | "height" | "price",
        value: number
    ) => void;
}
