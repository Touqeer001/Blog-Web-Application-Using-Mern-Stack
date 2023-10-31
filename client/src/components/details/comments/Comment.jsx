import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";

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
  // width: 50,
  // height: 45,
  // border-radius: '50%'
  // margin-bottom: -13px.
});

const Comment = ({ comment, setToggle }) => {
  const { account } = useContext(DataContext);

  const removeComment = async () => {
    await API.deleteComment(comment._id);
    setToggle((prev) => !prev);
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
