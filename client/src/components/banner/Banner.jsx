import { styled, Box, Typography } from "@mui/material";

const Image = styled(Box)`
  width: 100%;
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg)
    center/55% repeat-x #000;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    // color: #FFFFFF;
    line-height: 1
    background: white;
    border-radius: 19px;

     color: black;
     margin: 0px 1px 12px;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #ffffff;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG for U.</Heading>
      <SubHeading>
        Create Your Own Blog. Read All Types of Blog any Where at any Time.
      </SubHeading>
    </Image>
  );
};

export default Banner;
