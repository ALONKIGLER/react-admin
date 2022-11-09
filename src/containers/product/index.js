import React from "react";
import Layout from "../../components/Layout";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../components/UI/Inpot";
import { addProduct } from "../../actions/product.action";
import Modal from "../../components/UI/modal";
import Table from "react-bootstrap/Table";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
/**
 * @author
 * @function order
 **/

export const Product = (props) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const handleClose = () => {
    console.log("asd");

    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);  
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };

  const handleClose1 = () => setShow(false);

  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  key={product._id}
                  onClick={() => ShowProductDetailModel(product)}
                >
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProduct = () => {
    console.log("קגקגקגץ", product);

    return (
      <Modal
        show={show}
        onSubmit={handleClose}
        handleClose={handleClose1}
        modalTitle={"הוסף מוצר חדש"}
      >
        <Input
          label="שם המוצר"
          value-={name}
          placeholder={"שם המוצר"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="כמות"
          value-={quantity}
          placeholder={"כמות"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="מחיר"
          value-={price}
          placeholder={"מחיר"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="תיאור"
          value-={description}
          placeholder={"תיאור"}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const ShowProductDetailModel = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderShowProductDetailModel = () => {
    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"שם המוצר"}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">שם המוצר</label>
            <p className="value"> {productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">מחיר</label>
            <p className="value"> {productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">כמות</label>
            <p className="value"> {productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">קטגוריה</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">תיאור המוצר</label>
            <p className="value"> {productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">תמונות</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
            ></div>
            <h3>מוצרים</h3>
            <button onClick={handleShow}>הוסף מוצר </button>
          </Col>
        </Row>
        <Row>
          <Col> {renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProduct()}
      {renderShowProductDetailModel()}
    </Layout>
  );
};
