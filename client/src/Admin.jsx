import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  // fetch  orders
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/api/order/orders");
    // find payment pending orders
    const paymentPendingOrders = res.data.filter(
      (order) => order.paymentStatus === false
    );
    setOrders(paymentPendingOrders);
    console.log(paymentPendingOrders);
  };


  const completePayment = async (event) => {
    try {
      const id = event.target.id;
      console.log(id);
      const res = await axios.post(`http://localhost:5000/api/complete/${id}` , {});
      console.log(res.data);
      fetchOrders();
      toast.success("Payment Completed");
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex justify-start items-center w-full h-screen flex-col gap-y-4 ">
      <Toaster />
      <div className="w-full h-16 flex justify-between px-10 items-center bg-green-200 text-3xl rounded-md">
        <h1 className="">Welcome Sir</h1>
      </div>
      {/* Render the menu Items */}
      <div className="menu w-full flex flex-col gap-x-20 gap-y-16 px-20">
        {orders.map((item) => {
          return (
            <div className=" w-full flex flex-col items-center text-2xl border border-black">
              <div className="flex w-full justify-between px-32 items-center bg-red-200 py-2 border-b-2 border-t border-l  border-r border-black">
                <p className="font-bold">Table Number : {item.table}</p>
                <div className=" bg-green-300 rounded px-4 py-1 select-none cursor-pointer" id={item.table} onClick={completePayment}>
                  Complete Payment
                </div>
              </div>
              <div className="w-full ">
                <table className=" w-full table-fixed">
                  <thead className="w-full">
                    <tr className=" w-full flex justify-around items-center py-2">
                      <th className="w-full flex justify-center items-center">
                        Item
                      </th>
                      <th className="w-full flex justify-center items-center">
                        Quantity
                      </th>
                      <th className="w-full flex justify-center items-center">
                        Price
                      </th>
                      <th className="w-full flex justify-center items-center">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.order.map((item) => {
                      return (
                        <tr className=" w-full flex justify-around items-center border-t  border-black py-2">
                          <td className="w-full flex justify-center items-center">
                            {item.item.name}
                          </td>
                          <td className="w-full flex justify-center items-center">
                            {item.quantity}
                          </td>
                          <td className="w-full flex justify-center items-center">
                            {item.item.price}
                          </td>
                          <td className="w-full flex justify-center items-center">
                            {parseInt(item.quantity) *
                              parseInt(item.item.price)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className=" w-full flex justify-around items-center border-t  border-black py-2">
                      <td className="w-full flex justify-center items-center font-bold">
                        Total
                      </td>
                      <td className="w-full flex justify-center items-center"></td>
                      <td className="w-full flex justify-center items-center"></td>
                      <td className="w-full flex justify-center items-center text-green-400 text-4xl font-bold">
                        {item.order.reduce((acc, item) => {
                          return (
                            acc +
                            parseInt(item.quantity) * parseInt(item.item.price)
                          );
                        }, 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
