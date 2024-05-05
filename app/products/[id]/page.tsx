
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import ProductImage from "./components/products-image";
import ProductsDetails from "./components/products-details";
interface ProductsPageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductsPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      <ProductsDetails product={product} extraProducts={juices}/>
    </div>
  );
};

export default ProductsPage;
