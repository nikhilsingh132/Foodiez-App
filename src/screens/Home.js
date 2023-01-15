import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Card from "../components/Card"

function Home() {
    const [foodItem, setfoodItem] = useState([]);
    const [foodCat, setfoodCat] = useState([]);
    const [search, setsearch] = useState("");
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        });
        response = await response.json();
        setfoodItem(response[0]);
        setfoodCat(response[1]);
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "100" }}>
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×500/?burger" className='img-responsive w-100' style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×500/?pasta" className='img-responsive w-100' style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×500/?pizza" className='img-responsive w-100' style={{ filter: "brightness(50%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                                    <hr />
                                    {
                                        foodItem !== []
                                            ? foodItem.filter((item) =>
                                                (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItems => {
                                                    return (
                                                        <div className='col-12 col-md-6 col-lg-3' key={filterItems._id}>
                                                            <Card foodItem={filterItems} options={filterItems.options[0]} />
                                                        </div>
                                                    )
                                                })
                                            : <div>No data found</div>
                                    }
                                </div>
                            )
                        })
                        : <div>bye world</div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}

export default Home