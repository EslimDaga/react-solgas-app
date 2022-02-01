import styled from "styled-components";
const url = require("../../assets/images/logo-solgas-dark.png");

export const CenterLogoDark = styled.div`
  text-align: -webkit-center;
  margin-bottom: 0.75rem;
`;

export const LogoImageDark = styled.img`
  height: 70px;
  width: 250px;
`;

LogoImageDark.defaultProps = {
  src: url,
};