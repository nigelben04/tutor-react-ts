import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Box, Container, Grid, Typography, Pagination } from "@mui/material";
import ContentDivider from "../components/ContentDivider";
import { IProduct } from "../interfaces/IProduct";
import defaultImage from "../assets/default-product-image.png";
import Carousel from "../components/image-carousel/Carousel";
import { dummyProducts, dummyCategories } from "../services/dummyData";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    //USE API
    // const offset = (page - 1) * productsPerPage;
    // fetchDataPagination(offset, productsPerPage)
    //   .then((data) => {
    //     setProducts(data);
    //     setLoading(false);
    //     setTotalProducts(100); // Replace with actual total products count if available
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching products:", error);
    //     setLoading(false);
    //   });

    //DUMMY DATA
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = dummyProducts.slice(startIndex, endIndex);
    setProducts(paginatedProducts);
    setTotalProducts(dummyProducts.length);
    setLoading(false);
  }, [page]);

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
    const category = dummyCategories.find(
      (cat) => cat.id === product.category.id
    );
    const categoryName = category
      ? encodeURIComponent(category.name)
      : "Unknown";
    navigate(
      `/product/${product.category.id}/${categoryName}/${
        product.id
      }/${encodeURIComponent(product.title)}`
    );
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ mb: "100px" }}>
      <Header />
      <ContentDivider useLine={true} />

      <Container className="home-container">
        <Carousel
          images={[
            "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/7/fdb5e0aa-c4b1-427e-97dc-e7776153c114.jpg.webp?ect=4g",
            "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/6/27/d00dbb58-ecca-456f-97ac-8eca1f30aeb5.jpg.webp?ect=4g",
            "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/12/888bd43f-1fce-43cc-9c2c-76a4b2f05528.jpg.webp?ect=4g",
            "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/8/9/33ca5eef-5e31-436f-b417-df5e2df15782.jpg.webp?ect=4g",
          ]}
        />

        <ContentDivider useLine={false} />
        {loading ? (
          <></>
        ) : (
          <>
            <Grid container spacing={1}>
              {products.map((product) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={product.id}
                  onClick={() => handleNavigateToProduct(product)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <Box padding={1.3}>
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

export default Home;
