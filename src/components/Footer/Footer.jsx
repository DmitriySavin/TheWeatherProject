import style from "./Footer.module.css";
import instagramm from "../../assets/images/instagramm.png";
import facebook from "../../assets/images/facebook.png";
import whatsapp from "../../assets/images/whatsapp.png";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.footerBlock}>
          <div className={style.logoBlock}>
            <a href="#" className={style.logoFooter}>
              <img src={logo} alt="Logo" className={style.logo} />
            </a>
          </div>

          <div className={style.addressBlock}>
            <h4 className={style.title}>Address</h4>
            <p className={style.text}>
              <span className={style.noWrap}>Svobody str. 35</span>
              <br />
              Kyiv <br />
              Ukraine
            </p>
          </div>
        </div>

        <div className={style.socialBlock}>
          <h4 className={style.title}>Contact us</h4>

          <div className={style.icons}>
            <img src={instagramm} alt="Instagram" className={style.icon} />

            <img src={facebook} alt="Facebook" className={style.icon} />

            <img src={whatsapp} alt="WhatsApp" className={style.icon} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
