import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: center;

  & td,
  & th {
    padding: 0.5rem;
  }

  & th {
    font-size: 18px;
    border-right: 1px solid ${(props) => props.theme.surfaceColor};
  }

  & th:last-of-type {
    border-right: 0;
  }

  & tr {
    border-bottom: 1px solid ${(props) => props.theme.surfaceColor};

    &:hover {
      background-color: ${(props) => props.theme.foregroundColor};
    }
  }

  & thead {
    position: sticky;
    top: 0;
    background-color: ${(props) => props.theme.foregroundColor};
  }
`;

const StyledRow = styled.tr`
  margin: 0em 1em;
`;

export { StyledTable, StyledRow };
