
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import ProductImage from "./_components/products-image";
import ProductsDetails from "./_components/products-details";
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

  
  if (!product) {
    return notFound();
  }
  
  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant:{
        id: product?.restaurant.id,
      }
    },
    include: {
      restaurant: true,
    },
  });
  
  return (
    <div>
      <ProductImage product={product} />
      <ProductsDetails product={product} extraProducts={juices}/>
    </div>
  );
};

export default ProductsPage;
