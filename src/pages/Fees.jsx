import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import Navbar from '../components/NavbarStudent';
import Footer from '../components/Footer';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { QRCodeCanvas } from "qrcode.react";
import { Toast } from "flowbite-react";
import { HiCheck, HiX, HiExclamation } from "react-icons/hi";
import PhoneInput from "react-phone-input-2";

function Delivery() {
    const location = useLocation();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [deliveryPhone, setDeliveryPhone] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const paymentUrl = "https://your-payment-link.com";
    const [showAmountField, setShowAmountField] = useState(false);
    const [amount, setAmount] = useState("");
    const [otp, setOTP] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [formOpen, setFormOpen] = useState(true);
    const [userId, setUserID] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [phone, setPhone] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    
    // Mock database and Firebase functions for demo
    const database = { /* mock database object */ };
    const ref = (db, path) => ({ db, path });
    const push = async (ref, data) => {
        console.log('Mock push to:', ref.path, data);
        return Promise.resolve({ key: 'mock-key' });
    };
    const calculateSubtotal = (products) => {
        return products?.reduce((total, product) => total + (product.price || 0), 0) || 0;
    };
    const productData = [{ name: 'Service Fee', price: 100 }]; // Mock product data

    // const showToast = (message, type) => {
    //     setToast({ show: true, message, type });
    // };
    const showToast = (message, type, success = false, onClose = null) => {
        setToast({ show: true, message, type });
    
        if (onClose) {
          setTimeout(() => {
            onClose(); // Execute callback after toast is dismissed
          }, 3000); // Adjust timeout based on your toast duration
        }
      };

    // Function to close toast
    const handleToastClose = () => {
        setToast({ show: false, message: "", type: "" });
    };

    // const handleOTPRequest = async (e) => {
    //     e.preventDefault();

    //     if (!email) {
    //         showToast("Please enter your email.", "warning");
    //         return;
    //     }

    //     try {
    //         const otpResponse = await fetch("http://localhost:5000/api/send-otp-payment", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email }),
    //         });

    //         const responseText = await otpResponse.text();

    //         if (otpResponse.ok) {
    //             showToast(responseText, "success");
    //             setOtpSent(true);
    //             setFormOpen(false);
    //         } else {
    //             showToast(responseText || "Failed to send OTP.", "error");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         showToast("An error occurred. Please try again.", "error");
    //     }
    // };

    // const handleVerify = async (e) => {
    //     e.preventDefault();

    //     if (!otp) {
    //         setOtpError("Please enter the OTP.");
    //         showToast("Please enter the OTP.", "warning");
    //         return;
    //     }

    //     try {
    //         const otpVerificationResponse = await fetch("http://localhost:5000/api/verify-otp-payment", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email, otp }),
    //         });

    //         if (otpVerificationResponse.ok) {
    //             setEmailVerified(true);
    //             setFormOpen(true);
    //             showToast("OTP verified successfully!", "success");
    //         } else {
    //             const errorMessage = await otpVerificationResponse.text();
    //             setOtpError(errorMessage);
    //             showToast(errorMessage, "error");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         setOtpError("An error occurred while verifying OTP.");
    //         showToast("An error occurred while verifying OTP.", "error");
    //     }
    // };
    const handleOTPRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/send-mobile-otp", { phone });

            if (response.data.success) {
                showToast("OTP sent successfully!", "success", true);
                setOtpSent(true);
            } else {
                showToast("Failed to send OTP.", "error");
            }
        } catch (error) {
            console.error("❌ Error sending OTP:", error);

            if (error.response) {
                showToast(`${error.response.data.message}`, "error");
            } else {
                showToast("Unexpected error. Please try again.", "error");
            }
        }
    };

    const handleVerify = async () => {
        if (!phone || !phoneOtp) {
            showToast("Please enter your phone number and OTP.", "warning");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/verify-mobile-otp", {
                phone: phone.trim(),
                otp: phoneOtp.trim()
            });

            if (response.data.success) {
                setOtpVerified(true);
                // showToast("OTP verified successfully!", "success", true);

                // ✅ Ensure phone is stored correctly
                setPhone(response.data.phone || phone);
            } else {
                showToast("Invalid OTP. Please try again.", "warning");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            showToast(error.response?.data?.message || "Error verifying OTP. Please try again.", "error");
        }
    };

    function getCurrentDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        return `${day}/${month}/${year}`;
    }
    function getCurrentDatePlus10Days() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 10);
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        return `${day}/${month}/${year}`;
    }
    // const handleCheckOut = async (e) => {
    //     e.preventDefault();
    //     if (emailVerified === true) {
    //         const ordersRef = ref(database, 'orders');
    //         try {
    //             var currDate = getCurrentDate();
    //             var deliveryDate = getCurrentDatePlus10Days();
    //             console.log(productData);
    //             var totalAmount = calculateSubtotal(productData);
    //             console.log(totalAmount)
    //             await push(ordersRef, {
    //                 customerName: name,
    //                 customerContact: phoneNumber,
    //                 customerEmail: email,
    //                 addressDetails: {
    //                     addressLine1: address,
    //                     area: area,
    //                     city: city,
    //                     state: state,
    //                     pinCode: postalCode,
    //                     landmark: landmark,
    //                     deliveryPhone: deliveryPhone
    //                 },
    //                 itemDetails: {
    //                     paymentMode: selectedPaymentOption,
    //                     totalCost: totalAmount,
    //                     itemDetails: productData
    //                 },
    //                 delivery: {
    //                     orderedOn: currDate,
    //                     estimatedDelivery: deliveryDate,
    //                     status: 'Order Placed'
    //                 }
    //             }).then(() => {
    //                 navigate('/checkout');
    //             });
    //         }
    //         catch (error) {
    //             console.error('Error writing to Firebase:', error);
    //         }
    //     }
    //     else {
    //         alert('Please verify your email address');
    //     }
    // }
    const handleCheckOut = async (e) => {
        e.preventDefault();
        if (emailVerified === true) {
            const ordersRef = ref(database, "orders");
            try {
                var currDate = getCurrentDate();
                var deliveryDate = getCurrentDatePlus10Days();
                var totalAmount = calculateSubtotal(productData);

                await push(ordersRef, {
                    customerName: name,
                    customerContact: phoneNumber,
                    customerEmail: email,
                    addressDetails: {
                        addressLine1: address,
                        area: area,
                        city: city,
                        state: state,
                        pinCode: postalCode,
                        landmark: landmark,
                        deliveryPhone: deliveryPhone,
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
            showToast("Please verify your phone number before proceeding.", "warning");
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    }
    const handleAreaChange = (event) => {
        setArea(event.target.value);
    }
    const handleLandmarkChange = (event) => {
        setLandmark(event.target.value);
    }
    const handlePinChange = (event) => {
        setPostalCode(event.target.value);
    }
    const handleStateChange = (event) => {
        setState(event.target.value);
    }
    const handleCityChange = (event) => {
        setCity(event.target.value);
    }
    const handleDeliveryPhoneChange = (event) => {
        setDeliveryPhone(event.target.value);
    }
    return (
        <>
            <Navbar />
            {(formOpen) ? (<div className="mx-auto my-4 max-w-4xl md:my-6">
                <div className='bg-gray-200 p-8 '>
                    <h1 className='font-bold text-2xl'>Payment Information</h1>
                </div>
                <div className="overflow-hidden  rounded-xl shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="px-5 py-6 text-gray-900 md:px-8">
                            <div className="flow-root">
                                <div className="-my-6 divide-y divide-gray-200">
                                    <div className="py-6">

                                        <form>
                                            <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                                                <div>
                                                    <h3
                                                        id="contact-info-heading"
                                                        className="text-lg font-semibold text-gray-900"
                                                    >
                                                        Contact information
                                                    </h3>

                                                    <div className="mt-4 w-full">
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                                                            htmlFor="name"
                                                        >
                                                            Full Name
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                                            type="text"
                                                            placeholder="Enter your name"
                                                            id="name"
                                                            value={name}
                                                            onChange={handleNameChange}
                                                            required></input>

                                                        {/* <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="number"
                                                        >
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                                            type="number"
                                                            placeholder="Enter your phone number"
                                                            id="name"
                                                            pattern="^\d{10}$"
                                                            title="Please enter a 10-digit phone number"
                                                            required
                                                            value={phoneNumber}
                                                            onChange={handlePhoneChange}
                                                        /> */}
                                                        <label
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            htmlFor="email"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                                            type="email"
                                                            placeholder="Enter your email address"
                                                            id="email"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                            required
                                                        />
                                                        <div className="flex flex-col space-y-4" style={{ marginBottom: "5px" }}>
                                                            <div className="relative">
                                                                <label style={{ marginBottom: "0" }}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    Phone Number
                                                                </label>
                                                                <PhoneInput
                                                                    country={"us"}
                                                                    value={phone}
                                                                    onChange={(formattedValue) => setPhone(formattedValue)}
                                                                    inputStyle={{ width: "100%", height: "48px" }}
                                                                />
                                                                {!otpSent ? (
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleOTPRequest}
                                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300"
                                                                        style={{ marginTop: "12px" }}
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
                                                                            style={{ marginTop: "5px" }}
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleVerify}
                                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-300"
                                                                            style={{ marginTop: "31px" }}
                                                                        >
                                                                            Verify Otp
                                                                        </button>
                                                                        {otpError && <span className="error">{otpError}</span>}
                                                                    </>
                                                                ) : (
                                                                    <span className="text-green-500"></span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {otpVerified ? (<><div class="mt-2 bg-yellow-100 border-l-4 border-green-500 p-4">
                                                            <div class="flex items-center">
                                                                <div class="p-2">
                                                                    <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 10l2 2 4-4"></path>
                                                                    </svg>
                                                                </div>
                                                                <div class="ml-2">
                                                                    <p class="text-green-500 text-lg font-semibold">Phone Number Verified</p>
                                                                    <p class="text-gray-700">You can now proceed with your payment.</p>
                                                                </div>
                                                            </div>
                                                        </div></>) : (<><div class="mt-2 bg-yellow-100 border-l-4 border-yellow-500 p-4">
                                                            <div class="flex items-center">
                                                                <div class="p-2">
                                                                    <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16v-4m0-6h.01"></path>
                                                                    </svg>
                                                                </div>
                                                                <div class="ml-2">
                                                                    <p class="text-red-500 text-lg font-semibold">Please Note:</p>
                                                                    <p class="text-gray-700">You cannot proceed with payment unless your phone is verified.</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="mt-3 w-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                                                onClick={handleOTPRequest}
                                                            >
                                                                Verify Phone Number
                                                            </button>
                                                        </div></>)}
                                                    </div>

                                                </div>
                                                <hr className="my-8" />

                                                <div className="mt-10">
                                                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>

                                                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                                        <div className="sm:col-span-3">
                                                            <label
                                                                htmlFor="address"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Address
                                                            </label>
                                                            <div className="mt-1 mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="address"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={address}
                                                                    placeholder="Enter your address"
                                                                    onChange={handleAddressChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <label
                                                                htmlFor="address"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Area, Colony, Street
                                                            </label>
                                                            <div className="mt-1 mb-3">
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="area"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={area}
                                                                    placeholder="Enter area colony street"
                                                                    onChange={handleAreaChange}
                                                                    required
                                                                />
                                                            </div>
                                                            <label
                                                                htmlFor="address"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Landmark
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="address"
                                                                    name="landmark"
                                                                    autoComplete="street-address"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={landmark}
                                                                    placeholder="Enter landmark"
                                                                    onChange={handleLandmarkChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="city"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                City
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="city"
                                                                    name="city"
                                                                    autoComplete="address-level2"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={city}
                                                                    placeholder="Enter city"
                                                                    onChange={handleCityChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="region"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                State / Province
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="text"
                                                                    id="region"
                                                                    name="region"
                                                                    autoComplete="address-level1"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={state}
                                                                    placeholder="Enter state"
                                                                    onChange={handleStateChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label
                                                                htmlFor="postal-code"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Postal code
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    type="number"
                                                                    id="postal-code"
                                                                    name="postal-code"
                                                                    autoComplete="postal-code"
                                                                    className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    value={postalCode}
                                                                    placeholder="Enter postal-code"
                                                                    onChange={handlePinChange}
                                                                    pattern="\d{6}"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className='mt-3'>
                                                        <label
                                                            htmlFor="postal-code"
                                                            className="block text-sm font-medium text-gray-700"
                                                        >
                                                            Phone Number
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="number"
                                                                name="deliveryPIN"
                                                                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                value={deliveryPhone}
                                                                onChange={handleDeliveryPhoneChange}
                                                                pattern="\d{10}"
                                                            />
                                                        </div>
                                                    </div> */}
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product List */}
                        <div className="bg-gray-100 px-5 py-6 md:px-8">
                            <hr className="mt-6 border-gray-200" />
                            <form action="#" className="mt-6">
                                {/* Payment Options Dropdown */}
                                <div className="sm:flex sm:space-x-2.5 md:flex-col md:space-x-0 lg:flex-row lg:space-x-2.5">
                                    <div className="flex-grow">
                                        <label htmlFor="paymentOptions" className="block text-sm font-medium text-gray-700 mb-1">
                                            Select Payment Type
                                        </label>
                                        <select
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1" style={{ cursor: "pointer" }}
                                            id="paymentOptions"
                                            onChange={(e) => setSelectedPaymentOption(e.target.value)}
                                            value={selectedPaymentOption}
                                            required
                                        >
                                            <option value="Choose Payment Method">
                                                Choose Payment Method
                                            </option>
                                            <option value="razorPay">RazorPay</option>
                                            <option value="billDesk">Stripe</option>
                                        </select>
                                    </div>
                                </div>

                                <div className=" text-center text-gray-600 font-medium">Or</div>

                                {/* QR Code Option */}
                                <div style={{ marginTop: "10px", cursor: "pointer" }}>
                                    <p
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                                        onClick={() => setShowQRCode(!showQRCode)}
                                    >
                                        Scan QR
                                    </p>

                                    {showQRCode && (
                                        <div className="mt-4 p-4 border rounded-md text-center bg-white shadow-md">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Scan this QR Code to Pay</p>
                                            <div className="relative inline-block">
                                                {/* QR Code */}
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
                            </form>

                            {/* Payment Button & Amount Input */}
                            <div className="mt-4 flex justify-end items-center space-x-4">
                                {selectedPaymentOption && (
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        className="w-[245px] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" style={{ marginTop: "18px" }}
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                )}
                                <button
                                    type="button"
                                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    // onClick={() => alert(`Paying ₹${amount}`)}
                                    onClick={handleCheckOut}
                                >
                                    Make payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>) :
                (<div className="mx-auto my-4 max-w-md md:my-6 rounded-lg">
                    <div className="bg-white shadow-lg rounded-lg">
                        <div className='bg-gray-200 p-8 '>
                            <h1 className='font-bold text-2xl'>Email Address Verification</h1>
                        </div>
                        <p className="text-gray-600 mb-4 pl-8">Please enter the OTP sent to your email:</p>
                        <div className="relative mb-6" style={{ paddingLeft: 70 }}>
                            <OtpInput
                                value={otp}
                                onChange={setOTP}
                                numInputs={6}
                                renderSeparator={<span> </span>}
                                inputType="tel"
                                containerStyle={{ display: 'unset' }}
                                inputStyle={{
                                    width: "3rem",
                                    height: "3.5rem",
                                    border: "1px solid #000",
                                    borderRadius: "0.5rem",
                                    fontSize: "1.25rem",
                                    textAlign: "center",
                                }}
                                renderInput={(props) => <input {...props} className='otp-input'

                                />}
                            />
                            <button className='text-black' style={{ marginLeft: 226 }} onClick={handleOTPRequest}>Resend OTP</button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="mt-3 w-full bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                onClick={handleVerify}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                </div>)}
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed bottom-4 left-4 flex flex-col gap-4">
                    <Toast className="flex items-center w-full p-4">
                        <div className="flex items-center">
                            <div
                                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg 
                        ${toast.type === "success" ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200" : ""}
                        ${toast.type === "error" ? "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200" : ""}
                        ${toast.type === "warning" ? "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200" : ""}
                    `}
                            >
                                {toast.type === "success" && <HiCheck className="h-5 w-5" />}
                                {toast.type === "error" && <HiX className="h-5 w-5" />}
                                {toast.type === "warning" && <HiExclamation className="h-5 w-5" />}
                            </div>

                            {/* Message with spacing */}
                            <div className="ml-4 text-sm font-normal flex-1">{toast.message}</div>

                            {/* Cancel Button - Pushed Right */}
                            <button
                                onClick={handleToastClose}
                                className="ml-auto flex items-center hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-md text-sm"
                            >
                                <HiX className="w-5 h-5" />
                            </button>
                        </div>
                    </Toast>
                </div>
            )}



            <Footer />
        </>
    )
}

export default Delivery