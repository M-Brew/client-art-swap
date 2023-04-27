import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";

import { ArtPieceService } from "services/artPiece.service";
import { CategoryService } from "services/category.service";

const artPieceService = new ArtPieceService();
const categoryService = new CategoryService();

export const ArtPiece = () => {
    const { artPieceId } = useParams();
    const [artPiece, setArtPiece] = useState<IArtPieceResponse | undefined>();
    const [category, setCategory] = useState<ICategoryResponse | undefined>();
    const [loading, setLoading] = useState(true);

    const getCategory = async (id: string) => {
        try {
            const response = await categoryService.getCategory(id);
            if (response?.status === 200) {
                const data: ICategoryResponse = response?.data;
                setCategory(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getArtPiece = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const response = await artPieceService.getArtPiece(id);
            if (response?.status === 200) {
                const data: IArtPieceResponse = response?.data;
                setArtPiece(data);
                getCategory(data.categoryId);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (artPieceId) {
            getArtPiece(artPieceId);
        }
    }, [artPieceId, getArtPiece]);

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
                        src={`/api${artPiece?.image}`}
                        style={{ width: "100%", height: "auto" }}
                        alt=""
                    />
                </Col>
                <Col xs={8}>
                    <Row>
                        <Col xs={12}>
                            <h4>{artPiece?.title}</h4>
                        </Col>
                        <Col
                            xs={12}
                            className="mb-3 d-flex justify-content-between"
                        >
                            <Badge pill bg="warning">
                                {category?.name}
                            </Badge>
                            <Badge bg="secondary">{artPiece?.year}</Badge>
                        </Col>
                        <Col xs={12}>
                            <div style={{ fontWeight: "bold" }}>Brief</div>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <p>{artPiece?.brief}</p>
                        </Col>
                        <Col xs={12}>
                            <div style={{ fontWeight: "bold" }}>Width</div>
                        </Col>
                        <Col xs={12} className="mb-2">
                            <div>{artPiece?.width}</div>
                        </Col>
                        <Col xs={12}>
                            <div style={{ fontWeight: "bold" }}>Height</div>
                        </Col>
                        <Col xs={3} className="mb-2">
                            <div>{artPiece?.height}</div>
                        </Col>
                        <Col xs={12}>
                            <div style={{ fontWeight: "bold" }}>Price</div>
                        </Col>
                        <Col xs={12}>
                            <div>GHC {artPiece?.price}</div>
                        </Col>
                        {/* <Col
                            xs={12}
                            className="d-flex justify-content-end mt-5"
                        >
                            <div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() =>
                                        navigate(
                                            `/admin/dashboard/art-pieces/edit-art-piece-${artPiece?._id}`
                                        )
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    style={{ marginLeft: 5 }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
