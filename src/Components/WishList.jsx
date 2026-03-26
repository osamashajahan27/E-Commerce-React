import React from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { removeItem } from "../Store/cartSlice";

const WishList = () => {
  let cartProduct = useSelector((state) => state.cart);
  console.log(cartProduct);

  let dipatch = useDispatch();

  function handleDelete(id) {
    dipatch(removeItem(id));
  }

  return (
    <div>
      {cartProduct.length !== 0 ? (
        <section className="products">
          {cartProduct.map((product) => (
            <Card
              style={{ width: "18rem" }}
              className="product"
              key={product.id}
            >
              {product.image && (
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ width: "9rem", height: "11rem" }}
                />
              )}
              {/* <Card.Img
                variant="top"
                src={product.image}
                style={{ width: "9rem", height: "11rem" }}
              /> */}
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text
                  style={{
                    height: "6rem",
                    overflowY: "auto",
                    paddingRight: "8px",
                  }}
                >
                  {product.description}
                </Card.Text>
              </Card.Body>

              <Card.Footer
                style={{
                  display: "flex",
                  background: "none",
                  alignContent: "center",
                }}
              >
                <Button
                  variant="danger"
                  style={{ marginRight: "5px", marginTop: "2px" }}
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  <MdDelete></MdDelete>
                </Button>
                Price : {product.price}
              </Card.Footer>
            </Card>
          ))}
        </section>
      ) : (
        <h1 style={{ textAlign: "center" }}>Add Some Products </h1>
      )}
    </div>
  );
};

export default WishList;
