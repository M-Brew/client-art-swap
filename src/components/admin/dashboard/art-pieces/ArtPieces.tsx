import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AddArtPiece } from './AddArtPiece';
import { AllArtPieces } from './AllArtPieces';
import { ArtPiece } from './ArtPiece';
import { EditArtPiece } from './EditArtPiece';

export const ArtPieces = () => {
    return (
        <Routes>
            <Route path="/" element={<AllArtPieces />} />
            <Route path="art-piece/:artPieceId" element={<ArtPiece />} />
            <Route path="add-art-piece" element={<AddArtPiece />} />
            <Route path="edit-art-piece/:artPieceId" element={<EditArtPiece />} />
        </Routes>
    )
}