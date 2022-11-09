import React from "react";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import { Proses } from "./proses";

/**
 * @author
 * @function order
 **/

export const Order = (props) => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  console.log("order", order);
  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    console.log("gggggggg", payload);
    dispatch(updateOrder(payload));
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Layout sidebar>
      {" "}
      {order.orders.map((orderItem, index) => (
        <>
          <div>
            fdghjdfghj
            <div>
              <div className="title">Items</div>
              {orderItem.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productId.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{orderItem.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{orderItem.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{orderItem.paymentStatus}</span>
            </div>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {orderItem.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${
                    status.isCompleted ? "active" : ""
                  }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                  </div>
                </div>
              ))}
            </div>
            <Proses />
            {/* select input to apply order action */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
                  return (
                    <>
                      {!status.isCompleted ? (
                        <option key={status.type} value={status.type}>
                          {status.type}
                        </option>
                      ) : null}
                    </>
                  );
                })}
              </select>
            </div>
            {/* button to confirm action */}

            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            ></div>
          </div>
          <button onClick={() => onOrderUpdate(orderItem._id)}>confirm</button>
        </>
      ))}{" "}
    </Layout>
  );
};
