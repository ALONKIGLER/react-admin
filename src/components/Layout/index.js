import React from "react";
import Header from "../Header";
import { NavLink } from "react-router-dom";
import "./style.css";

import { Row, Col, Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    דף הבית
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">
                    אודות
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/category" className="nav-link">
                    קטגוריה
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/product" className="nav-link">
                    מוצרים
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/order" className="nav-link">
                    הזמנות
                  </NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
}
