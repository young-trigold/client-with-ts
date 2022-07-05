import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/store';
import { HeadingInfo } from './Heading';

export interface CatalogItemProps {
  key: string;
  href: string;
  heading: HeadingInfo;
  level: number;
  currentHeading: string;
}

const StyledCatalogItem = styled.a<CatalogItemProps>`
  width: fit-content;
  margin: 2px ${(props) => `${(props.level - 1) * 1.5}em`};
  margin-left: 0;
  color: ${(props) =>
    props.heading.content === props.currentHeading ? props.theme.primaryColor : 'inherit'};
  transition: all 0.3s;

  &::before {
    display: inline-block;
    vertical-align: bottom;
    margin-right: 0.5em;
    content: '';
    width: 5px;
    height: ${(props) => (props.heading.content === props.currentHeading ? '1.2em' : '0')};
    background-color: ${(props) => props.theme.primaryColor};
    transition: all 0.3s;
  }

  &:active {
    color: ${(props) => props.theme.primaryColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.surfaceColor};
  }
`;

export interface CatalogProps {
  catalogVisible?: boolean;
  headings?: HeadingInfo[];
  currentHeading?: string;
}

const StyledCatalog = styled.nav<CatalogProps>`
  display: flex;
  flex-direction: column;
  flex: 3;
  height: fit-content;
  min-width: 300px;
  max-height: 550px;
  background-color: ${(props) => props.theme.foregroundColor};
  margin: 1em 0.5em;
  border-radius: 10px;
  box-shadow: 0 0 8px ${(props) => props.theme.shadowColor};
  padding: 1em;
  user-select: none;
  overflow: auto;
  position: sticky;

  @media (min-width: 899.1px) {
    top: 66px;
  }

  @media (max-width: 899px) {
    margin: 0;
    bottom: 160px;
    right: 50%;
    max-height: 450px;
    transform: translate(50%, 0);
    position: fixed;
    display: ${(props) => (props.catalogVisible ? 'block' : 'none')};
    background-color: ${(props) => props.theme.surfaceColor};
  }
`;

function Catalog(props: CatalogProps) {
  const { headings, currentHeading } = props;

  const catalogVisible = useSelector((state: RootState) => state.catalogVisible.value);

  return (
    <StyledCatalog catalogVisible={catalogVisible}>
      {headings?.map((heading) => (
        <StyledCatalogItem
          href={`#${heading.content}`}
          key={heading.content}
          currentHeading={currentHeading ?? ''}
          level={heading.level}
          heading={heading}
        >
          {heading.content}
        </StyledCatalogItem>
      ))}
    </StyledCatalog>
  );
}

export default Catalog;
