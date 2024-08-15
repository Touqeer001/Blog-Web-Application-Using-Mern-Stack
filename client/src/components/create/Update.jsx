import React, { useState, useEffect } from "react";

import {
  Box,
  styled,
  TextareaAutosize,
  Button,
  FormControl,
  InputBase,
} from "@mui/material";
import { AddCircle as Add } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { getPostById, updatePost, uploadFile } from "../../utils/APIRoutes";

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

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "codeforinterview",
  categories: "Tech",
  createdDate: new Date(),
};

const Update = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");

  const { id } = useParams();

  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const response = await axios.get(`${getPostById}/${id}`, {
          headers: {
            Authorization: token, // Include the token in the Authorization header
          },
        });

        if (response.status === 200 && response.data) {
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        // Handle error appropriately
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const response = await axios.post(uploadFile, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200 && response.data) {
            const imageUrl = response.data; // Ensure this is the image URL/path
            setPost((prevPost) => ({ ...prevPost, picture: imageUrl })); // Update post if it's state
            setImageURL(imageUrl); // Update imageURL state if needed
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          // Optionally, set an error state or display an error message
        }
      }
    };

    getImage();
  }, [file]); // Trigger when 'file' changes

  const updateBlogPost = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const response = await axios.put(`${updatePost}/${post._id}`, post, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        navigate(`/details/${id}`); // Navigate to the post details page
      }
    } catch (error) {
      console.error("Error updating post:", error);
      // Handle error appropriately
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <img src={imageURL} alt="Uploaded" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          onChange={(e) => handleChange(e)}
          value={post.title}
          name="title"
          placeholder="Title"
        />
        <Button
          onClick={() => updateBlogPost()}
          variant="contained"
          color="primary"
        >
          Update
        </Button>
      </StyledFormControl>

      <StyledTextArea
        rowsMin={5}
        placeholder="Tell your story..."
        name="description"
        onChange={(e) => handleChange(e)}
        value={post.description}
      />
    </Container>
  );
};

export default Update;
