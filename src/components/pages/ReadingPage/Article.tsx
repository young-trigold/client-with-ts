import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

import React from 'react';
import px from '../../../utils/realPixel';
import LoadingIndicator from '../../LoadingIndicator/LoadingIndicator';
import '../../../theme/katex.min.css';
import materialDark from '../../../theme/codeThemeDark.json';
import materialLight from '../../../theme/codeThemeLight.json';
import Heading from './Heading';
import { RootState } from '../../../app/store';

const StyledArticle = styled.article`
  background-color: ${(props) => props.theme.foregroundColor};
  background-image: linear-gradient(
      to right,
      ${(props) => props.theme.lineColor} ${px()},
      transparent 0
    ),
    linear-gradient(to bottom, ${(props) => props.theme.lineColor} ${px()}, transparent 0);
  background-size: 1.2em 1.2em;
  border-radius: 10px;
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColor};
  line-height: 1.5em;
  padding: 0 1em;
  overflow-wrap: break-word;

  & img {
    width: 100%;
    margin: auto;
    margin-left: -2em;
  }

  & h1 {
    text-align: center;
  }

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
    border-bottom: 1px solid ${(props) => props.theme.backgroundColor};
  }

  & thead > tr {
    border-radius: 1em;
  }

  & tbody > tr:hover {
    background-color: ${(props) => props.theme.backgroundColor};
  }

  & thead > tr:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }

  & thead {
    background-color: ${(props) => props.theme.primaryColor};
  }

  & table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    table-layout: fixed;
    margin: auto;
    background-color: ${(props) => props.theme.surfaceColor};
    margin: 1em 0;
  }

  & code:not([class^='language']) {
    white-space: normal;
    overflow: auto;
    background-color: ${(props) => props.theme.codeMask};
    font-family: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace';
    border-radius: 4px;
    padding: 0 4px;
  }

  @media (max-width: 400px) {
    & code[class^='language'] {
      font-size: 14px !important;
    }
  }

  & p {
    text-indent: 2em;
  }

  & li > p {
    text-indent: 0 !important;
  }

  @media (max-width: 530px) {
    border-radius: 0;
    margin: 0;
  }
`;

export interface CodeProps {
  inline: boolean;
  className: string;
  children?: React.ReactNode;
}

const Code = (props: CodeProps) => {
  const themeMode = useSelector((state: RootState) => state.themeMode.value);
  const { inline, className, children } = props;
  const match = /language-(\w+)/.exec(className || '');

  return !inline && match ? (
    <SyntaxHighlighter
      showLineNumbers
      showInlineLineNumbers
      lineNumberStyle={{ minWidth: '3em', marginLeft: '0' }}
      style={themeMode === 'dark' ? materialDark : materialLight}
      language={match[1]}
    >
      {String(children).trim()}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};

export interface ArticleProps {
  content: string;
  loading: boolean;
  setCurrentHeading: Function;
}

function Article(props: ArticleProps) {
  const { content, loading, setCurrentHeading } = props;

  return (
    <StyledArticle>
      {loading ? (
        <LoadingIndicator text="内容马上就好" />
      ) : (
        <ReactMarkdown
          components={{
            code: Code,
            h2: (properties) => Heading(properties, setCurrentHeading),
            h3: (properties) => Heading(properties, setCurrentHeading),
          }}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      )}
    </StyledArticle>
  );
}

export default Article;
