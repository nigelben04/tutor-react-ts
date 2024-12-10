import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ContentDivider from "../components/ContentDivider";
import { IProduct } from "../interfaces/IProduct";
import defaultImage from "../assets/default-product-image.png";
import { dummyProducts } from "../services/dummyData";
import Header from "../components/Header";

const ProductPerCategory = () => {
  const { categoryId, categoryName } = useParams<{
    categoryId?: string;
    categoryName?: string;
  }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 12;

  useEffect(() => {
    setLoading(true);

    if (categoryId && categoryName) {
      const parsedCategoryId = parseInt(categoryId, 10);
      if (!isNaN(parsedCategoryId)) {
        const filteredProducts = dummyProducts.filter(
          (product) => product.category.id === parsedCategoryId
        );
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        setProducts(paginatedProducts);
        setTotalProducts(filteredProducts.length);
      }
    }

    setLoading(false);
  }, [categoryId, categoryName, page]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultImage;
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleNavigateToProduct = (product: IProduct) => {
    navigate(
      `/product/${encodeURIComponent(categoryId!)}/${encodeURIComponent(
        categoryName!
      )}/${product.id}/${encodeURIComponent(product.title)}`
    );
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ mb: "100px" }}>
      <Header />
      <ContentDivider useLine={true} />
      <Container className="category-page-container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/category-list">
            Category
          </Link>
          <Typography color="text.primary">{categoryName}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" paddingTop={4}>
          Products in{" "}
          {categoryName ? decodeURIComponent(categoryName) : "Unknown Category"}{" "}
          Category
        </Typography>

        <ContentDivider useLine={false} />
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Grid container spacing={1}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
                  <Box
                    padding={1.3}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                    onClick={() => handleNavigateToProduct(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "2%",
                      }}
                      onError={handleImageError}
                    />
                    <Typography
                      variant="subtitle2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: "500",
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="h6">${product.price}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" marginTop={4}>
              <Pagination
                count={Math.ceil(totalProducts / productsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="standard"
              />
            </Box>
          </>
        )}
      </Container>
    </Container>
  );
};

export default ProductPerCategory;
