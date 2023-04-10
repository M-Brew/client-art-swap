import React from "react";
import { Link } from "react-router-dom";
import "./artPiece.css";

export const ArtPiece = (props: IArtPiece) => {
    const { artPiece } = props;

    return (
        <div className="wrapper">
            <Link to={`/shop/${artPiece._id}`} className="link-style">
                <div
                    className="image-card"
                    style={{
                        backgroundImage: `url(/api${artPiece.image})`,
                    }}
                />
                <div className="text-wrapper">
                    <div className="card-name">{artPiece.title}</div>
                    <div className="card-price">
                        $ {artPiece.price.toFixed(2)}
                    </div>
                </div>
            </Link>
        </div>
    );
};

interface IArtPiece {
    artPiece: IArtPieceCard;
}
