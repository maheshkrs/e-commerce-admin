import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Modal, FloatingLabel, Form }from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

import * as Yup from "yup";
import { NavLink, useHistory, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import fruit from "../../Assets/fruits.jpg";
import { ProjectContext } from '../../Context/index';

const validationSchema = Yup.object({
    productname: Yup.string().required("product name is required"),
    producttype: Yup.string().required("product type is required"),
    productprice: Yup.string().required("product price is required"), 
    productdescription: Yup.string().required("product description is required"), 
});


export const Home = (props) => {
   const BaseUrl = process.env.REACT_APP_BASE_URL
    const [productlist, setProductlist] = useState(null);
    const { isLoggedIn, setIsLoggedIn } = useContext(ProjectContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // console.log("Home--isLoggedIn", isLoggedIn);
  
    useEffect(() => {
        fetchData()
        // const response = axios.get(BaseUrl + "/products/list")
        //  .then((res) => {
        //         console.log("res", res.data.data)
        //         if (res.status == 200) {
        //             setProductlist(res.data.data)
        //         } else {
                   
        //         }
        //     })
        //     .catch((err) => {
        //         Swal.fire(
        //             {
        //                 icon: 'fail',
        //                 text:"Failed to fetch products"
        //             }
        //         )
        //     });
    },[]);

    const fetchData = async () => {
        axios.get(BaseUrl + "/products/list")
            .then((res) => {
                console.log("res", res.data.data)
                if (res.status == 200) {
                    setProductlist(res.data.data)
                } else {

                }
            })
            .catch((err) => {
                Swal.fire(
                    {
                        icon: 'fail',
                        text: "Failed to fetch products"
                    }
                )
            });
    };

    const ProductsList = productlist?.map((product) =>
        <div className="col-md-3 mb-4" key={product._id}>
              <Card>
                    {/* <Card.Img variant="top" src={fruit} /> */}
                    <Card.Body>
                        <Card.Title>Fruit name : {product.productname}</Card.Title>
                        <h6>Type : {product.producttype}</h6>
                        <h6>Price : Rs,{product.productprice}</h6>
                        <Card.Text>
                            {product.productdescription}
                        </Card.Text>
                    </Card.Body>
                </Card>
          </div>
    )

    const onSubmit = async (values) => {
       console.log("values",values);
        const { productname, producttype, productprice, productdescription } = values;
        const data = { 'productname': productname, "producttype": producttype, "productprice": productprice, "productdescription": productdescription };
        const response = await axios.post(BaseUrl + "/products/create", data)

            .then((res) => {
                console.log("res", res)
                if (res.status == 200) {
                    fetchData();
                    Swal.fire(
                        {
                            icon: 'success',
                            // title: res?.status,
                            text: res.data.message
                        }
                    )
                } else {
                    
                }
                setShow(false)
            })
            .catch((err) => {
             
                // console.log("error", err.response.data.status);
                setShow(false)
             
            });

        formik.resetForm();
    };

    const formik = useFormik({
        initialValues: { productname: "", producttype: "", productprice: "", productdescription:"" },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    });
return (
        <div className="mainContainer">
            <div className="mt-4">
                <div className="container">
                 <div>
                   
                    <Button className="float-right" variant="primary" onClick={handleShow}>
                       Add Products
                    </Button>
                    <h5>Fruits Lists</h5>
                 </div>
                     <div className="row">
                     {productlist != null ? ProductsList :
                       <div>
                          <h5>Product List Empty</h5>
                      </div>}
                     </div>
                </div>
            </div>
{/* MODAL TO ADD PRODUCT */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label>Product name</label>
                    <input
                        className="form-control"
                        name="productname"
                        type="text"
                        value={formik.values.productname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className="error-msg">
                        {formik.touched.productname && formik.errors.productname
                            ? formik.errors.productname
                            : " "}
                    </div>
                </div>
                <div className="form-group">
                    <label>Product Type</label>
                    <input
                        className="form-control"
                        name="producttype"
                        type="text"
                        value={formik.values.producttype}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className="error-msg">
                        {formik.touched.producttype && formik.errors.producttype
                            ? formik.errors.producttype
                            : " "}
                    </div>
                </div>
                <div className="form-group">
                    <label>Product Price</label>
                    <input
                        className="form-control"
                        name="productprice"
                        type="text"
                        value={formik.values.productprice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <div className="error-msg">
                        {formik.touched.productprice && formik.errors.productprice
                            ? formik.errors.productprice
                            : " "}
                    </div>
                </div>
                <div className="form-group">
                    <label>Product description</label>

                    <FloatingLabel controlId="floatingTextarea2">
                        <Form.Control 
                        as="textarea" 
                        style={{ height: '100px' }}
                        name="productdescription"
                        value={formik.values.productdescription}
                        onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                        />
                    </FloatingLabel>
                    {/* <input
                        className="form-control"
                        name="productdescription"
                        type="text"
                        value={formik.values.productprice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    /> */}
                    <div className="error-msg">
                        {formik.touched.productdescription && formik.errors.productdescription
                            ? formik.errors.productdescription
                            : " "}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant="primary" onClick={formik.handleSubmit}>
                   Add Product
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
    );
};
