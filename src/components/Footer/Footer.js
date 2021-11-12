import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";
import play from "../../images/play.jpg";
import apple from "../../images/appStore.png";

const Footer = () => {
  return (
    <div className="mt-5 pt-5">
      <div className="mt-5">
        <div className="p-5 footer">
          <Container className="text-light">
            <section className="my-5 Footer">
              <Row>
                <Col sm={12} md={4}>
                  <div className="mt-2">
                    <ul>
                      <p>
                        <strong>COMPANY</strong>
                      </p>
                      <li>
                        <strong> PRIVACY POLICY</strong>
                      </li>
                      <li>
                        <strong> CAREERS</strong>
                      </li>
                      <li>
                        <strong> TERMS & CONDITIONS</strong>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col sm={12} md={4}>
                  <div className="mt-2">
                    <ul>
                      <p>
                        <strong>SUPPORT</strong>
                      </p>
                      <li>
                        <strong> Help Center</strong>
                      </li>
                      <li>
                        <strong> Cancellation options</strong>
                      </li>
                      <li>
                        <strong> Contact Us</strong>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col sm={12} md={4}>
                  <div className="mt-2">
                    <img
                      src={play}
                      alt=""
                      className="img-fluid"
                      height="200"
                      width="250"
                    />
                    <img
                      src={apple}
                      alt=""
                      className="img-fluid"
                      height="200"
                      width="250"
                    />
                  </div>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Footer;
