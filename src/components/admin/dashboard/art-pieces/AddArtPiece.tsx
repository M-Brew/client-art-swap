import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CategoryService } from "services/category.service";
import { ArtPieceService } from "services/artPiece.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categoryService = new CategoryService();
const artPieceService = new ArtPieceService();

export const AddArtPiece = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [errors, setErrors] = useState<string[] | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const initialValues: IArtPieceDetails = {
        title: "",
        category: "",
        brief: "",
        image: null,
        width: 0,
        height: 0,
        price: 0,
        year: 0,
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

    useEffect(() => {
        getCategories();
    }, []);

    const artPieceValidationSchema = Yup.object({
        title: Yup.string().required("Title Is Required"),
        category: Yup.string().required("Category Is Required"),
        brief: Yup.string().required("Brief Is Required"),
        image: Yup.mixed().required("Image Is Required"),
        width: Yup.number().required("Width Is Required"),
        height: Yup.number().required("Height Is Required"),
        price: Yup.number().required("Price Is Required"),
        year: Yup.number().required("Year Is Required"),
    });

    const onSubmit = async (values: IArtPieceDetails) => {
        try {
            setErrors(undefined);
            
            const response = await artPieceService.createArtPiece(values);

            if (response?.status === 201) {
                setSuccessMessage("art piece added successfully");
                setTimeout(() => {
                    setSuccessMessage(undefined);
                    navigate("/admin/dashboard/art-pieces");
                }, 2000);
            } else {
                console.log(response);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors(Object.values(error.response?.data));
            } else {
                console.log(error);
            }
        }
    };

    return (
        <Container className="py-2">
            <h3
                className="mb-4 pb-3"
                style={{
                    borderBottom: "1px solid #dee2e6",
                }}
            >
                New Art Piece
            </h3>
            <Formik
                initialValues={initialValues}
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
