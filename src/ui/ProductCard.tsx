import React from "react";
import { Button, Card, Grid2 as Grid, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export function ProductCard({ product, index }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/product/${[product.id]}`)}
      className=" group cursor-pointer  !bg-orange-100"
    >
      <img
        src={
          product.photo || `https://random.imagecdn.app/500/150?random=${index}`
        }
        className=" group-hover:scale-110 group-hover:skew-x-2 transition-transform w-full  h-32 object-cover  "
      />

      <div className=" p-2   text-black ">
        <Typography
          className="   group-hover:text-orange-900 !line-clamp-2 !h-[2lh]  transition-colors !mb-2  !font-semibold  ~sm/xl:!~text-lg/2xl"
          variant="h4"
        >
          {product.name}
        </Typography>
        <div className=" flex gap-4 px-2 items-center justify-between">
          <div>
            <Typography
              variant="caption"
              className=" grow"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.description ||
                " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, laborum vero facilis iure deserunt molestias? Magni quos nesciunt est autem, ratione voluptate dolore, doloremque animi laborum expedita maiores nisi veritatis!"}
            </Typography>
          </div>
          <div>
            <button className=" !bg-cyan-700  hover:!bg-cyan-800 text-white font-bold rounded-lg  ~md/lg:~text-sm/base   ~md/lg:~px-2/3 py-2 flex gap-2 items-center ">
              Buy
              <ShoppingCartIcon className=" ~md/lg:!~text-base/lg " />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
