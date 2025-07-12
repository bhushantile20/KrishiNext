import React from "react";
import useOrder from "../../hooks/orders/useOrder";
import { useSelector } from "react-redux";
import Spinner from "../../components/loading/Spinner";
import { notify } from "../../utils/helper/notification";
import axios from "axios";
import { SEND_PAYMENT_RECEIPT } from "../../constants/apiEndpoints";

const PaymentCard = ({
  totalAmount,
  limitForFreeDelivery,
  deliveryCharge,
  customerLatitude,
  customerLongitude,
}) => {
  const cartData = useSelector((state) => state.cartReducer);
  console.log("Cart data:", cartData);

  // const user = useSelector((state) => state.userReducer.user);
  // console.log("User data:", user);

  const { orderProduct, isLoading: isPaymentInitiated } = useOrder();

  const orderNow = async () => {
  if (customerLatitude === null || customerLongitude === null) {
    notify("Please allow the location access", "info");
    return;
  }

  const orderData = cartData.map((element) => ({
    productId: element._id,
    orderQty: element.qty,
    pricePerUnit: element.pricePerUnit,
    productName: element.name,
    totalPrice: element.pricePerUnit * element.qty,
    orderLocation: {
      coordinates: [customerLongitude, customerLatitude],
    },
    sellerId: element.sellerId,
  }));

  console.log("Order data:", orderData);

  // Create receipt HTML content
  const createReceiptHTML = (orderData) => {
    const tableRows = orderData
      .map(
        (item) => `
        <tr>
          <td>${item.productName}</td>
          <td>${item.orderQty}</td>
          <td>Rs. ${item.pricePerUnit}</td>
          <td>Rs. ${item.totalPrice}</td>
        </tr>`
      )
      .join("");

    const totalAmount = orderData.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    return `
      <h2>🧾 Payment Receipt</h2>
      <p>Thank you for your order!</p>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price/Unit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <p><strong>Total Amount:</strong> Rs. ${totalAmount}</p>
      <p><strong>Delivery Location:</strong> [${customerLatitude}, ${customerLongitude}]</p>
    `;
  };

  // Send email receipt
  const sendReceipt = async (email, orderData) => {
    try {
      const content = createReceiptHTML(orderData);
      const subject = "Your Payment Receipt";

      await axios.post(SEND_PAYMENT_RECEIPT, { email, content, subject });
      console.log("✅ Email receipt sent.");
    } catch (err) {
      console.error("❌ Failed to send receipt email", err);
    }
  };
  const user_email = sessionStorage.getItem("user_email") || ""
  // Send the email before placing the order
  await sendReceipt(user_email, orderData);

  // Place the order
  orderProduct(orderData);
};


  return (
    <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
      <h3 className="text-xl  font-semibold leading-5 text-gray-800">
        Shipping
      </h3>
      <div className="flex justify-between items-start w-full">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-8">
            <img
              loading="lazy"
              className="w-full h-full"
              alt="logo"
              src="https://i.ibb.co/L8KSdNQ/image-3.png"
            />
          </div>
          <div className="flex flex-col justify-start items-center">
            <p className="text-lg leading-6  font-semibold text-gray-800">
              CropConnect
              <br />
              <span className="font-normal">Delivery within 24 Hours</span>
            </p>
          </div>
        </div>
        <p className="text-lg font-semibold leading-6  text-gray-800">
          Rs.
          {totalAmount +
            (totalAmount >= limitForFreeDelivery ? 0 : deliveryCharge)}
          .00
        </p>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          className="hover:bg-black    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white flex flex-row justify-center items-center"
          onClick={() => {
            if (cartData.length === 0) {
              notify("First add some items to cart", "info");
            } else {
              orderNow();
            }
          }}
        >
          {isPaymentInitiated && <Spinner width="w-6" color="#ffffff" />}
          Order Now
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
