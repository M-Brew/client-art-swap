import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faFileImage,
    faListAlt,
} from "@fortawesome/free-solid-svg-icons";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";

import { DashboardService } from "services/dashboard.service";

const dashboardService = new DashboardService();

export const Landing = () => {
    const [dashboardData, setDashboardData] = useState<
        IDashboardData | undefined
    >();
    const [loading, setLoading] = useState(true);

    const getDashboardData = async () => {
        setLoading(true);
        try {
            const response = await dashboardService.getData();
            if (response?.status === 200) {
                const data: IDashboardData = response?.data;
                setDashboardData(data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    return (
        <div>
            <Card className="mb-4">
                <Card.Header>Website Overview</Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} md={6} lg={4} className="mb-3">
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div
                                            style={{
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            Categories
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            {dashboardData?.categories ?? 0}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FontAwesomeIcon
                                            icon={faListAlt}
                                            size="4x"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} lg={4} className="mb-3">
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div
                                            style={{
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            Art Pieces
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            {dashboardData?.artPieces ?? 0}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FontAwesomeIcon
                                            icon={faFileImage}
                                            size="4x"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                            <Card style={{ width: "100%" }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div
                                            style={{
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            Users
                                        </div>
                                        <div
                                            style={{
                                                fontSize: "1.3rem",
                                            }}
                                        >
                                            {dashboardData?.users ?? 0}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <FontAwesomeIcon
                                            icon={faUsers}
                                            size="4x"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Header>Latest Users</Card.Header>
                <Card.Body>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData?.latestUsers.map((user, idx) => (
                                <tr key={idx}>
                                    <td>{`${user.firstName} ${user.lastName}`}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString("us-EN", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header>Recent Orders</Card.Header>
                <Card.Body>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Delivery Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData?.latestPurchases.map(
                                (purchase, idx) => (
                                    <tr key={idx}>
                                        <td>{`${purchase.user.firstName} ${purchase.user.lastName}`}</td>
                                        <td>{`GHC ${purchase.amount / 100}`}</td>
                                        <td>
                                            {purchase.status === "delivered" ? (
                                                <Badge bg="success">
                                                    Delivered
                                                </Badge>
                                            ) : (
                                                <Badge bg="warning">
                                                    Pending
                                                </Badge>
                                            )}
                                        </td>
                                        <td>
                                            {new Date(
                                                purchase.createdAt
                                            ).toLocaleDateString("us-EN", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};
