import { useQuery } from "@apollo/client";
import React from "react";
import getProducts from "../graphQl/products/getProducts";
import { CircularProgress, Grid2 as Grid } from "@mui/material";
import { useAsyncError } from "react-router-dom";
import { ProductCard } from "./ProductCard";

export default function TopProducts() {
  const { data, loading } = useQuery(getProducts);

  if (loading) return <CircularProgress />;
  return (
    <Grid container size={12} spacing={2.5}>
      {data?.products?.map((prod, i) => (
        <Grid size={4}>
          <ProductCard product={prod} index={i} key={prod.id} />
        </Grid>
      ))}
    </Grid>
  );
}
