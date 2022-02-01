import styled from "styled-components";
const url = require("../../assets/images/logo-solgas.png");
const url_dark = require("../../assets/images/logo-solgas-dark.png");

export const LogoHeader = styled.img`
  height: 35px;
  width: 133px;
`;

LogoHeader.defaultProps = {
  src: url
}

export const LogoHeaderDark = styled.img`
  height: 35px;
  width: 133px;
`;

LogoHeaderDark.defaultProps = {
  src: url_dark
}