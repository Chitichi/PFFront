"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';





const Success = () => {

  


  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
        <i class="bi bi-bag-fill"></i>
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <Link href="/">
          <button type="button"class="btn btn-outline-dark">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success