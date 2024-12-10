import React, { useState, useCallback } from "react";
import {
  Badge,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CartIcon from "../assets/CartIcon";
import { useCart } from "../context/CartContext";
import defaultImage from "../assets/default-product-image.png";

const CartDropdown = () => {
  const { cart, totalQuantity } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setIsHovered(true);
      setIsDropdownOpen(true);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!isHovered) {
      setIsDropdownOpen(false);
    }
  }, [isHovered]);

  const handleDropdownMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsDropdownOpen(false);
  }, []);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <Box onMouseLeave={handleMouseLeave}>
      <IconButton onMouseEnter={handleMouseEnter}>
        <Badge badgeContent={totalQuantity} color="error">
          <CartIcon />
        </Badge>
      </IconButton>
      {isDropdownOpen && anchorEl && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 105,
            right: 100,
            width: 500,
            maxHeight: 400,
            overflowY: "auto",
            zIndex: 10,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: 2,
            borderRadius: 1,
            backgroundColor: "white",
          }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Typography variant="h6" gutterBottom>
            Cart Items ({cart.items.length})
          </Typography>
          {cart.items.length === 0 ? (
            <Typography>No items in cart.</Typography>
          ) : (
            <Stack spacing={1}>
              {cart.items.map((item) => (
                <Stack
                  key={item.id}
                  spacing={2}
                  direction={"row"}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    padding: 1,
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <Stack>
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      style={{
                        width: "75px",
                        height: "75px",
                        borderRadius: "2%",
                      }}
                      onError={handleImageError}
                    />
                  </Stack>
                  <Typography
                    variant="body2"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" fontWeight={"bold"}>
                    {item.quantity} x ${item.price}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default CartDropdown;
