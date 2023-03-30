import React from "react";
import { Routes, Route } from "react-router-dom";
import { AllArtPieces } from "./all-art-pieces/AllArtPieces";
import { SingleArtPiece } from "./single-art-piece/SingleArtPiece";

export const Shop = () => {
    return (
        <Routes>
            <Route path="/" element={<AllArtPieces />} />
            <Route path=":artPieceId" element={<SingleArtPiece />} />
        </Routes>
    );
};
