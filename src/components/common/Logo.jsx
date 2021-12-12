import styled from "styled-components";
const url = require("../../assets/images/logo-solgas.png");

export const CenterLogo = styled.div`
  text-align: -webkit-center;
  margin-bottom: 0.75rem;
`;

export const LogoImage = styled.img`
  height: 70px;
  width: 250px;
`;

LogoImage.defaultProps = {
  src: url
}