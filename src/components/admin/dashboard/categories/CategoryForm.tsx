import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AxiosResponse } from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export const CategoryForm = (props: Props) => {
    const { category, handleCancel, handleSubmit } = props;
    const initialValues: ICategoryDetails = category
        ? category
        : { name: "", description: "", image: null };

    const categoryValidationSchema = Yup.object({
        name: Yup.string().required("Name Is Required"),
        description: Yup.string().required("Description Is Required"),
        image: Yup.mixed().required("Image Is Required"),
    });

    const onSubmit = async (values: ICategoryDetails) => {
        if (handleSubmit) {
            try {
                const response = await handleSubmit(values);
                if (response?.status === 201) {
                    handleCancel?.();
                } else {
                    console.log(response?.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <Container className="py-2">
            <h3 className="mb-3">
                {category ? "Update Category" : "New Category"}
            </h3>
            <Formik
                initialValues={initialValues}
                validationSchema={categoryValidationSchema}
                onSubmit={onSubmit}
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
                        <div
                            className="pt-3 d-flex justify-content-end"
                            style={{
                                borderTop: "1px solid #dee2e6",
                                marginTop: "3rem",
                            }}
                        >
                            {handleCancel && (
                                <>
                                    <Button
                                        variant="secondary"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <span className="mx-1" />
                                </>
                            )}
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export interface ICategoryDetails {
    name: string;
    description: string;
    image: File | null;
}

interface Props {
    category?: ICategoryDetails;
    handleCancel?: () => void;
    handleSubmit?: (
        values: ICategoryDetails
    ) => Promise<AxiosResponse<any, any> | undefined>;
}
