import { useState, useEffect, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";

import { DataContext } from "../../context/DataProvider";

// components
import Comments from "./comments/Comments";
import { deletePost, getPostById } from "../../utils/APIRoutes";
import axios from "axios";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const EditIcon = styled(Edit)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  color: white;
`;

const DeleteIcon = styled(Delete)`
  margin: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  font-size: 38px;
  // font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;

  color: antiquewhite;
  font-family: cursive;
  font-style: italic;
  font-weight: bold;
`;

const Author = styled(Box)(({ theme }) => ({
  color: "#878787",
  display: "flex",
  margin: "20px 0",
  color: "black",
  fontSize: "small",
  fontStyle: "italic",
  fontFamily: "math",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const Discription = styled(Typography)`
  font-size: 19px;
  font-style: normal;
  font-weight: 500;
  font-family: none;
  color: aliceblue;
`;
const DetailView = () => {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${getPostById}/${id}`, {
          headers: {
            Authorization: token, // Include the token in the Authorization header
          },
        }); 
   

        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        // Handle error appropriately
      }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const response = await axios.delete(`${deletePost}/${post._id}`, {
        headers: {
          Authorization: token, 
        },
      }); 
     

      if (response.status === 200) {
        navigate("/"); // Redirect to home after deletion
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error appropriately
    }
  };

  return (
    <Container>
       <Image src={post.picture || url} alt="post" />
      <Box style={{ float: "right" }}>
        {account.username === post.username && (
          <Box>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>
            <DeleteIcon onClick={() => deleteBlog()} color="error" />
          </Box>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Link
          to={`/?username=${post.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>
            Author: <span style={{ fontWeight: 600 }}>{post.username}</span>
          </Typography>
        </Link>
        <Typography style={{ marginLeft: "auto" }}>
          {new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>

      <Discription>{post.description}</Discription>
      <Comments post={post} />
    </Container>
  );
};

export default DetailView;
