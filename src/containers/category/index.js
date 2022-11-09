import React from "react";
import Layout from "../../components/Layout";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Input from "../../components/UI/Inpot";
import Modal from "../../components/UI/modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  getAllCategory,
  updateCategories,
  deleteCategories as DeleteCategoriesAction,
} from "../../actions/category.action";
import "./style.css";
import {
  IoSquareOutline,
  IoCheckboxSharp,
  IoCaretForward,
  IoCaretDownOutline,
} from "react-icons/io5";
/**
 * @author
 * @function
 **/

const Category = (props) => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [updateCategoryModel, setUpdateCategoryModel] = useState("");
  const [deleteCategoryModel, setDeleteCategoryModel] = useState(false);

  const handleShow = () => setShow(true);

  // פונקצייה שמחזיקה אובייקטים לצא'קליסט את כל הקטגוריות שלנו
  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      // console.log("category.childrenc ", category);

      myCategories.push({
        label: category.name,
        value: category._id,

        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  // מופעלת לאחר שלחצנו על ערוך
  // מעביר את המערך של הצאקליסט למערך שלנו

  const updateCategory = () => {
    setUpdateCategoryModel(true);
    updateCheckedAndExpandedCategories();
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  // נקרא לאחר שינוי בשדות
  // מעדכן את הערכים במערך שלנו
  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);

    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  // פורום שליחה של עריכת קטגוריה

  const updateCategoriesForm = () => {
    console.log("expandedArray", expandedArray);
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form));
    setUpdateCategoryModel(false);
  };

  {
    //
    /* מודל עריכת קטגוריה */
    //
  }

  const categoryList = createCategoryList(category.categories);

  const renderUpdateCategoriesModel = () => {
    return (
      <Modal
        show={updateCategoryModel}
        handleClose={() => setUpdateCategoryModel(false)}
        onSubmit={updateCategoriesForm}
        modelTitle={"ערוך קטגוריה"}
        size="lg"
      >
        <Row>
          <Col>
            <h6>קטגוריות שהרחבו </h6>
          </Col>
        </Row>

        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option>select category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}

        <h6> קטגוריות שנבחרו</h6>

        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option>select category</option>
                  {categoryList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select
                  className="form-control"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
            </Row>
          ))}
      </Modal>
    );
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModel(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(DeleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModel(false);
        }
      });
    }

    setDeleteCategoryModel(false);
  };

  // מודל מחיקה

  const renderDeletCategoryModel = () => {
    return (
      <Modal
        modelTitle="האם למחוק?"
        show={deleteCategoryModel}
        handelClose={() => setDeleteCategoryModel(false)}
        buttons={[
          {
            label: "no",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  // פורום שליחה של הפרטים עבור הפעולה של קטגוריה חדשה

  const handleClose = () => {
    const form = new FormData();

    if (categoryName === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }

    form.append("name", categoryName);

    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));

    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };

  {
    /* מודל הוספת קטגוריה */
  }

  const renderAddCategoryModal = () => {
    console.log("toto");
    return (
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        onSubmit={handleClose}
        modelTitle={"הוסף קטגוריה חדשה"}
      >
        {" "}
        <Input
          value-={categoryName}
          placeholder={"שם הקטגוריה"}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>בחר קטגוריה </option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
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
            <h3>Category</h3>
            <Row>
              <Col>
                <Row>
                  <Button onClick={handleShow}>הוסף קטגוריה</Button>
                </Row>

                <button onClick={deleteCategory}>מחק</button>
                <button onClick={updateCategory}>ערוך</button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>
              {renderCategories(category.categories)}
              {JSON.stringify(createCategoryList(category.categories))}
            </ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckboxSharp />,
                uncheck: <IoSquareOutline />,
                // halfCheck: <IoCheckboxOutline />,
                expandClose: <IoCaretForward />,
                expandOpen: <IoCaretDownOutline />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {/* מודל הוספת קטגוריה */}
      {renderAddCategoryModal()}
      {/* מודל עריכת קטגוריה */}

      {renderUpdateCategoriesModel()}
      {renderDeletCategoryModel()}
    </Layout>
  );
};

export default Category;
