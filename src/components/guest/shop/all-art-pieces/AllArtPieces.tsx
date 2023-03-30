import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArtPiece } from "../art-piece/ArtPiece";
import { CategoryService } from "services/category.service";

import "./allArtPieces.css";
import { ArtPieceService } from "services/artPiece.service";
import { Loading } from "components/sub-components/loading/Loading";
import BlobBackground from "components/sub-components/backgrounds/BlobBackground";

const categoryService = new CategoryService();
const artPieceService = new ArtPieceService();

export const AllArtPieces = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [artPieces, setArtPieces] = useState<IArtPieceCard[]>([]);
  const [loading, setLoading] = useState(false);

  const getArtPieces = async () => {
    try {
      const response = await artPieceService.getArtPieces();
      if (response?.status === 200) {
        const data: IArtPieceResponse[] = response?.data;
        const artPieces: IArtPieceCard[] = data.map((item) => ({
          _id: item._id,
          title: item.title,
          price: item.price,
          image: item.image,
        }));
        setArtPieces(artPieces);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response?.status === 200) {
        const data: ICategoryResponse[] = response?.data;
        const cats: ICategory[] = data.map((item) => ({
          _id: item._id,
          name: item.name,
          artPieces: item.artPieces,
        }));
        setCategories(cats);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
    getArtPieces();
  }, []);

  const getRelatedArtPieces = async (categoryId: string) => {
    setLoading(true);
    try {
      const response = await artPieceService.getCategoryArtPieces(categoryId);
      if (response?.status === 200) {
        const data: IArtPieceResponse[] = response?.data;
        const artPieces: IArtPieceCard[] = data.map((item) => ({
          _id: item._id,
          title: item.title,
          price: item.price,
          image: item.image,
        }));
        setArtPieces(artPieces);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* <div className="art-pieces-header">
        <div className="header-text">Shop</div>
        <div className="header-sub-text">ArtSwap</div>
      </div> */}
      <BlobBackground>
        <div className="header-text">Shop</div>
        <div className="header-sub-text">ArtSwap</div>
      </BlobBackground>
      <Container className="py-5">
        <Row>
          <Col xs={12} lg={3}>
            <h5>Categories</h5>
            <ul>
              <li className="category" onClick={() => getArtPieces()}>
                All
              </li>
              {categories.map((category, idx) => (
                <li
                  key={idx}
                  className="category"
                  onClick={() => getRelatedArtPieces(category._id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </Col>
          {loading ? (
            <Loading />
          ) : artPieces.length > 0 ? (
            <Col xs={12} lg={9}>
              <Row>
                {artPieces.map((artPiece, idx) => (
                  <Col key={idx} xs={12} md={4}>
                    <ArtPiece artPiece={artPiece} />
                  </Col>
                ))}
              </Row>
            </Col>
          ) : (
            <div className="empty">No art piece added yet</div>
          )}
        </Row>
      </Container>
    </div>
  );
};
