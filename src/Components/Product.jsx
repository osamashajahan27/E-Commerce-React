// import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Atom } from "react-loading-indicators";
import useFetch from "./CustomHook/useFetch";
import { TiShoppingCart } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../Store/cartSlice";
import { useEffect } from "react";

const Product = () => {
  // let [products, setProducts] = useState([]);
  // let [error, setError] = useState("");
  // let [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:4000/products", { method: "GET" })
  //     .then((respons) => {
  //       if (respons.ok) {
  //         return respons.json();
  //       } else {
  //         throw new Error(" Invalid Data");
  //       }
  //     })
  //     .then((datas) => {
  //       setProducts(datas);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  let navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  let { products, loading, error, setProducts } = useFetch(
    "http://localhost:8080/products",
  );
  //  console.log(products);
  let dispatch = useDispatch();

  function addToCart(product) {
    dispatch(addItem(product));
  }

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/products/${id}`).then(() => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            let newProductList = products.filter((prod) => {
              return prod.id !== id;
            });
            setProducts(newProductList);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error",
            });
          }
        });
    });
  }
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Atom color="#31cc8e" size="large" text="Loading..." textColor="" />
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h1 style={{ flex: 2 }}>product List</h1>
        <Button variant="danger"
         style={{ marginRight: "10px", height:"40px" }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </Button>
        <h3 style={{ flex: 1 }}>
          {" "}
          To Create New Product
          <Button
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/newproduct");
            }}
          >
            {" "}
            Click me!
          </Button>
        </h3>
      </div>
      {products.length !== 0 && (
        <section className="products">
          {products.map((product) => (
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
                  variant="primary"
                  style={{ marginRight: "5px", marginLeft: "0px" }}
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  <TiShoppingCart />
                </Button>
                <Button
                  variant="secondary"
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    navigate(`/update/${product.id}`);
                  }}
                >
                  <FaRegEdit />
                </Button>
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
      )}
      <h3> {error} </h3>
    </div>
  );
};

export default Product;
