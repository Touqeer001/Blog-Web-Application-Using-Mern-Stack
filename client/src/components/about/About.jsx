
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
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
    color: white;
`;
const Heading=styled(Typography)`
color: white;
text-align: center;
font-size: 56px;
font-family: cursive;
font-weight: revert;
font-style: oblique;

`
const AboutHeading=styled(Typography)`
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
font-weight: 500;


`
const About = () => {

    return (
        <Box>
            
            <Banner> <AboutHeading>Blog For U</AboutHeading></Banner>
           
            <Wrapper>
                <Heading variant="h3">Blog For U</Heading>
                {/* <Typography>Create Your Blog.Read up to date information in all fields</Typography> */}
                <Text variant="h5">I'am a full satck devloper Specilaization in MERN Technology.
      
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                   Want to Talk wit me ? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:touqeeransari001@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;