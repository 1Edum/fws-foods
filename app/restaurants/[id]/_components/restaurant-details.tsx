"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import { db } from "@/app/_lib/prisma";
import { Category, Prisma, Restaurant } from "@prisma/client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface RestaurantDetailsProps {
  restaurant: Pick<
    Restaurant,
    "name" | "imageUrl" | "deliveryFee" | "deliveryTimeMinutes"
  > & {
    categories: Category[]; // Supondo que 'categories' é uma matriz de strings
  };
}

const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div>
      <div className="rounded-t-3lg relative z-40 mt-[-1.5rem] rounded-3xl bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-6 w-6">
              <Image
                src={restaurant.imageUrl}
                alt={restaurant.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>
          <div className="flex items-center gap-[3px] rounded-full  bg-foreground px-2  py-[2px] text-white">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">5,0</span>
          </div>
        </div>
        <div>
          <DeliveryInfo restaurant={restaurant} />
        </div>
        <div className="flex gap-x-2 overflow-x-scroll">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[167px] rounded-lg bg-[#f4f4f4] px-5 text-center [&::-webkit-scrollbar]:hidden mt-3"
            >
              <span className="text-xs text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
