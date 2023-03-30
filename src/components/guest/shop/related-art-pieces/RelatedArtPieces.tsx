import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArtPieceService } from "services/artPiece.service";
import { ArtPiece } from "../art-piece/ArtPiece";

const artPieceService = new ArtPieceService();

export const RelatedArtPieces = (props: IRelatedArtPieces) => {
    const { categoryId, artPieceId } = props;
    const [artPieces, setArtPieces] = useState<IArtPieceCard[]>([]);

    const getRelatedArtPieces = useCallback(async () => {
        try {
            const response = await artPieceService.getCategoryArtPieces(
                categoryId
            );
            if (response?.status === 200) {
                const data: IArtPieceResponse[] = response?.data;
                const artPieces: IArtPieceCard[] = data.map((item) => ({
                    _id: item._id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                }));
                const filtered = artPieces.filter((art) => art._id !== artPieceId);
                if (filtered.length > 4) {
                    setArtPieces(filtered.slice(0, 3));
                } else {
                    setArtPieces(filtered);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }, [categoryId, artPieceId]);

    useEffect(() => {
        getRelatedArtPieces();
    }, [getRelatedArtPieces]);

    if (artPieces.length < 1) {
        return <div />;
    }

    return (
        <div>
            <hr className="my-5" />
            <h4>Related Art Pieces</h4>
            <Row className="my-5">
                {artPieces.map((artPiece, idx) => (
                    <Col key={idx} xs={12} md={4} lg={3}>
                        <ArtPiece artPiece={artPiece} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

interface IRelatedArtPieces {
    categoryId: string;
    artPieceId: string;
}
