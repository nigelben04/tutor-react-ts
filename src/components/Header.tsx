import React from "react";
import Logo from "../assets/Logo";
import SmartphoneIcon from "../assets/SmartphoneIcon";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import CategoryButton from "./CategoryDropdown";
import CartDropdown from "./CartDropdown";

const Header = () => {
  return (
    <Container disableGutters maxWidth={false}>
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        fontFamily={"Arial"}
        fontSize={12.7}
        paddingX={4}
        paddingY={0.5}
        sx={{
          bgcolor: "#F0F3F7",
        }}
      >
        <Stack direction={"row"} display={"flex"} alignItems="center">
          <SmartphoneIcon size={22} />
          <Link
            href="https://www.tokopedia.com/mobile-apps/"
            underline="none"
            color={"gray"}
            sx={{
              ml: 1,
              "&:hover": {
                color: "green",
              },
            }}
          >
            Download Tokopedia App
          </Link>
        </Stack>
        <Box display={"flex"} gap={2}>
          <Link
            href="https://www.tokopedia.com/about/"
            underline="none"
            color={"gray"}
            sx={{
              "&:hover": {
                color: "green",
              },
            }}
          >
            Tentang Tokopedia
          </Link>
          <Link
            href="https://www.tokopedia.com/mitra"
            underline="none"
            color={"gray"}
            sx={{
              "&:hover": {
                color: "green",
              },
            }}
          >
            Mitra Tokopedia
          </Link>
          <Link
            href="https://seller.tokopedia.com/edu"
            underline="none"
            color={"gray"}
            sx={{
              "&:hover": {
                color: "green",
              },
            }}
          >
            Pusat Edukasi Seller
          </Link>
          <Link
            href="https://www.tokopedia.com/promo/"
            underline="none"
            color={"gray"}
            sx={{
              "&:hover": {
                color: "green",
              },
            }}
          >
            Promo
          </Link>
          <Link
            href="https://www.tokopedia.com/help/"
            underline="none"
            color={"gray"}
            sx={{
              "&:hover": {
                color: "green",
              },
            }}
          >
            Tokopedia Care
          </Link>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        spacing={6}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        mt={2}
        paddingX={4}
      >
        <Link href="/">
          <Logo />
        </Link>
        <CategoryButton />
        <SearchBar />

        <Stack
          direction={"row"}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <CartDropdown />

          <Stack>
            <Box width={1.4} height={24} bgcolor={"#f5f5f5"}></Box>
          </Stack>

          <Stack
            direction={"row"}
            textAlign={"center"}
            alignItems={"center"}
            spacing={1}
            sx={{ cursor: "pointer" }}
          >
            <Box
              style={{
                width: 36,
                height: 36,
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

            <Typography>Name</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Header;
