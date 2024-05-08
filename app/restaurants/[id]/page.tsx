import React from "react";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantsDetails from "./_components/restaurants-details";
import { notFound } from "next/navigation";
import { db } from "@/app/_lib/prisma";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage: React.FC<RestaurantPageProps> = async ({ params: { id } }) => {
  try {
    const restaurant = await db.restaurant.findUnique({
      where: {
        id,
      },
      include: {
        categories: true
      }
    });

    if (!restaurant) {
      return notFound();
    }

    return (
      <div>
        <RestaurantImage restaurant={restaurant} />
        <RestaurantsDetails restaurant={{...restaurant, categories: restaurant.categories}} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return <div>Error fetching restaurant</div>;
  }
};

export default RestaurantPage;
