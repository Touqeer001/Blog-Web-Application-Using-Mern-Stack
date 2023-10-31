import { styled, Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;

  flex-direction: column;
  height: 350px;
  background: white;
  & > img,
  & > p {
    padding: 0 5px 5px 0px;
  }
`;

const Image = styled("img")({
  width: "100%",
  objectFit: "cover",
  borderRadius: "10px 10px 0 0",
  height: 150,
});

const Text = styled(Typography)`
  font-size: xx-small;
  font-style: italic;
  font-family: cursive;
  font-weight: bolder;
  color: black;
`;

const Heading = styled(Typography)`
  // font-size: 18px;
  // font-weight: 600
  // color: red
  color: black;
  text-align: center;
  font-size: medium;
  font-style: italic;

  font-family: auto;
  font-weight: inherit;
`;

const Details = styled(Typography)`
    
    word-break: break-word;
    font-weight: 900;
    font-style: inherit;
    color:black
    font-family: monospace;
    font-size: 14px;
}
`;

const Post = ({ post }) => {
  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80";

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <Container>
      <Image src={url} alt="post" />
      <Text>{post.categories}</Text>
      <Heading style={{ color: "Black", textAlign: "center" }}>
        {addEllipsis(post.title, 20)}
      </Heading>
      <Text>Author-Name: {post.username}</Text>
      <Details>Details:{addEllipsis(post.description, 100)}</Details>
    </Container>
  );
};

export default Post;

// import { styled, Box, Typography } from '@mui/material';
// const Post=({Post})=>{
//     return(
//         <Box>
//             <img src={Post.picture} alt="blog"></img>
//             <Typography>{Post.categories}</Typography>
//             <Typography>{Post.title}</Typography>
//             <Typography>{Post.username}</Typography>
//             <Typography>{Post.description}</Typography>
//         </Box>
//     )

// }
// export default Post;
