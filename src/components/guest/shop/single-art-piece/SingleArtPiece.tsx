import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { AddToCartButton } from "../add-to-cart/AddToCart";
import { Loading } from "components/sub-components/loading/Loading";
import { ArtPieceService } from "services/artPiece.service";
import { RelatedArtPieces } from "../related-art-pieces/RelatedArtPieces";

import "./singleArtPiece.css";

const artPieceService = new ArtPieceService();

export const SingleArtPiece = () => {
    const { artPieceId } = useParams();
    const navigate = useNavigate();
    const [artPiece, setArtPiece] = useState<IArtPieceResponse | undefined>();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<INewSize>();
    const [sizes, setSizes] = useState<INewSize[]>([]);

    const getArtPiece = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const response = await artPieceService.getArtPiece(id);
            if (response?.status === 200) {
                const data: IArtPieceResponse = response?.data;
                setArtPiece(data);
                setSizes([
                    {
                        id: "0",
                        width: data.width,
                        height: data.height,
                        price: data.price,
                    },
                    ...(data.otherSizes ?? []),
                ]);
                setSelectedSize({
                    id: "0",
                    width: data.width,
                    height: data.height,
                    price: data.price,
                });
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
        return <Loading />;
    }

    return (
        <div>
            <div className="header">{artPiece?.title}</div>
            <Container>
                <Row className="mb-5">
                    <Col xs={12} className="my-3">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(-1)}
                        />
                    </Col>
                    <Col xs={12} md={6} lg={4} className="mb-3">
                        <img
                            src={`/api${artPiece?.image}`}
                            alt="art-piece"
                            width="100%"
                            height="auto"
                        />
                    </Col>
                    <Col xs={12} md={6} lg={8}>
                        <div className="mb-4">
                            <div className="mb-2" style={{ fontSize: "1rem" }}>
                                Brief
                            </div>
                            <div className="text">{artPiece?.brief}</div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-2" style={{ fontSize: "1rem" }}>
                                Size
                            </div>
                            {sizes.map((size, idx) => (
                                <Form.Check
                                    key={idx}
                                    className="text"
                                    label={
                                        <div>
                                            Width: {size.width} | Height:{" "}
                                            {size.height}
                                        </div>
                                    }
                                    checked={
                                        selectedSize
                                            ? selectedSize.id === size.id
                                            : false
                                    }
                                    onChange={() => setSelectedSize(size)}
                                />
                            ))}
                        </div>
                        <div className="mb-3">
                            <div className="mb-2" style={{ fontSize: "1rem" }}>
                                Cost
                            </div>
                            <div className="price">
                                GHC {selectedSize?.price.toFixed(2)}
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="mb-2" style={{ fontSize: "1rem" }}>
                                Quantity
                            </div>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Number.parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div className="button-container">
                            <span>
                                {artPiece && (
                                    <AddToCartButton
                                        artPiece={artPiece}
                                        quantity={quantity}
                                        size={selectedSize?.id}
                                    />
                                )}
                            </span>
                        </div>
                    </Col>
                </Row>
                {artPiece && artPiece.categoryId && (
                    <RelatedArtPieces
                        categoryId={artPiece.categoryId}
                        artPieceId={artPiece._id}
                    />
                )}
            </Container>
        </div>
    );
};
