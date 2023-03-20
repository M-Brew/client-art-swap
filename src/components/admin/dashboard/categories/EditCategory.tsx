import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { CategoryService } from "services/category.service";

const categoryService = new CategoryService();

export const EditCategory = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [category, setCategory] = useState<ICategoryResponse | undefined>();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[] | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();

    const getCategory = async (id: string) => {
        setLoading(true);
        try {
            const response = await categoryService.getCategory(id);
            if (response?.status === 200) {
                const data: ICategoryResponse = response?.data;
                setCategory(data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (categoryId) {
            getCategory(categoryId);
        }
    }, [categoryId]);

    const categoryValidationSchema = Yup.object({
        name: Yup.string().required("Name Is Required"),
        description: Yup.string().required("Description Is Required"),
        image: Yup.mixed().required("Image Is Required"),
    });

    const handleSubmit = async (values: ICategoryDetails) => {
        try {
            setErrors(undefined);

            if (category) {
                const response = await categoryService.updateCategory(
                    category._id,
                    values
                );
                if (response?.status === 200) {
                    setSuccessMessage("category updated successfully");
                    setTimeout(() => {
                        setSuccessMessage(undefined);
                        navigate("/admin/dashboard/categories");
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
        <div>
            <h3
                className="mb-4 pb-3"
                style={{
                    borderBottom: "1px solid #dee2e6",
                }}
            >
                Edit Category
            </h3>
            <Formik
                initialValues={{
                    name: category?.name ?? "",
                    description: category?.description ?? "",
                    image: null,
                }}
                validationSchema={categoryValidationSchema}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                placeholder="Name"
                                value={props.values.name}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                isInvalid={
                                    props.touched.name && !!props.errors.name
                                }
                            />
                            {props.touched.name && !!props.errors.name && (
                                <small className="text-danger p-2">
                                    {props.errors.name}
                                </small>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                type="text"
                                placeholder="Description"
                                value={props.values.description}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                isInvalid={
                                    props.touched.description &&
                                    !!props.errors.description
                                }
                            />
                            {props.touched.description &&
                                !!props.errors.description && (
                                    <small className="text-danger p-2">
                                        {props.errors.description}
                                    </small>
                                )}
                        </Form.Group>
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
                                    props.touched.image && !!props.errors.image
                                }
                            />
                            {props.touched.image && !!props.errors.image && (
                                <small className="text-danger p-2">
                                    {props.errors.image}
                                </small>
                            )}
                        </Form.Group>
                        <div className="pt-3 d-flex justify-content-end">
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
        </div>
    );
};

export interface ICategoryDetails {
    name: string;
    description: string;
    image: File | null;
}
