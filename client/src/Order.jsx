import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cart from "./assets/SVG/Cart.svg";
import Minus from "./assets/SVG/Minus.svg";
import Plus from "./assets/SVG/Plus.svg";
import Close from "./assets/SVG/Close.svg";
import Backdrop from "@mui/material/Backdrop";

const Order = () => {
  const { tableNumber } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // set cart visibility
  const handleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // add item to cart
  const addItem = (e) => {
    const id = e.target.id;
    // check if item is already in cart
    const itemInCart = cart.find((item) => item.item._id === id);
    const item = menu.find((item) => item._id === id);
    if (itemInCart) {
      const orderItem = {
        item: item,
        quantity: itemInCart.quantity + 1,
      };
      const index = cart.indexOf(itemInCart);
      cart[index] = orderItem;
      setCart([...cart]);
      toast.success("Item added to cart");
    } else {
      const orderItem = {
        item: item,
        quantity: 1,
      };
      setCart([...cart, orderItem]);
      toast.success("Item added to cart");
    }
  };

  // Increase quantity of item
  const increaseQuantity = (e) => {
    const id = e.target.id;
    const item = cart.find((item) => item.item._id === id);
    const index = cart.indexOf(item);
    item.quantity = item.quantity + 1;
    cart[index] = item;
    setCart([...cart]);
  };

  // Decrease quantity of item
  const decreaseQuantity = (e) => {
    const id = e.target.id;
    const item = cart.find((item) => item.item._id === id);
    const index = cart.indexOf(item);
    if (item.quantity - 1 > 0) {
      item.quantity = item.quantity - 1;
    }
    cart[index] = item;
    setCart([...cart]);
  };

  // remove item from cart
  const removeItem = (e) => {
    const id = e.target.id;
    const item = cart.find((item) => item.item._id === id);
    const index = cart.indexOf(item);
    cart.splice(index, 1);
    setCart([...cart]);
  };

  // COnfirm the order
  const confirmOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/order/${tableNumber}`,
        { order: cart }
      );
      console.log(response.data);
      setCart([]);
      setIsCartVisible(false);
      toast.success("Order placed successfully | Enjoy your Meal ");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // fetch menu

  const fetchMenu = async () => {
    const res = await axios.get("http://localhost:5000/api/menu");
    setMenu(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="flex justify-start items-center w-full h-screen flex-col gap-y-4 bg-yellow-50">
      <Toaster />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCartVisible}
      >
        <div className="w-full flex flex-col justify-center items-center gap-y-4">
          <div
            className=" w-2/3 flex justify-end mb-10"
            onClick={handleCartVisibility}
          >
            <img className="bg-white p-3 rounded-md" src={Close} alt="close" />
          </div>
          {cart.map((cartItem) => {
            return (
              <div
                className="bg-white w-2/3 flex px-10 py-3 rounded-md justify-between text-black"
                key={cartItem.item._id}
              >
                <p className=" text-2xl font-serif ">{cartItem.item.name}</p>
                <div className=" flex gap-x-5">
                  <img
                    src={Minus}
                    alt="Down"
                    id={cartItem.item._id}
                    onClick={decreaseQuantity}
                    className=" cursor-pointer"
                  />
                  <p className=" text-2xl ">{cartItem.quantity}</p>
                  <img
                    src={Plus}
                    alt="Up"
                    id={cartItem.item._id}
                    onClick={increaseQuantity}
                    className=" cursor-pointer"
                  />
                  <p
                    className=" text-xl bg-red-400 px-3 rounded-md select-none cursor-pointer"
                    onClick={removeItem}
                  >
                    Remove
                  </p>
                </div>
              </div>
            );
          })}
          <div
            onClick={confirmOrder}
            className="bg-green-400 mt-20 w-2/3 flex px-10 py-3 rounded-md justify-center select-none font-serif text-black text-2xl"
          >
            Confirm order
          </div>
        </div>
      </Backdrop>
      <div className="w-full h-16 flex justify-between px-10 items-center bg-green-200 text-3xl rounded-md">
        <h1 className="">Welcome on table {tableNumber}</h1>
        <img src={Cart} alt="Cart" onClick={handleCartVisibility} />
      </div>
      {/* Render the menu Items */}
      <div className="menu w-full grid grid-cols-2 gap-x-20 gap-y-10 px-10">
        {menu.map((item) => {
          return (
            <div
              key={item._id}
              className="w-full flex  justify-center items-center bg-white rounded-lg shadow-gray-100 shadow-sm overflow-hidden"
            >
              <div className="h-full w-2/3 px-8 py-6 flex flex-col justify-between">
                <div className=" flex flex-col">
                  <p className=" text-2xl font-serif tracking-wide">
                    {item.name}
                  </p>
                  <p className=" text-2xl font-mono tracking-wide p-blue-400">
                    {item.price} Rs
                  </p>
                </div>
                <div
                  id={item._id}
                  key={item._id}
                  onClick={addItem}
                  className=" w-1/2 rounded bg-green-300 select-none text-xl flex justify-center items-center py-2"
                >
                  Add to Cart
                </div>
              </div>
              <div className="w-1/3 h-48">
                <img
                  src="https://madhurasrecipe.com/wp-content/uploads/2022/01/instant_dosa_featured.jpg"
                  alt="item"
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
