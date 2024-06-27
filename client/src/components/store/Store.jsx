import React, { useState } from 'react';
import './store.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { FaShoppingCart } from 'react-icons/fa';

const Store = () => {
    const [cart, setCart] = useState([]);
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar si el usuario está logeado

    const products = [
        {
            id: 1,
            name: "Protein Powder",
            price: 8000,
            image: require('./imagenes/proteina1.png'),
            description: "Proteína en polvo sabor vainilla 60g."
        },
        {
            id: 2,
            name: "Pre-Workout",
            price: 18000,
            image: require('./imagenes/pre1.png'),
            description: "Pre-entreno sabor fruit punch 30 porciones 330g."
        },
        {
            id: 3,
            name: "Vitamins",
            price: 1000,
            image: require('./imagenes/vitamina1.png'),
            description: "Vitaminas esenciales para tu salud en general 60 comprimidos."
        },
        {
            id: 4,
            name: "Protein Powder",
            price: 35000,
            image: require('./imagenes/proteina3.png'),
            description: "Proteína en polvo sabor chocolate 2.26kg."
        },
        {
            id: 5,
            name: "Pre-Workout",
            price: 15000,
            image: require('./imagenes/pre2.png'),
            description: "Pre-entreno para mujeres sabor piñacolada 30 porciones."
        },
        {
            id: 6,
            name: "Vitamins",
            price: 3000,
            image: require('./imagenes/vitamina2.png'),
            description: "Vitaminas esenciales para tu salud en general 100 comprimidos."
        },
        {
            id: 7,
            name: "Protein Powder",
            price: 30000,
            image: require('./imagenes/proteina4.png'),
            description: "Proteína en polvo sabor chocolate y coco 2.24kg."
        },
        {
            id: 8,
            name: "Protein Powder",
            price: 10000,
            image: require('./imagenes/proteina2.png'),
            description: "Proteína en polvo vegana sabor vainilla 540g."
        }
    ];

    const addToCart = (product) => {
        setCart((prevCart) => {
            const productInCart = prevCart.find((item) => item.id === product.id);
            if (productInCart) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    const finalizePurchase = () => {
        if (isLoggedIn) {
            setTotalPurchase(totalAmount);
            setCart([]);
        } else {
            alert('Debes estar logeado para finalizar la compra.');
        }
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div>
            <Navbar />
            <div className='storeContainer'>
                <h1>Tienda Suplementos</h1>
                <p>Bienvenido a nuestra tienda de suplementos! Echa un vistazo a nuestros productos:</p>
                <button className="cartIcon" onClick={toggleCart}>
                    <FaShoppingCart size={30} />
                    {cart.length > 0 && <span className="cartCount">{cart.length}</span>}
                </button>
                {isCartOpen && (
                    <div className='cartContainer'>
                        <h2>Carrito</h2>
                        {cart.length === 0 ? (
                            <p>Tu carrito está vacío</p>
                        ) : (
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id}>
                                        <div className='cartItem'>
                                            <img src={item.image} alt={item.name} />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>${item.price.toFixed(2)}</p>
                                                <div className='quantityControl'>
                                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        min="1"
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    />
                                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className="finalizePurchaseButton" onClick={finalizePurchase}>Finalizar compra</button>
                        {totalPurchase > 0 && <p>Total de la compra: ${totalPurchase.toFixed(2)}</p>}
                    </div>
                )}
                <div className='productsGrid'>
                    {products.map((product) => (
                        <div className='productCard' key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p className='price'>${product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product)}>Añadir</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Store;
