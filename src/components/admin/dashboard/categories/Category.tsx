import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { CategoryService } from "services/category.service";

const categoryService = new CategoryService();

export const Category = () => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState<ICategoryResponse | undefined>();
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                <Col xs={4}>
                    <img
                        src={`/api${category?.image}`}
                        style={{ width: "100%", height: "auto" }}
                        alt=""
                    />
                </Col>
                <Col xs={4}>
                    <Row>
                        <Col xs={12} className="mb-0">
                            <h4>{category?.name}</h4>
                        </Col>
                        <Col xs={12} className="mb-3">
                            <div style={{ fontSize: "0.8rem", opacity: 0.5 }}>
                                Art Pieces: {category?.artPieces}
                            </div>
                        </Col>
                        <Col xs={12} className="mb-3">
                            <p>{category?.description}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
