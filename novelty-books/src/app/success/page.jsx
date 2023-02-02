"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Success = () => {
  return (
    <div class="row " style={{ margin: 200 }}>
      <h1 class="card-title text-center" style={{ marginBottom: 35 }}>
        <strong>Thank you for your order!</strong>
      </h1>
      <p  class="card-text text-center" style={{fontSize:90}}><i class="bi bi-cart-check-fill"></i></p>
      <p class="card-text text-center">
        <strong>Check your email inbox for the receipt.</strong>
      </p>
      <div class="row mt-2" style={{ margin: 10 }}>
        <div class="col-lg-4 offset-lg-4">
          <Link href="/">
            <button
              type="button"
              className="btn btn-outline-dark"
              style={{ marginLeft: 50 }}
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
