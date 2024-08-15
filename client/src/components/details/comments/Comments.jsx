import { useState, useEffect, useContext } from "react";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";

import { DataContext } from "../../../context/DataProvider";
import axios from "axios";


//components
import Comment from "./Comment";
import { getAllComments, newComment } from "../../../utils/APIRoutes";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)`
  height: 30px !important;
  width: 100%;
  margin: 0 20px;
`;

const initialValue = {
  name: "",
  postId: "",
  date: new Date(),
  comments: "",
};

const Comments = ({ post }) => {
  const url = "https://static.thenounproject.com/png/12017-200.png";

  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${getAllComments}/${post._id}`,{
          headers: {
            Authorization: token, // Include the token in the Authorization header
          },
        });
     
  
        if (response.status === 200 && response.data) {
          setComments(response.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        // Handle error appropriately
      }
    };
  
    getData();
  }, [toggle, post]);
  

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const addComment = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.post(newComment, comment,{
        headers: {
          Authorization: token, // Include the token in the Authorization header
        },
      }); // Pass the comment data
  
  
  
      if (response.status === 200) {
        setComment(initialValue); // Reset the comment input field
        setToggle((prev) => !prev); // Toggle the state to refresh the comments list
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      // Handle error appropriately
    }
  };
  

  return (
    <Box>
      <Container>
        <Image src={url} alt="dp" />
        <StyledTextArea
          // rowsMin={4}
          placeholder="Share Your Thoughts."
          onChange={(e) => handleChange(e)}
          value={comment.comments}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: 40 }}
          onClick={(e) => addComment(e)}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment comment={comment} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
