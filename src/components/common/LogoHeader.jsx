import styled from "styled-components";
const url = require("../../assets/images/logo-solgas.png");

export const LogoHeader = styled.img`
  height: 35px;
  width: 133px;
`;

LogoHeader.defaultProps = {
  src: url
}