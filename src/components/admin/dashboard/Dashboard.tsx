import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import axios from "axios";

import { Landing } from "./landing/Landing";
import { Categories } from "./categories/Categories";
import { ArtPieces } from "./art-pieces/ArtPieces";
import { Users } from "./users/Users";
import { Orders } from "./orders/Oders";
import { AuthService } from "services/auth.service";
import { AuthContext } from "contexts/AuthContext";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const authService = new AuthService();

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setLoggedIn, setUser } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const [current, setCurrent] = useState("dashboard");
  const [active, setActive] = useState("dashboard");
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(["dashboard"]);

  const createBreadcrumbs = (pathname: string) => {
    const items = pathname.split("/").slice(2);
    setBreadcrumbs(items);
    setActive(items.length > 1 ? items[1] : items[0]);
    setCurrent(items[items.length - 1]);
  };

  useEffect(() => {
    createBreadcrumbs(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    setActive(path);
    if (path === "dashboard") {
      navigate(".");
    } else {
      navigate(path);
    }
  };

  const handleLogOut = async () => {
    setLoggingOut(true);
    try {
      const response = await authService.signOut();
      if (response?.status === 204) {
        localStorage.clear();
        setLoggedIn?.(false);
        setUser?.(undefined);
      }
      setLoggingOut(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
      setLoggingOut(false);
    }
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="py-0"
      >
        <Container>
          <Navbar.Brand as={Link} to="/admin/dashboard">
            Art Swap
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ boxShadow: "none" }}
          >
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/dashboard/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/dashboard/art-pieces">
                Art Pieces
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/dashboard/users">
                Users
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-4">
                Welcome, {user?.userName}
              </Navbar.Text>
              <Nav.Link
                eventKey={2}
                disabled={loggingOut}
                onClick={handleLogOut}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="py-4 bg-dark text-white">
        <Container>
          <h3>Dashboard</h3>
        </Container>
      </div>

      <Container>
        <Breadcrumb className="bg-light my-2 px-3">
          {breadcrumbs.map((crumb, idx) => (
            <Breadcrumb.Item
              key={idx}
              style={{
                paddingTop: "5px",
                paddingBottom: "5px",
                textTransform: "capitalize",
              }}
              active={current === crumb}
              onClick={() => {
                if (crumb === "category" || crumb === "edit-category") {
                  return;
                } else {
                  handleNavigate(crumb);
                }
              }}
            >
              {crumb}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        <Row>
          <Col lg={3} className="mb-3">
            <ListGroup>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("dashboard")}
                active={active === "dashboard"}
                action
                variant="light"
              >
                Dashboard
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("categories")}
                active={active === "categories"}
                action
                variant="light"
              >
                Categories
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("art-pieces")}
                active={active === "art-pieces"}
                action
                variant="light"
              >
                Art Pieces
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("users")}
                active={active === "users"}
                action
                variant="light"
              >
                Users
              </ListGroup.Item>
              <ListGroup.Item
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("orders")}
                active={active === "orders"}
                action
                variant="light"
              >
                Orders
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={9} style={{ minHeight: "68vh" }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="categories/*" element={<Categories />} />
              <Route path="art-pieces/*" element={<ArtPieces />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
            </Routes>
          </Col>
        </Row>
      </Container>

      <div
        className="py-2 bg-light text-secondary mt-4 d-flex justify-content-center"
        style={{ bottom: 0, width: "100%" }}
      >
        <div>Copyright &copy; 2021. ArtSwap.</div>
      </div>
    </div>
  );
};
