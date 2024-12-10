import React, { useState, useCallback } from "react";
import { Button, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { dummyCategories } from "../services/dummyData";

const CategoryButton: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsDropdownOpen(true);
  }, []);

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

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    navigate(`/category/${categoryId}/${encodeURIComponent(categoryName)}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <Button
        variant="text"
        color="inherit"
        size="large"
        sx={{ textTransform: "none", width: "100%" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Kategori
      </Button>
      {isDropdownOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 60,
            left: -240,
            width: "100vw",
            maxHeight: 300,
            overflowX: "auto",
            overflowY: "hidden",
            zIndex: 10,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            boxSizing: "border-box",
            padding: 2,
            borderRadius: 1,
            backgroundColor: "white",
            paddingLeft: "20",
          }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <Stack direction="row" spacing={2}>
            {dummyCategories.map((category) => (
              <Stack
                direction="column"
                alignItems={"center"}
                justifyItems={"center"}
                justifyContent={"center"}
                key={category.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
                onClick={() => handleCategoryClick(category.id, category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    marginRight: 8,
                    paddingBottom: 6,
                  }}
                />
                <Typography variant="body2">{category.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      )}
    </div>
  );
};

export default CategoryButton;
