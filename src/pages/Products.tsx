import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import getProducts from "../graphQl/products/getProducts";
import {
  CircularProgress,
  Grid2 as Grid,
  Input,
  Pagination,
  TextField,
} from "@mui/material";
import { ProductCard } from "../ui/ProductCard";
import { Search, SearchOffOutlined } from "@mui/icons-material";
import { useParams, useSearchParams } from "react-router-dom";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));
  const searchString = searchParams.get("search");
  const [search, setSearch] = useState(searchString || "");
  const [searchInput, setSearchInput] = useState(search);

  const limit = 20;

  const { data, loading, refetch } = useQuery(getProducts, {
    variables: { limit, page, search: search },
  });

  const timeoutRef = useRef<string | number | NodeJS.Timeout | undefined>();
  const searchHighlightRef = useRef<boolean>(false);
  if (loading)
    return (
      <div className=" h-full w-full flex items-center justify-center">
        <CircularProgress size={200} />
      </div>
    );

  const products = data?.products?.products;
  const pageCount = Math.ceil(data?.products.count / limit);

  function handleSearch(x: React.ChangeEvent<HTMLInputElement>) {
    // clear previous timeout
    clearTimeout(timeoutRef.current);

    setSearchInput(x.target.value);
    timeoutRef.current = setTimeout(() => {
      // change search state => refetch products query
      setSearch(x.target.value);
      // update url
      setSearchParams((params) => {
        params.set("search", x.target.value);
        return params;
      });
    }, 1000);
  }

  if (!products) {
    return <h2 className=" text-3xl  capitalize mx-auto">no products found</h2>;
  }
  return (
    <Grid
      container
      className=" px-[5%] h-full w-full   "
      direction={"column"}
      spacing={2}
      wrap="nowrap"
    >
      <Grid>
        <div className=" flex justify-center mb-10">
          <Input
            style={{}}
            placeholder="search for product ..."
            endAdornment={<Search />}
            className=" w-[80%]   outline-none "
            value={searchInput}
            onChange={handleSearch}
            autoFocus={Boolean(search)}
            onFocus={() => {
              console.log("highlighted");
              searchHighlightRef.current = true;
            }}
            onBlur={() => {
              console.log("unhighlighted");

              searchHighlightRef.current = false;
            }}
            // sx={{
            //   "& .MuiInputBase-input::after": {
            //     transition: "none", // Disable transition for the input
            //   },
            //   "& .MuiInputBase-root::after": {
            //     transition: "none", // Disable transition for the root element
            //   },
            // }}
          />
        </div>
      </Grid>
      <Grid container spacing={2} alignItems={"stretch"}>
        {products?.map((p, i) => (
          <Grid size={{ lg: 2.4, md: 3, sm: 4 }} key={p.id || i}>
            <ProductCard product={p} index={i} />
          </Grid>
        ))}
      </Grid>

      <Grid
        className="mt-auto  py-10"
        justifySelf={"flex-end"}
        alignSelf={"center"}
      >
        <Pagination
          color="secondary"
          count={pageCount}
          onChange={(e, value) =>
            setSearchParams((params) => {
              params.set("page", `${value}`);
              return params;
            })
          }
          defaultPage={page || 1}
        />
      </Grid>
    </Grid>
  );
}
