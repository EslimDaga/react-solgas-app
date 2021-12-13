import styled from "styled-components";
const url = require("../../assets/images/logo-solgas.png");

export const LogoHeader = styled.img`
  height: 40px;
  width: 160px;
`;

LogoHeader.defaultProps = {
  src: url
}