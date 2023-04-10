import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useMediaQuery } from "components/utils/media-query-hook/MediaQueryHook";

export const About = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 990px)");
  const image =
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80";

  return (
    <div>
      <div
        style={{
          padding: "4rem 0",
          backgroundColor: "whitesmoke",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h3>About ArtSwap</h3>
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <p style={{ width: isMobile ? "80%" : isTablet ? "75%" : "60%" }}>
            ArtSwap Ltd. is an organisation that thrives on the promotion and
            business of arts and craft of Visual Artists. <br />
            What we do includes:{" "}
            <span style={{ fontWeight: "bold" }}>&#x2022; Art Exhibitions</span>{" "}
            <span style={{ fontWeight: "bold" }}>&#x2022; Art Sales</span>{" "}
            <span style={{ fontWeight: "bold" }}>&#x2022; Art Rentals</span>{" "}
            <span style={{ fontWeight: "bold" }}>&#x2022; Art Auctions</span>{" "}
            <br />
            Our goals is to promote the creative sectors and business sectors in
            the art scenery in Ghana and Africa at large. We give platforms to
            visual artists to display their unique art works and provide our
            clients and art collectors with unique artworks from vibrant and
            promising artists in Africa.
          </p>
        </div>
      </div>
      <div
        style={{
          padding: "4rem 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              height: "40vh",
              width: isMobile ? "80%" : isTablet ? "75%" : "70%",
              backgroundColor: "#f8f9fa",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: `url(${image})`,
            }}
          />
        </div>
        <div style={{ width: isMobile ? "80%" : isTablet ? "75%" : "70%" }}>
          <div
            style={{ textAlign: "center", fontWeight: "bold" }}
            className="my-4"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            error.
          </div>
          <div style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            veniam culpa doloremque laborum repellendus sit fugiat beatae,
            consequuntur tempore illum. Deleniti explicabo harum perferendis
            porro expedita consequuntur veritatis doloremque obcaecati illum
            reiciendis aliquam ab maxime nihil autem deserunt voluptas voluptate
            quis mollitia, ullam, incidunt animi amet. Quidem quisquam autem
            minus tenetur quae, accusantium molestias aperiam maiores porro, a
            numquam nemo explicabo animi recusandae aliquam asperiores. Quo
            beatae eum optio libero?
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "4rem 0",
          backgroundColor: "whitesmoke",
        }}
      >
        <Container>
          <div style={{ marginBottom: "3rem" }}>
            <h3>Exhibitions</h3>
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <Row>
              <Col xs={12} md={5}>
                <div
                  style={{
                    height: "40vh",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${image})`,
                  }}
                />
              </Col>
              <Col xs={12} md={{ span: 6, offset: 1 }}>
                <div
                  style={{ textAlign: "start", fontWeight: "bold" }}
                  className="my-4"
                >
                  Exclusive Exhibition
                </div>
                <div style={{ textAlign: "start" }}>
                  Deleniti explicabo harum perferendis porro expedita
                  consequuntur veritatis doloremque obcaecati illum reiciendis
                  aliquam ab maxime nihil autem deserunt voluptas voluptate quis
                  mollitia, ullam, incidunt animi amet. Quidem quisquam autem
                  minus tenetur quae, accusantium molestias aperiam maiores
                  porro, a numquam nemo explicabo animi recusandae aliquam
                  asperiores. Quo beatae eum optio libero?
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xs={12} md={6}>
                <div
                  style={{ textAlign: "start", fontWeight: "bold" }}
                  className="my-4"
                >
                  Other Exclusive Exhibition
                </div>
                <div style={{ textAlign: "start" }}>
                  Deleniti explicabo harum perferendis porro expedita
                  consequuntur veritatis doloremque obcaecati illum reiciendis
                  aliquam ab maxime nihil autem deserunt voluptas voluptate quis
                  mollitia, ullam, incidunt animi amet. Quidem quisquam autem
                  minus tenetur quae, accusantium molestias aperiam maiores
                  porro, a numquam nemo explicabo animi recusandae aliquam
                  asperiores. Quo beatae eum optio libero?
                </div>
              </Col>
              <Col xs={12} md={{ span: 5, offset: 1 }}>
                <div
                  style={{
                    height: "40vh",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${image})`,
                  }}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div
        style={{
          padding: "4rem 0",
        }}
      >
        <Container>
          <div style={{ marginBottom: "3rem" }}>
            <h3>Partners</h3>
          </div>
          <Row>
            <Col xs={6} md={4} lg={3}>
              <div
                style={{
                  height: "20vh",
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundImage: `url(${image})`,
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col xs={6} md={4} lg={3}>
              <div
                style={{
                  height: "20vh",
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundImage: `url(${image})`,
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col xs={6} md={4} lg={3}>
              <div
                style={{
                  height: "20vh",
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundImage: `url(${image})`,
                  borderRadius: "5px",
                }}
              />
            </Col>
            <Col xs={6} md={4} lg={3}>
              <div
                style={{
                  height: "20vh",
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundImage: `url(${image})`,
                  borderRadius: "5px",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
