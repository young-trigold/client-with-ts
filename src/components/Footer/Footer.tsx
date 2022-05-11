import styled from 'styled-components';

const StyledFooter = styled.footer`
  min-width: 340px;
  min-height: 200px;
  background-color: ${(props) => props.theme.foregroundColor};
  box-shadow: 0px 0px 2px ${(props) => props.theme.shadowColor};
  padding: 0 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 767px) {
    flex-direction: column;
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const StyledDivider = styled.hr`
  margin: 0 1em;

  @media (max-width: 767px) {
    & {
      margin: 1em 0;
    }
  }
`;

const StyledContact = styled.section`
  & > address {
    margin: 0.5em 0;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <section>
        <p>
          <span>&copy;</span>
          <span>{`${new Date().getFullYear()} `}</span>
          <span>by Trigold. All rights reserved.</span>
        </p>
        <p>
          <a href="https://beian.miit.gov.cn/#/Integrated/index">陕ICP备2022000714号</a>
        </p>
      </section>
      <StyledDivider />
      <StyledContact>
        <h2>联系方式</h2>
        <address>
          <span>Gmail:</span>
          <a href="mailto:cluscandlot@gmail.com">cluscandlot@gmail.com</a>
        </address>
        <address>
          <a href="https://github.com/young-trigold">我的 Github</a>
        </address>
      </StyledContact>
      <StyledDivider />
      <nav>
        <h2>站外链接</h2>
        <li>
          <a href="https://developer.mozilla.org/zh-CN/">MDN 文档</a>
        </li>
        <li>
          <a href="https://zh-hans.reactjs.org/">React 官网</a>
        </li>
      </nav>
    </StyledFooter>
  );
}

export default Footer;
