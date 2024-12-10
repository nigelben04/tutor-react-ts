import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  Button,
} from "@mui/material";
import { IProduct } from "../interfaces/IProduct";
import { dummyProducts } from "../services/dummyData";
import defaultImage from "../assets/default-product-image.png";
import ContentDivider from "../components/ContentDivider";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { categoryId, categoryName, productId, productTitle } = useParams<{
    categoryId?: string;
    categoryName?: string;
    productId?: string;
    productTitle?: string;
  }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);

  const maxDescriptionLength = 200;

  useEffect(() => {
    setLoading(true);

    if (productId) {
      const parsedProductId = parseInt(productId, 10);
      if (!isNaN(parsedProductId)) {
        const foundProduct = dummyProducts.find(
          (product) => product.id === parsedProductId
        );
        setProduct(foundProduct || null);
        setSelectedImage(foundProduct?.images[0] || null);
      }
    }

    setLoading(false);
  }, [productId]);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultImage;
  };

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const totalPrice = product ? quantity * product.price : 0;

  return (
    <Container disableGutters maxWidth={false} sx={{ mb: "100px" }}>
      <Header />
      <ContentDivider useLine={true} />
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/category-list">
            Category
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/Category/${categoryId}/${categoryName}`}
          >
            {categoryName}
          </Link>
          <Typography color="text.primary">{productTitle}</Typography>
        </Breadcrumbs>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : product ? (
          <Box>
            <Grid container direction={"row"} spacing={2} marginTop={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ padding: 2, textAlign: "center" }}>
                  <img
                    src={selectedImage || defaultImage}
                    alt={product.title}
                    style={{
                      width: "90%",
                      height: "auto",
                      borderRadius: "1%",
                    }}
                    onError={handleImageError}
                  />
                </Box>
                <Box display="flex" justifyContent="center" marginTop={2}>
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      margin={0.5}
                      width={"50px"}
                      height={"50px"}
                      sx={{
                        cursor: "pointer",
                        border:
                          selectedImage === image
                            ? "2px solid #4caf50"
                            : "2px solid transparent",
                        borderRadius: "2%",
                      }}
                      onClick={() => handleImageSelect(image)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - ${index + 1}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "2%",
                        }}
                        onError={handleImageError}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={5} paddingRight={1.5}>
                <Stack spacing={3}>
                  <Typography variant="h4">{product.title}</Typography>
                  <Typography variant="h4" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <ContentDivider useLine={true} />

                  <Typography variant="body1">
                    {showFullDescription ||
                    product.description.length <= maxDescriptionLength
                      ? product.description
                      : `${product.description.substring(
                          0,
                          maxDescriptionLength
                        )}...`}
                  </Typography>

                  {product.description.length > maxDescriptionLength && (
                    <Button
                      disableRipple
                      onClick={handleToggleDescription}
                      color="success"
                      sx={{
                        textTransform: "none",
                        padding: 0,
                        fontWeight: "bold",
                      }}
                    >
                      {showFullDescription ? "Show Less" : "Show More"}
                    </Button>
                  )}

                  <ContentDivider useLine={true} />

                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      <Box
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src="https://i.imgur.com/LDOO4Qs.jpg"
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>

                      <Stack>
                        <Stack direction={"row"} alignItems={"center"}>
                          <Box
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src="https://images.tokopedia.net/img/official_store/badge_os.png"
                              alt=""
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Typography fontWeight={"bold"}>
                            Store Name
                          </Typography>
                        </Stack>
                        <Typography fontWeight={"bold"} color={"green"}>
                          • Online
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack width={"98px"} height={"32px"}>
                      <Button
                        variant="outlined"
                        fullWidth
                        color="success"
                        sx={{ fontWeight: "bold" }}
                      >
                        Follow
                      </Button>
                    </Stack>
                  </Stack>

                  <ContentDivider useLine={true} />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box
                  border={1.9}
                  borderColor={"#BFC9D9"}
                  borderRadius={3}
                  padding={1}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight={"bold"}
                  >
                    Adjust The Quantity
                  </Typography>

                  <Stack
                    direction="row"
                    border={1}
                    borderRadius={2}
                    borderColor="#BFC9D9"
                    marginRight={16}
                    width={100}
                    height={30}
                    alignItems="center"
                    px={1}
                  >
                    <Button
                      onClick={() => setQuantity((c) => Math.max(c - 1, 1))}
                      size="small"
                      sx={{
                        minWidth: 0,
                        padding: 0,
                        "&:hover": { backgroundColor: "#f0f0f0" },
                        color: "green",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      disabled={quantity <= 1}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "block" }}
                      >
                        <path
                          d="M20 12.75H4a.75.75 0 1 1 0-1.5h16a.75.75 0 1 1 0 1.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                    <Typography
                      fontWeight="medium"
                      variant="body1"
                      sx={{
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                    >
                      {quantity}
                    </Typography>
                    <Button
                      onClick={() => setQuantity((c) => c + 1)}
                      size="small"
                      sx={{
                        minWidth: 0,
                        padding: 0,
                        "&:hover": { backgroundColor: "#f0f0f0" },
                        color: "green",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "block" }}
                      >
                        <path
                          d="M20 11.25h-7.25V4a.75.75 0 1 0-1.5 0v7.25H4a.75.75 0 1 0 0 1.5h7.25V20a.75.75 0 1 0 1.5 0v-7.25H20a.75.75 0 1 0 0-1.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                  </Stack>

                  <ContentDivider useLine={true} />

                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    textAlign={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="subtitle2" color={"GrayText"}>
                      Subtotal
                    </Typography>
                    <Typography paddingRight={1.5} fontWeight={"bold"}>
                      ${totalPrice.toFixed(2)}
                    </Typography>{" "}
                  </Stack>

                  <ContentDivider useLine={true} />

                  <Stack direction={"column"} width={"auto"} spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleAddToCart}
                    >
                      Add To Cart
                    </Button>
                    <Button variant="outlined" color="success">
                      Buy Now
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Typography>Product not found</Typography>
        )}
      </Container>
    </Container>
  );
};

export default ProductDetail;
