import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

//components
import Post from "./Post";
import { getAllPosts } from "../../../utils/APIRoutes";
import axios from "axios";

const Posts = () => {
  const [posts, getPosts] = useState([]);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(getAllPosts, {
          params: { category: category || "" },
          headers: {
            Authorization: token,
          },
        }); // Fetch posts with optional category filter

        console.log("Get All Posts Response:", response);

        if (response.status === 200) {
          getPosts(response.data); // Set posts data
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error appropriately
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
      {posts?.length ? (
        posts.map((post) => (
          <Grid item lg={3} sm={4} xs={12}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`details/${post._id}`}
            >
              <Post post={post} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box
          style={{
            color: "878787",
            margin: "30px 80px",
            fontSize: 18,
            fontStyle: "italic",
            color: "white",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          No data is available for selected category
        </Box>
      )}
    </>
  );
};

export default Posts;
