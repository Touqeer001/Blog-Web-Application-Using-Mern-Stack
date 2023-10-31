import { AppBar, Toolbar, styled, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Component = styled(AppBar)`
  background: teal;
  font-family: initial;
  font-weight: bolder;
  font-size: 12px;
  margin-bottom: -12px;
  margin-top: 5px;
`;

const Container = styled(Toolbar)`
    justify-content:  flex-end;
    padding-left: 42px;
  
    

    & > a {
        padding: 20px;
        color: #000;
        text-decoration: none;
        color:white;
 
        
    }
    }
`;
const Addcircle = styled(AccountCircleIcon)`
  font-size: 34px;
`;
const ImageStyle = styled("img")({
  width: 100,
  marginLeft: -607,
  marginTop: -12,

  // width: 98px;
  // margin-left: -607%;
  // height: auto;
});

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => navigate("/account");

  // const url='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dblogger%2BLogo&psig=AOvVaw0C5lgM-Xq715yaqetnVSXf&ust=1690201456616000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIiTmsaOpYADFQAAAAAdAAAAABAF'
  const url =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  return (
    <Component>
      <Container>
        <Toolbar>
          <ImageStyle src={url}></ImageStyle>
        </Toolbar>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/account">
          <AccountCircleIcon />
        </Link>
      </Container>
    </Component>
  );
};

export default Header;
