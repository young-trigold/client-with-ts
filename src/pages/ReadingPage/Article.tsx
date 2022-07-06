import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import React from 'react';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import Heading from './Heading';
import LoadingIndicator from '../../components/LoadingIndicator';
import px from '../../utils/realPixel';

import '../../theme/katex.min.css';
import materialLight from '../../theme/codeThemeLight.json';
import materialDark from '../../theme/codeThemeDark.json';
import { RootState } from '../../app/store';

const StyledArticle = styled.article`
  margin: 0 1em;
  content-visibility: auto;
  background-color: ${(props) => props.theme.foregroundColor};
  background-image: linear-gradient(
      to right,
      ${(props) => props.theme.shadowColor} ${px()},
      transparent 0
    ),
    linear-gradient(to bottom, ${(props) => props.theme.shadowColor} ${px()}, transparent 0);
  background-size: 1.2em 1.2em;
  border-radius: 6.4px;
  line-height: 1.5em;
  box-shadow: 0px 0px 1px ${(props) => props.theme.shadowColor};
  padding: 0 1em;
  overflow-wrap: break-word;

  @media (max-width: 400px) {
    & code[class^='language'] {
      font-size: 14px !important;
    }
  }

  @media (max-width: 530px) {
    border-radius: 0;
    margin: 0;
    line-height: 1.3em;
  }

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
    padding: 8px;
  }

  & tbody > tr:hover {
    background-color: ${(props) => props.theme.surfaceColor};
  }

  & thead > tr:hover {
    background-color: ${(props) => props.theme.hoverColor};
  }

  & thead {
    color: ${(props) => props.theme.foregroundColor};
    background-color: ${(props) => props.theme.primaryColor};
  }

  & table {
    border-collapse: collapse;
    border-radius: 6.4px;
    width: 100%;
    text-align: center;
    table-layout: fixed;
    margin: auto;
    background-color: ${(props) => props.theme.foregroundColor};
    margin: 1em 0;
    box-shadow: 0 0 8px ${(props) => props.theme.shadowColor};

    & tr:nth-of-type(even) {
      background-color: ${(props) => props.theme.backgroundColor};
    }
  }

  & > pre {
    font-size: 16px !important;
    line-height: 1.5em;
    border: none !important;
    border-radius: 6.4px;
    box-shadow: 0 0 8px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.foregroundColor} !important;

    @media (max-width: 400px) {
      font-size: 14px !important;
      line-height: 1.2em;
    }
  }

  // inline-code
  & code:not([class^='language']) {
    white-space: normal;
    overflow: auto;
    color: ${(props) => props.theme.foregroundColor};
    background-color: ${(props) => props.theme.activeColor};
    font-family: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace';
    padding: 1px;
    border-radius: 4px;
  }

  & p {
    text-indent: 2em;
  }

  & li > p {
    text-indent: 0 !important;
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
      style={
        themeMode === 'dark'
          ? (materialDark as { [key: string]: React.CSSProperties })
          : (materialLight as { [key: string]: React.CSSProperties })
      }
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
            code: Code as CodeComponent,
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
