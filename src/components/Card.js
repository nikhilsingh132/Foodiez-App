import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    const priceRef = useRef();
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("");
    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
                return;
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img:props.foodItem.img });
                return;
            }
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img:props.foodItem.img });
        console.log(data);
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setsize(priceRef.current.value);
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body ">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'>
                            <select className="m-2 h-100 bg-success rounded" onChange={(e) => setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className="m-3 h-100 bg-success rounded" onChange={(e) => setsize(e.target.value)} ref={priceRef}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}
                            </select>
                            <div className=' h-100 fs-5'>
                                Total Price: Rs. {finalPrice}
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-success text-dark fw-bold' onClick={handleAddtoCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card