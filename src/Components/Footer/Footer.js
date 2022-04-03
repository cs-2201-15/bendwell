import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__left">
        <div className="footer__left-logo">bendwell</div>
        <div className="footer__left-tp">
          <p>Terms of Service</p>
        </div>
        <div className="footer__left-tp">
          <p>Privacy</p>
        </div>
      </div>

      <div className="footer__icon">
        <InstagramIcon className="footer__icon-mui" />
        <TwitterIcon className="footer__icon-mui" />
        <FacebookIcon className="footer__icon-mui" />
      </div>
    </div>
  );
};

export default Footer;
