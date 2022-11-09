import React from "react";
import Layout from "../../components/Layout";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Inpot";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup } from "../../actions";
import { Navigate } from "react-router-dom";

// import { Container, Row, Col } from "react-bootstrap";
/**
 * @author
 * @function
 **/

const Signup = (props) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const usersignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  // if (user.loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "150px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={usersignup}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                  ></Input>
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                  ></Input>
                </Col>
              </Row>

              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signup;
