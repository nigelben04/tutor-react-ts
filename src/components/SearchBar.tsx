import { Box, Container, Input, Typography, Paper } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "../assets/SearchIcon";
// import { fetchData } from "../services/productService";
import { IProduct } from "../interfaces/IProduct";
import { dummyProducts } from "../services/dummyData";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [products, setProducts] = useState<{ id: number; title: string }[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>("#b5b5b5");

  const handleChange = (value: string) => {
    setInput(value);

    // USE API
    // fetchData().then((allProducts) => {
    //   const filteredProducts = allProducts
    //     .filter((product: IProduct) =>
    //       product.title.toLowerCase().includes(value.toLowerCase())
    //     )
    //     .map((product: IProduct) => ({
    //       id: product.id,
    //       title: product.title,
    //     }));
    //   setProducts(filteredProducts);
    // });

    // DUMMY DATA
    const filteredProducts = dummyProducts
      .filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
      .map((product) => ({
        id: product.id,
        title: product.title,
      }));
    setProducts(filteredProducts);
  };

  const handleSelectProduct = (product: { id: number; title: string }) => {
    setInput(product.title);
    setProducts([]);
    setIsFocused(false);
    setBorderColor("#BFC9D9");
  };

  const handleFocus = () => {
    setIsFocused(true);
    setBorderColor("green");
  };

  const handleBlur = () => {
    setIsFocused(false);
    setBorderColor("#BFC9D9");
  };

  return (
    <Container
      maxWidth="lg"
      className="search-bar"
      sx={{ position: "relative" }}
    >
      <Box
        width="100%"
        height={38}
        border={1}
        borderColor={borderColor}
        borderRadius={1.8}
        paddingX={1}
        alignItems={"center"}
        display={"flex"}
        marginRight={10}
        onFocus={() => setBorderColor("green")}
      >
        <SearchIcon color="gray" size={22} />
        <Input
          fullWidth
          disableUnderline
          sx={{ mx: 1 }}
          value={input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
        />
      </Box>
      {isFocused && products.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 40,
            left: 38,
            width: "95%",
            maxHeight: 300,
            overflowY: "auto",
            zIndex: 10,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              p={1}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
              onClick={() => handleSelectProduct(product)}
            >
              <Typography>{product.title}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default SearchBar;
