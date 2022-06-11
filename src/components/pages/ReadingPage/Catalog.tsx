import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { HeadingInfo } from './Heading';

export interface CatalogItemProps {
  key: string;
  href: string;
  heading: HeadingInfo;
  level: number;
  currentHeading: string;
}

const StyledCatalogItem = styled.a<CatalogItemProps>`
  display: block;
  margin: 5px ${(props) => `${(props.level - 1) * 1.5}em`};
  border-left: ${(props) => (props.heading.content === props.currentHeading ? '5px' : '0')} solid
    ${(props) => props.theme.primaryColor};
  color: ${(props) =>
    props.heading.content === props.currentHeading ? props.theme.primaryColor : 'inherit'};

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
  flex: 3;
  height: fit-content;
  min-width: 300px;
  max-height: 550px;
  background-color: ${(props) => props.theme.foregroundColor};
  margin: 1em 0.5em;
  border-radius: 10px;
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColor};
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
