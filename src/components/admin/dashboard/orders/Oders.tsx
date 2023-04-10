import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { PurchaseService } from "services/purchase.service";

const purchaseService = new PurchaseService();

export const Orders = () => {
    const [orders, setOrders] = useState<IPurchase[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<IPurchase>();
    const [showModal, setShowModal] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await purchaseService.getPurchases();
            if (response?.status === 200) {
                const data: IPurchase[] = response?.data;
                setOrders(data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (
        id: string,
        status: "pending" | "delivered"
    ) => {
        setStatusUpdate(true);
        try {
            const response = await purchaseService.updatePurchase(id, status);
            if (response?.status === 200) {
                getOrders();
                setShowModal(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setStatusUpdate(false);
        }
    };

    const handleOpenModal = (selectedOrder: IPurchase) => {
        setShowModal(true);
        setSelectedOrder(selectedOrder);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(undefined);
    };

    const handleCompleteDelivery = (
        id: string,
        status: "pending" | "delivered"
    ) => {
        updateStatus(id, status);
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center my-4">
                <Spinner animation="border" variant="secondary" />
            </div>
        );
    }

    return (
        <>
            <div>
                <h3 className="mb-4">Orders</h3>
                <Card>
                    <Card.Header>All Orders</Card.Header>
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
                                {orders.map((order, idx) => (
                                    <tr
                                        key={idx}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleOpenModal(order)}
                                    >
                                        <td>{`${order.user.firstName} ${order.user.lastName}`}</td>
                                        <td>{`$ ${order.amount / 100}`}</td>
                                        <td>
                                            {order.status === "delivered" ? (
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
                                                order.createdAt
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
            </div>

            <Modal
                show={showModal}
                onClose={handleCloseModal}
                onHide={handleCloseModal}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Row>
                            <Row className="mb-3">
                                <Col xs={3}>
                                    <b>Purchase Id</b>:
                                </Col>
                                <Col xs={9}>
                                    <div
                                        style={{
                                            width: "100%",
                                            overflowX: "scroll",
                                        }}
                                    >
                                        {selectedOrder?.purchaseId}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={3}>
                                    <b>User</b>:
                                </Col>
                                <Col xs={9}>
                                    {selectedOrder?.user.firstName}{" "}
                                    {selectedOrder?.user.lastName}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={3}>
                                    <b>Art Piece(s)</b>:
                                </Col>
                                <Col xs={9}>
                                    {selectedOrder?.cartItems.map(
                                        (item, idx) => (
                                            <div key={idx}>
                                                {item.artPiece.title} (
                                                <b>{item.quantity}</b>)
                                            </div>
                                        )
                                    )}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={3}>
                                    <b>Status</b>:
                                </Col>
                                <Col xs={9}>
                                    {selectedOrder?.status === "delivered" ? (
                                        <Badge bg="success">Delivered</Badge>
                                    ) : (
                                        <Badge bg="warning">Pending</Badge>
                                    )}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={3}>
                                    <b>Date Ordered</b>:
                                </Col>
                                <Col xs={9}>
                                    {selectedOrder &&
                                        new Date(
                                            selectedOrder.createdAt
                                        ).toLocaleDateString("us-EN", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                </Col>
                            </Row>
                            {selectedOrder?.status === "delivered" && (
                                <Row className="mb-3">
                                    <Col xs={3}>
                                        <b>Date Delivered</b>:
                                    </Col>
                                    <Col xs={9}>
                                        {selectedOrder &&
                                            new Date(
                                                selectedOrder.deliveryDate
                                            ).toLocaleDateString("us-EN", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                    </Col>
                                </Row>
                            )}
                        </Row>
                    </div>
                </Modal.Body>
                {selectedOrder?.status === "pending" && (
                    <Modal.Footer>
                        <div className="mx-3">
                            Click to signify completion of delivery:
                        </div>
                        <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                                handleCompleteDelivery(
                                    selectedOrder._id,
                                    "delivered"
                                )
                            }
                            disabled={statusUpdate}
                        >
                            Delivered
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
};
