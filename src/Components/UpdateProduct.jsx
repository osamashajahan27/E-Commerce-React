import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
let navigate =useNavigate()
  const [product, setProduct] = useState(null);

  //   console.log(product);
  
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "15px",
  };
  
  let {id}=useParams()
  useEffect(()=>{
    axios.get(`http://localhost:4000/products/${id}`)
    .then((respons)=>{setProduct(respons.data);
    })
  },[])
  
  function handleChange(e) {
    let { name, value } = e.target;

    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setProduct({
        ...product,
        rating: {
          ...product.rating,
          [fieldName]: value,
        },
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  }

//   function handlesubmit(e) {
//     e.preventDefault();
//     fetch("http://localhost:4000/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(product),
//     }).then(() => {
//       alert("Product Added Succesfully");
//       setProduct({
//         title: "",
//         price: 0,
//         description: "",
//         category: "",
//         image: "",
//         rating: {
//           rate: 0,
//           count: 0,
//         },
//       });
//     });
//   }

    async function handleUpdate(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
       `http://localhost:4000/products/${id}`,
        product
      );

      console.log("Product Added:", response.data);

      alert("Product added successfully!");
      
      navigate("/product")

    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
  if(product!==null){

    return (
      <Paper elevation={20} style={paperStyle}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {" "}
          Update Product
        </Typography>
        <Grid
          component="form"
          style={{ display: "grid", gap: "15px   " }}
          onSubmit={handleUpdate}
        >
          <TextField
            value={product.title}
            name="title"
            label="title"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={product.price}
            name="price"
            type="number"
            label="price"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={product.description}
            name="description"
            label="description"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={product.category}
            name="category"
            label="category"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            value={product.image}
            name="image"
            label="image"
            variant="outlined"
            onChange={handleChange}
          />
  
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={product.rating.rate}
                type="number"
                name="rating.rate"
                label="Rating"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={product.rating.count}
                type="number"
                name="rating.count"
                label="Count"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="success" fullWidth>
            save
          </Button>
        </Grid>
      </Paper>
    );
  }
  else{
    <div>Loading</div>
  }
}

export default UpdateProduct