import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";


import { DataContext } from "../../../context/DataProvider";
import axios from "axios";
import { deleteComment } from "../../../utils/APIRoutes";

const Component = styled(Box)`
  margin-top: 30px;
  background: #f5f5f5;
  padding: 10px;
`;

const Container = styled(Box)`
  display: flex;
  margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 800,
    font-size: 8px;
    margin-right: 20px;,
  
    

`;

const StyledDate = styled(Typography)`
  font-size: 10px;
  color: #878787;
  font-weight: 800;
`;

const DeleteIcon = styled(Delete)`
  margin-left: auto;
`;

const Image = styled("img")({
  width: 25,
  height: 25,
  borderRadius: "50%",

  marginBottom: "-7px",
});

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.delete(`${deleteComment}/${comment._id}`,{
        headers: {
          Authorization: token, // Include the token in the Authorization header
        },
      });
      console.log("Delete Comment Response:", response);
  
      if (response.status === 200) {
        setToggle((prev) => !prev); // Toggle the state to refresh the comments list
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error appropriately
    }
  };
  
  const url = "https://static.thenounproject.com/png/12017-200.png";

  return (
    <Component>
      <Container>
        <Name>
          {" "}
          <Image src={url}></Image>
          {comment.name}
        </Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === account.username && (
          <DeleteIcon onClick={() => removeComment()} />
        )}
      </Container>
      <Typography>{comment.comments}</Typography>
    </Component>
  );
};

export default Comment;
