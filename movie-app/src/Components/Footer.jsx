import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/Logo.png'; // 🟡 Adjust the path as needed


function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <Brand>          <img src={Logo} alt="Logo" style={{ height: '55px' }} /> 
        </Brand>
        <NavLinks>
          <a href="/home">Home</a>
          <a href="https://github.com/rohitgavhane">Github</a>
          <a href="https://www.linkedin.com/in/rohit-gavhane-127183209/">Linkdin</a>
          <a href="https://mail.google.com/mail/u/0/#inbox">Gmail</a>
        </NavLinks>
        <Copyright>
          © {new Date().getFullYear()} MovieVerse. Made with ❤️ by Rohit.
        </Copyright>
      </FooterContent>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background-color:#151515;
  color: #fff;
  padding: 40px 50px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: auto;
  text-align: center;
`;

const Brand = styled.h2`
  font-family: 'Segoe UI', sans-serif;
  font-size: 28px;
  margin-bottom: 10px;
  color: #1f80e0;
  letter-spacing: 1px;
`;

const NavLinks = styled.div`
  margin: 20px 0;
  a {
    color: #eee;
    text-decoration: none;
    margin: 0 15px;
    font-size: 15px;
    transition: color 0.3s ease;
    &:hover {
      color: #1f80e0;
    }
  }
`;

const Copyright = styled.p`
  font-size: 13px;
  opacity: 0.7;
`;

export default Footer;
