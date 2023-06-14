import { CartContext } from "contexts/CartContext";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import "./cart.css";
import { useMediaQuery } from "components/utils/media-query-hook/MediaQueryHook";
import { CheckoutService } from "services/checkout.service";
import { AuthContext } from "contexts/AuthContext";
import { usePaystackPayment } from "react-paystack";

const checkoutService = new CheckoutService();

const InitializePaystackPayment = (props: {
  config: any;
  checkingOut: boolean;
  onSuccess: () => void;
  onClose: () => void;
}) => {
  const { config, checkingOut, onSuccess, onClose } = props;

  const initializePayment = usePaystackPayment({ ...config, currency: "GHS" });

  return (
    <Button
      variant="success"
      onClick={() => initializePayment(onSuccess, onClose)}
      disabled={checkingOut}
    >
      {checkingOut ? <Spinner animation="border" size="sm" /> : "Pay"}
    </Button>
  );
};

export const Cart = () => {
  const { loggedIn } = useContext(AuthContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  let navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 480px)");
  const [reference, setReference] = useState<string>();
  const [paystackOptions, setPaystackOptions] = useState<IPaystackOptions>({
    publicKey: "",
    email: "",
    amount: 0,
    reference: "",
  });
  const [checkingOut, setCheckingOut] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    navigate("/shop");
  };

  const removeFromCart = (id: string) => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      const existingItems = JSON.parse(cartItems) as ICartItem[];
      const update = existingItems.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(update));
      setCartItems?.(update);
    }
  };

  const emptyCart = () => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify([]));
      setCartItems?.([]);
    }
  };

  const getTotal = () => {
    let total = 0;

    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].price * cartItems[i].quantity;
      }
    }

    return total;
  };

  const handleSuccess = async () => {
    try {
      if (reference && cartItems) {
        const items: {
          id: string;
          quantity: number;
          selectedSizeId?: string;
        }[] = [];

        for (const item of cartItems) {
          items.push({
            id: item.id,
            quantity: item.quantity,
            selectedSizeId: item.selectedSizeId,
          });
        }

        const response = await checkoutService.verify(reference, items);
        if (response?.status === 200) {
          setReference(undefined);
          setCheckingOut(false);
          setShowModal(false);
          navigate("/checkout-successful");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setCheckingOut(false);
    setShowModal(false);
  };

  const handleCheckOut = async () => {
    try {
      if (cartItems) {
        setCheckingOut(true);
        const ref = new Date().getTime().toString();
        setReference(ref);

        const items: {
          id: string;
          quantity: number;
          selectedSizeId?: string;
        }[] = [];
        for (const item of cartItems) {
          items.push({
            id: item.id,
            quantity: item.quantity,
            selectedSizeId: item.selectedSizeId,
          });
        }

        const response = await checkoutService.checkout({ items });
        if (response?.status === 200) {
          const paymentData: {
            publicKey: string;
            email: string;
            amount: number;
          } = response.data;

          const options: IPaystackOptions = {
            ...paymentData,
            reference: ref,
          };
          setPaystackOptions(options);

          setCheckingOut(false);
          setShowModal(true);
        }
      }
    } catch (error) {
      setCheckingOut(false);
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="header">Cart</div>
        <div className="container my-4 cart-wrapper">
          {cartItems && cartItems?.length > 0 ? (
            <div>
              <Row>
                <Col xs={12} lg={7}>
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="cart-item-container">
                      <Row>
                        <Col xs={12} md={4}>
                          <img
                            src={`/api${item.image}`}
                            alt="cart-item"
                            width={140}
                            height={150}
                          />
                        </Col>
                        <Col xs={12} md={8}>
                          <div>
                            <div
                              className={
                                isMobile
                                  ? "my-2"
                                  : "d-flex justify-content-between align-items-center mb-2"
                              }
                            >
                              <div>{item.title}</div>
                              <div>GHC {item.price.toFixed(2)}</div>
                            </div>
                            <div className="mb-2">
                              <span className="cart-item-text">
                                Width: {item.width}
                              </span>{" "}
                              |{" "}
                              <span className="cart-item-text">
                                Height: {item.height}
                              </span>
                            </div>
                            <div className="cart-item-text mb-2">
                              Quantity:{" "}
                              <input
                                type="number"
                                min={1}
                                value={item.quantity}
                                disabled
                                className="mx-2"
                              />
                            </div>
                            <div className="cart-item-text mt-4">
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Col>
                <Col xs={12} lg={{ span: 4, offset: 1 }}>
                  <div>
                    <h3>Summary</h3>
                  </div>
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="summary-item mb-1">
                      <span>
                        {item.title} ({item.quantity})
                      </span>
                      <span>GHC {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="summary-total">
                    <span>Total</span>
                    <span>
                      GHC{" "}
                      {getTotal().toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="d-grid gap-3 mt-4">
                    {loggedIn ? (
                      <>
                        <Button
                          variant="success"
                          onClick={handleCheckOut}
                          disabled={checkingOut}
                        >
                          {checkingOut ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Check Out"
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button variant="success" disabled>
                        Sign In Required
                      </Button>
                    )}
                    <Button variant="outline-secondary" onClick={emptyCart}>
                      Empty Cart
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div>
                Your cart is empty. Click button below to add items to cart:
              </div>
              <div className="mt-4">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleClick}
                >
                  Go To Shop
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12}>
              <Table striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <span style={{ marginRight: "10px" }}>Total:</span>
                <span>
                  GHC{" "}
                  {getTotal().toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <InitializePaystackPayment
            config={paystackOptions}
            checkingOut={checkingOut}
            onSuccess={() => handleSuccess()}
            onClose={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface IPaystackOptions {
  publicKey: string;
  email: string;
  amount: number;
  reference: string;
}
