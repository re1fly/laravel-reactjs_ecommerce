import React, {useEffect, useState} from 'react';
import {Breadcrumb, Col, Form, Row} from "react-bootstrap";
import {GET_WOMEN_CLOTHES} from "../../../components/Api/Url";
import {useCart, CartProvider,} from "react-use-cart";


export default function ListWomens() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["product_name", "category", "sub_category"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [category, setCategory] = useState("All");

    const {addItem} = useCart();

    useEffect(() => {
        axios.get(GET_WOMEN_CLOTHES).then(response => {
            setIsLoaded(true)
            setItems(response.data.list)

        }).catch(function (error) {
            setIsLoaded(true);
            setError(error)
        });
    }, []);

    function Cart() {
        const {
            isEmpty,
            cartTotal,
            totalUniqueItems,
            items,
            updateItemQuantity,
            removeItem,
            emptyCart
        } = useCart();

        if (isEmpty) return <p>Your cart is empty</p>;

        return (
            <>
                <h1>
                    Cart ({totalUniqueItems} - {cartTotal})
                </h1>

                {!isEmpty && <button onClick={emptyCart}>Empty cart</button>}

                <ul>
                    {search(items).map(item => (
                        <li key={item.id}>
                            {item.quantity} x {item.name}
                            <button
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >
                                -
                            </button>
                            <button
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >
                                +
                            </button>
                            <button onClick={() => removeItem(item.id)}>Remove &times;</button>
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    function search(items) {
        return items.filter((item) => {
            if (item.category == filterParam) {
                return (searchParam.some((newItem) => {
                    return (
                        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                    )
                }))
            } else if (item.sub_category == filterParam) {
                return (searchParam.some((newItem) => {
                    return (
                        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                    )
                }))
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
                    );
                })
            }
        })
    }

    return (
        <>
            <CartProvider>
                <Cart/>
                <h3>Women Products</h3>
                <Breadcrumb className="text-breadcrumb">
                    <Breadcrumb.Item active>products</Breadcrumb.Item>
                    <Breadcrumb.Item active>{category}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="search-wrapper">
                    <Form>
                        <Row>
                            <Col xs={6}>
                            </Col>
                            <Col xs={2}>
                                <Form.Group className="pb-3">
                                    <Form.Label>
                                        Filter by Categories
                                    </Form.Label>
                                    <Form.Control as="select"
                                                  onChange={(e) => {
                                                      setFilterParam(e.target.value);
                                                      setCategory(e.target.value);
                                                  }}>
                                        <option value="All">All</option>
                                        <option value="top">Top</option>
                                        <option value="bottom">Bottom</option>
                                        <option value="accessories">Accessories</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            {category === 'top'
                                ?
                                <>
                                    <Col xs={2}>
                                        <Form.Group className="pb-3">
                                            <Form.Label className="label-font">
                                                Filter by Sub Categories
                                            </Form.Label>
                                            <Form.Control as="select"
                                                          onChange={(e) => {
                                                              setFilterParam(e.target.value);
                                                          }}>
                                                <option value="top">All</option>
                                                <option value="tshirt">T-Shirts</option>
                                                <option value="jersey">Jerseys</option>
                                                <option value="jacket">Jackets</option>
                                                <option value="sweater">Sweaters</option>
                                                <option value="hoodie">Hoodies</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </>
                                :
                                category === 'bottom'
                                    ?
                                    <>
                                        <Col xs={2}>
                                            <Form.Group className="pb-3">
                                                <Form.Label>
                                                    Filter by Sub Categories
                                                </Form.Label>
                                                <Form.Control as="select"
                                                              onChange={(e) => {
                                                                  setFilterParam(e.target.value);
                                                              }}>
                                                    <option value="bottom">All</option>
                                                    <option value="shorts">Short</option>
                                                    <option value="pants">Pants</option>
                                                    <option value="leggings">Leggings</option>
                                                    <option value="socks">Socks</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </>
                                    :
                                    category === 'accessories'
                                        ?
                                        <>
                                            <Col xs={2}>
                                                <Form.Group className="pb-3">
                                                    <Form.Label>
                                                        Filter by Sub Categories
                                                    </Form.Label>
                                                    <Form.Control as="select"
                                                                  onChange={(e) => {
                                                                      setFilterParam(e.target.value);
                                                                  }}>
                                                        <option value="accessories">All</option>
                                                        <option value="caps">Caps</option>
                                                        <option value="backpacks">Backpacks</option>
                                                        <option value="sleeves">Sleeves</option>
                                                        <option value="balls">balls</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col xs={2}>
                                                <Form.Group className="pb-3">
                                                    <Form.Label>
                                                        Filter by Sub Categories
                                                    </Form.Label>
                                                    <Form.Control as="select"
                                                                  onChange={(e) => {
                                                                      setFilterParam(e.target.value);
                                                                  }}>
                                                        <option value="All">All</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                        </>
                            }
                            <Col xs={2}>
                                <Form.Label>
                                    Search Products
                                </Form.Label>
                                <Form.Group className="pb-3">
                                    <Form.Control type="text"
                                                  name="search-form-women"
                                                  id="search-form-women"
                                                  className="search-input"
                                                  placeholder="Search for..."
                                                  value={q}
                                                  onChange={(e) => setQ(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="text-center">
                    {search(items).map((item) => (
                            <div className="product-wrapper" key={item.id}>
                                <div className="img-thumb">
                                    <img src={item.product_image} alt={item.product_name}/>
                                </div>
                                <p className="name">{item.product_name}</p>
                                <p className="sub_category">{item.sub_category}</p>
                                <p className="category" hidden>{item.category}</p>
                                <p className="price">Rp. {item.price},00</p>
                                <button id={item.id} className="button-buy" onClick={() => addItem(item)}>
                                    <span><i className="fas fa-shopping-cart"></i> Add to Cart</span>
                                </button>
                            </div>
                        )
                    )}
                </div>
            </CartProvider>
        </>
    )

}

