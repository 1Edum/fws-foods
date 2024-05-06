"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma, Product } from "@prisma/client";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ProductsDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  extraProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductsDetails = ({ product, extraProducts }: ProductsDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantitYClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantitYClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });

  return (
    <div >
      <div className="relative p-5 z-40 rounded-t-3lg rounded-3xl mt-[-1.5rem] bg-white">
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage && (
                <DiscountBadge product={product} />
              )}
            </div>

            <div>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-muted-foreground">
                  De: {formatCurrency(Number(product.price))}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-center">
            <Button
              className="border border-solid border-muted-foreground"
              variant="ghost"
              size="icon"
              onClick={handleDecreaseQuantitYClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantitYClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <Card className="mt-6 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            <div>
              {Number(product.restaurant.deliveryFee) > 0 ? (
                <p className="text-xs font-semibold">
                  {formatCurrency(Number(product.restaurant.deliveryFee))}
                </p>
              ) : (
                <p className="text-sm font-semibold">Grátis</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            <div>
              {Number(product.restaurant.deliveryTimeMinutes) > 0 ? (
                <p className="text-xs font-semibold">
                  Min: {product.restaurant.deliveryTimeMinutes}
                </p>
              ) : (
                <p className="text-sm font-semibold">Grátis</p>
              )}
            </div>
          </div>
        </Card>

        <div className="mt-6 space-y-3">
          <h3 className="font-semibold-">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="px-5"> 
        <h3 className="font-semibold ">Sucos</h3>

        </div>
        <ProductList products={extraProducts} />

      </div>
    </div>
  );
};

export default ProductsDetails;
