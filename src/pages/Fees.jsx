import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarStudent";
import Footer from "../components/Footer";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { QRCodeCanvas } from "qrcode.react";
import { Toast } from "flowbite-react";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";

function Delivery() {
  const location = useLocation();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const paymentUrl = "https://your-payment-link.com";
  const [showAmountField, setShowAmountField] = useState(false);
  const [amount, setAmount] = useState("");
  const [otp, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  const [userId, setUserID] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [phone, setPhone] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // Mock database and Firebase functions for demo
  const database = {
    /* mock database object */
  };
  const ref = (db, path) => ({ db, path });
  const push = async (ref, data) => {
    console.log("Mock push to:", ref.path, data);
    return Promise.resolve({ key: "mock-key" });
  };
  const calculateSubtotal = (products) => {
    return (
      products?.reduce((total, product) => total + (product.price || 0), 0) || 0
    );
  };
  const productData = [{ name: "Service Fee", price: 100 }]; // Mock product data

  const showToast = (message, type, onClose = null) => {
    setToast({ show: true, message, type });
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  };

  const handleToastClose = () => {
    setToast({ show: false, message: "", type: "" });
  };

  const handleOTPRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/send-mobile-otp",
        { phone }
      );
      if (response.data.success) {
        showToast("OTP sent successfully!", "success");
        setOtpSent(true);
      } else {
        showToast("Failed to send OTP.", "error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      showToast("Unexpected error. Please try again.", "error");
    }
  };

  const handleVerify = async () => {
    if (!phone || !phoneOtp) {
      showToast("Please enter your phone number and OTP.", "warning");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/verify-mobile-otp",
        { phone: phone.trim(), otp: phoneOtp.trim() }
      );
      if (response.data.success) {
        setOtpVerified(true);
        setPhone(response.data.phone || phone);
      } else {
        showToast("Invalid OTP. Please try again.", "warning");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      showToast("Error verifying OTP. Please try again.", "error");
    }
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (emailVerified) {
      try {
        const currDate = getCurrentDate();
        const deliveryDate = getCurrentDatePlus10Days();
        const totalAmount = calculateSubtotal(productData);
        const ordersRef = ref(database, "orders");

        await push(ordersRef, {
          customerName: name,
          customerContact: phoneNumber,
          customerEmail: email,
          addressDetails: {
            addressLine1: address,
            area,
            city,
            state,
            pinCode: postalCode,
            landmark,
            deliveryPhone,
          },
          itemDetails: {
            paymentMode: selectedPaymentOption,
            totalCost: totalAmount,
            itemDetails: productData,
          },
          delivery: {
            orderedOn: currDate,
            estimatedDelivery: deliveryDate,
            status: "Order Placed",
          },
        }).then(() => {
          showToast("Order placed successfully!", "success");
          navigate("/checkout");
        });
      } catch (error) {
        console.error("Error writing to Firebase:", error);
        showToast("Error processing your order. Try again!", "error");
      }
    } else {
      showToast(
        "Please verify your phone number before proceeding.",
        "warning"
      );
    }
  };

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneChange = (event) => setPhoneNumber(event.target.value);
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleAreaChange = (event) => setArea(event.target.value);
  const handleLandmarkChange = (event) => setLandmark(event.target.value);
  const handlePinChange = (event) => setPostalCode(event.target.value);
  const handleStateChange = (event) => setState(event.target.value);
  const handleCityChange = (event) => setCity(event.target.value);
  const handleDeliveryPhoneChange = (event) =>
    setDeliveryPhone(event.target.value);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4">
        {formOpen ? (
          <div className="my-4 max-w-4xl mx-auto">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
              <h1 className="font-bold text-2xl mb-4">Payment Information</h1>
              <form>
                <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={handleNameChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={(formattedValue) => setPhone(formattedValue)}
                      inputStyle={{ width: "100%", height: "auto" }}
                      containerStyle={{ marginBottom: "1rem" }}
                    />
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleOTPRequest}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[linear-gradient(135deg,_#1b73b9,_#2980b9)] hover:bg-[linear-gradient(135deg, #0a5189, #2980b9)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Send OTP
                      </button>
                    ) : !otpVerified ? (
                      <>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          className="block w-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={handleVerify}
                          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Verify OTP
                        </button>
                        {otpError && (
                          <span className="text-red-500 text-sm">
                            {otpError}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-green-600 text-sm">
                        Phone Number Verified
                      </span>
                    )}
                  </div>
                  {/* Address Details */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={handleAddressChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="area"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Area, Colony, Street
                    </label>
                    <input
                      type="text"
                      id="area"
                      value={area}
                      onChange={handleAreaChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter area, colony, street"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="landmark"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Landmark
                    </label>
                    <input
                      type="text"
                      id="landmark"
                      value={landmark}
                      onChange={handleLandmarkChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter landmark"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={city}
                      onChange={handleCityChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      value={state}
                      onChange={handleStateChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postalCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      value={postalCode}
                      onChange={handlePinChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter postal code"
                      pattern="\d{5,6}"
                    />
                  </div>
                </section>

                {/* Payment Options Section */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment Options
                  </h3>

                  <div className="mb-4">
                    <label
                      htmlFor="paymentOptions"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Select Payment Type
                    </label>
                    <select
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      style={{ cursor: "pointer" }}
                      id="paymentOptions"
                      onChange={(e) => setSelectedPaymentOption(e.target.value)}
                      value={selectedPaymentOption}
                      required
                    >
                      <option value="">Choose Payment Method</option>
                      <option value="razorPay">RazorPay</option>
                      <option value="stripe">Stripe</option>
                    </select>
                  </div>

                  <div className="text-center text-gray-600 font-medium mb-4">
                    Or
                  </div>

                  {/* QR Code Option */}
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => setShowQRCode(!showQRCode)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {showQRCode ? "Hide QR Code" : "Scan QR Code"}
                    </button>

                    {showQRCode && (
                      <div className="mt-4 p-4 border rounded-md text-center bg-white shadow-md">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Scan this QR Code to Pay
                        </p>
                        <div className="relative inline-block">
                          <QRCodeCanvas
                            value={paymentUrl}
                            size={160}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                            includeMargin={true}
                            className="border rounded-md"
                          />
                          {/* Overlay Text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-md shadow">
                              PlanStudies
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Amount Input and Payment Button */}
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    {selectedPaymentOption && (
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount
                        </label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <button
                        type="submit"
                        onClick={handleCheckOut}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[linear-gradient(135deg,_#1b73b9,_#2980b9)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="my-4 max-w-md mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h1 className="font-bold text-2xl mb-4">
                Email Address Verification
              </h1>
              <p className="text-gray-600 mb-4">
                Please enter the OTP sent to your email:
              </p>
              <OtpInput
                value={otp}
                onChange={setOTP}
                numInputs={6}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0.5rem 0",
                  fontSize: "1rem",
                  borderRadius: "0.25rem",
                  border: "1px solid rgba(0, 0, 0, 0.25)",
                }}
                shouldAutoFocus
                isInputNum
              />
              <button
                onClick={handleOTPRequest}
                className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[linear-gradient(135deg,_#1b73b9,_#2980b9)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Resend OTP
              </button>
              <div className="mt-4">
                <button
                  onClick={handleVerify}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[linear-gradient(135deg,_#1b73b9,_#2980b9)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 left-4 p-4 rounded-md shadow-md ${getToastBgColor()}">
          <div className="flex justify-between">
            <span className="text-white font-bold">{toast.message}</span>
            <button onClick={handleToastClose}>
              <HiX className="text-white" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

// Helper functions for date
function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function getCurrentDatePlus10Days() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 10);
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
}

function calculateSubtotal(products) {
  return (
    products?.reduce((total, product) => total + (product.price || 0), 0) || 0
  );
}

// Mock database and Firebase functions
const database = {
  /* mock database object */
};
const ref = (db, path) => ({ db, path });
const push = async (ref, data) => {
  console.log("Mock push to:", ref.path, data);
  return Promise.resolve({ key: "mock-key" });
};
const productData = [{ name: "Service Fee", price: 100 }];

export default Delivery;
