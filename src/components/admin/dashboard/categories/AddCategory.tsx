import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { CategoryService } from "services/category.service";

const categoryService = new CategoryService();

export const AddCategory = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string[] | undefined>();
    const [successMessage, setSuccessMessage] = useState<string | undefined>();
    const initialValues: ICategoryDetails = {
        name: "",
        description: "",
        image: null,
    };

    const categoryValidationSchema = Yup.object({
        name: Yup.string().required("Name Is Required"),
        description: Yup.string().required("Description Is Required"),
        image: Yup.mixed().required("Image Is Required"),
    });

    const handleSubmit = async (values: ICategoryDetails) => {
        try {
            setErrors(undefined);

            const response = await categoryService.createCategory(values);

            if (response?.status === 201) {
                setSuccessMessage("category created successfully");
                setTimeout(() => {
                    setSuccessMessage(undefined);
                    navigate("/admin/dashboard/categories");
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
        <div>
            <h3
                className="mb-4 pb-3"
                style={{
                    borderBottom: "1px solid #dee2e6",
                }}
            >
                New Category
            </h3>
            <Formik
                initialValues={initialValues}
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
                            <Button type="submit" variant="dark">Submit</Button>
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
