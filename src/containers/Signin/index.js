import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/index";
// import { Container, Button, Form, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Inpot";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @author
 * @function
 **/

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    console.log(auth);
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "150px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Input>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            {/* // </Layout> */}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
