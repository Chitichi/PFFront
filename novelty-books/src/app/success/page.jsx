"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Success = () => {
  return (
    <div class="row  " style={{margin: 150 }}>
      <div class="col-lg-4 offset-lg-4">
        <div class="card border-secondary mb-3">
          <div class="card-body">
            <h2 class="card-title text-center">Thank you for your order!</h2>
            <p class="card-text text-center">
              Check your email inbox for the receipt.
            </p>
            <div class="row">
              <div class="col-lg-4 offset-lg-4">
                <Link href="/">
                  <button type="button" class="btn btn-outline-dark" >
                    Continue Shopping <i class="bi bi-bag-fill "></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
