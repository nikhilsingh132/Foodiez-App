import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from "../screens/Cart"
import {useCart} from "./ContextReducer"
function Navbar() {
    let data=useCart();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    const [cartView, setcartView] = useState(false);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Foodiez</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 active fw-bold border border-white rounded mt-2" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 active fw-bold border border-white rounded mx-1 mt-2" aria-current="page" to="/myOrder">My orders</Link>
                                </li> : ""
                            }
                        </ul>
                        {!(localStorage.getItem("authToken")) ?
                            <div className='d-flex '>
                                <Link className="btn text-success bg-white mx-1 fw-bold" to="/login">Login</Link>
                                <Link className="btn text-success bg-white mx-1 fw-bold" to="/createuser">Sign Up</Link>
                            </div>
                            :
                            <div>
                                <div className="btn text-primary bg-white mx-1 fw-bold" onClick={() => { setcartView(true) }}>My Cart {" "}
                                    <Badge pill bg='danger'>{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setcartView(false)}><Cart /></Modal> : null}
                                <div className="btn text-danger bg-white mx-1 fw-bold" onClick={handleLogout}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar