
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
   
    color: antiquewhite;
    font-style: oblique;
    font-family: cursive;
    

`;
const SubHeadings=styled(Typography)`

color: white;
    text-align: center;
    background: cadetblue;
    border: 35px;
    border-radius: 52px;
    // padding: 0px 49px -12px 25px;
    margin: -15px 199px;

`

const AboutHeadings=styled(Typography)`
font-size: 20px;
background: #FFFFFF;
align-items: center;
justify-content: center;
margin-bottom: 21px;
border-radius: 23px;
font-size: 60px;
padding: 0 13px;
font-family: cursive;
font-style: italic;
font-weight: 500;`

const Contact = () => {
    return (
        <Box>
            <Banner ><AboutHeadings>Blog For U</AboutHeadings></Banner>
            <Wrapper>
                < SubHeadings variant="h3">Getting in touch is easy!</ SubHeadings>    
                <Text variant="h5">
                    Reach out to me on
                    <Link href="" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="touqeeransari001@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;