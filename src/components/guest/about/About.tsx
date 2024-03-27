import React from "react";
import "./about.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

import { useMediaQuery } from "components/utils/media-query-hook/MediaQueryHook";
import starryNights from "../../../assets/starry-nights.jpg";
// import jacob from "../../../assets/jacob.jpeg";
// import paul from "../../../assets/paul.jpg";
// import patricia from "../../../assets/patricia.jpg";
// import jackson from "../../../assets/jackson.jpg";
// import samuel from "../../../assets/samuel.jpeg";
import exhibition7 from "../../../assets/exhibition-7.jpg";
import nirvana1 from "../../../assets/nirvana-1.jpg";
import occupiedSpace5 from "../../../assets/occupied-space-5.jpg";

export const About = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 990px)");

  // const team: ITeamMember[] = [
  //   { name: "Jacob A. Brew", role: "Director", image: jacob },
  //   { name: "Patricia Edwine-Poku", role: "Art Director", image: patricia },
  //   { name: "Paul Nsakie", role: "Lead Curator", image: paul },
  //   {
  //     name: "Emmanuel Jackson",
  //     role: "Communications & Marketing Lead",
  //     image: jackson,
  //   },
  //   { name: "Samuel Owusu", role: "Business Manager", image: samuel },
  // ];

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
            <span style={{ fontWeight: "bold" }}>
              &#x2022; Art Exhibitions
            </span>{" "}
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
          style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              height: "70vh",
              width: isMobile ? "80%" : isTablet ? "75%" : "70%",
              backgroundColor: "#f8f9fa",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundImage: `url(${starryNights})`,
            }}
          />
        </div>
        <div style={{ width: isMobile ? "80%" : isTablet ? "75%" : "40%" }}>
          <div
            style={{ textAlign: "center", fontWeight: "bold" }}
            className="my-4"
          >
            Starry Nights
          </div>
          <div style={{ textAlign: "center" }}>
            “The emotions are sometimes so strong that I work without knowing
            it. The strokes come like speech.” – Vincent Van Gogh
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
              <Col xs={12} md={5} className="mb-4">
                {/* <div
                  style={{
                    height: "50vh",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${nirvana1})`,
                  }}
                /> */}
                <img
                  src={nirvana1}
                  alt="exhibition"
                  width={"100%"}
                  height="auto"
                  style={{ borderRadius: "5px" }}
                />
              </Col>
              <Col xs={12} md={{ span: 6, offset: 1 }}>
                <div
                  style={{ textAlign: "start", fontWeight: "bold" }}
                  className="mb-2"
                >
                  NIRVANA ART EXHIBITION
                  <br />
                  Venue : Open house studio, Dzorwulu - Accra
                  <br />
                  Date : 18th - 20th Dec 2020
                </div>
                <div style={{ textAlign: "start", fontSize: "1rem" }}>
                  "The goal for people changed, especially in the aftermath of a
                  very traumatic COVID year in Ghana, people were yearning to
                  reach transcendent states where uneasiness is released and
                  replaced with positive human experiences." The exhibition
                  which is titled "NIRVANA" explored this idea to deliberately
                  entice audiences to introspect, examine one's own mental and
                  emotional processes, to achieve a new state and form of joy
                  and peace. The works of art showcased the dynamic sense of
                  being and living.
                </div>
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  className="mt-2"
                >
                  more{" "}
                  <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
                </div>
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: "3rem" }}>
            <Row>
              <Col xs={12} md={6}>
                <div
                  style={{ textAlign: "start", fontWeight: "bold" }}
                  className="mb-2"
                >
                  FANTASM ART EXHIBITION <br />
                  Venue : BuroGhana, Osu <br />
                  Date : 24th Feb. 2023
                </div>
                <div style={{ textAlign: "start", fontSize: "1rem" }}>
                  An arts exhibition featuring artists from multidisciplinary
                  artistic practices. This exhibition takes the form of canvas
                  painting, photography, mixed media and digital arts. In a room
                  full of different representations of art, the art exhibition
                  brings us close through the spheres of the artist's
                  imaginations with each unique view.
                </div>
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  className="mt-2"
                >
                  more{" "}
                  <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
                </div>
              </Col>
              <Col xs={12} md={{ span: 5, offset: 1 }} className="mt-4">
                {/* <div
                  style={{
                    height: "40vh",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${exhibition7})`,
                  }}
                /> */}
                <img
                  src={exhibition7}
                  alt="exhibition"
                  width={"100%"}
                  height="auto"
                  style={{ borderRadius: "5px" }}
                />
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col xs={12} md={5} className="mb-4">
                {/* <div
                  style={{
                    height: "50vh",
                    width: "100%",
                    backgroundColor: "#f8f9fa",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `url(${occupiedSpace5})`,
                  }}
                /> */}
                <img
                  src={occupiedSpace5}
                  alt="exhibition"
                  width={"100%"}
                  height="auto"
                  style={{ borderRadius: "5px" }}
                />
              </Col>
              <Col xs={12} md={{ span: 6, offset: 1 }}>
                <div
                  style={{ textAlign: "start", fontWeight: "bold" }}
                  className="mb-2"
                >
                  OCCUPIED SPACE ART EXHIBITION
                  <br />
                  Venue : Open house studio, Dzorwulu - Accra
                  <br />
                  Date : 18th - 20th Dec 2020
                </div>
                <div style={{ textAlign: "start", fontSize: "1rem" }}>
                  This exhibition presented selected works from artists from
                  West Africa. These new works were developed in the aftermath
                  of the lockdown after life had come back to a "semi-normal"
                  state during which these artists used their art practice to
                  recuperate mentally and professionally. The artists existed to
                  own the new found space and exist in the now and move
                  according to these new principles. The exhibition which is
                  titled "OCCUPIED SPACE" however explores the idea of taking
                  back control of that lost period of time and space, and
                  adapting collectively in the current socioeconomic climate.
                </div>
                <div
                  style={{
                    textAlign: "start",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  className="mt-2"
                >
                  more{" "}
                  <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {/* <div
        style={{
          padding: "4rem 0",
        }}
      >
        <Container>
          <div style={{ marginBottom: "3rem" }}>
            <h3>The Team</h3>
          </div>
          <div className="grid-container">
            <div
              className="grid-item grid-item-1 image-item"
              style={{
                backgroundImage: `url(${team[0].image})`,
                position: "relative",
              }}
            >
              <div className="member-card">
                <h4>{team[0].name}</h4>
                <div>({team[0].role})</div>
              </div>
            </div>
            <div
              className="grid-item grid-item-2 image-item"
              style={{
                backgroundImage: `url(${team[1].image})`,
                position: "relative",
              }}
            >
              <div className="member-card">
                <h4>{team[1].name}</h4>
                <div>({team[1].role})</div>
              </div>
            </div>
            <div
              className="grid-item grid-item-3 image-item"
              style={{
                backgroundImage: `url(${team[2].image})`,
                position: "relative",
              }}
            >
              <div className="member-card">
                <h4>{team[2].name}</h4>
                <div>({team[2].role})</div>
              </div>
            </div>
            <div
              className="grid-item grid-item-4 image-item"
              style={{
                backgroundImage: `url(${team[3].image})`,
                position: "relative",
              }}
            >
              <div className="member-card">
                <h4>{team[3].name}</h4>
                <div>({team[3].role})</div>
              </div>
            </div>
            <div
              className="grid-item grid-item-5 image-item"
              style={{
                backgroundImage: `url(${team[4].image})`,
                position: "relative",
              }}
            >
              <div className="member-card">
                <h4>{team[4].name}</h4>
                <div>({team[4].role})</div>
              </div>
            </div>
            <div className="grid-item grid-item-6 image-item"></div>
          </div>
        </Container>
      </div> */}
    </div>
  );
};

// interface ITeamMember {
//   name: string;
//   role: string;
//   image: string;
// }
