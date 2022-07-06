import styled from 'styled-components';
import React, { useCallback, useState } from 'react';
import axios from 'axios';

import { message } from '../../components/Message/Message';
import { StyledTable, StyledRow } from './StyledTable';
import { StyledButtonBar, Button, FloatingActionButton } from '../../components/Button';
import AddArticleModal from './AddArticleModal';

import AddIcon from '../../static/icon/plus.png';
import { ArticleInfo } from '../HomePage/HomePage';

const AddButton = React.memo((props: { currentOption: string }) => {
  const { currentOption } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [setIsModalVisible, isModalVisible]);

  return (
    <>
      <FloatingActionButton width={24} description="添加" icon={AddIcon} onClick={handleClick} />
      <AddArticleModal
        isModalVisible={isModalVisible}
        currentOption={currentOption}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
});

const StyledArticleBody = styled.main`
  flex: 8;
  overflow: auto;
  background-color: ${(props) => props.theme.backgroundColor};

  & > button {
    position: fixed;
    bottom: 4em;
    right: 4em;

    @media (max-width: 400px) {
      bottom: 4em;
      right: 2em;
    }
  }
`;

export interface ArticleBodyProps {
  currentIndex: number;
  articles: ArticleInfo[][];
  tagOptions: string[];
}

function ArticleBody(props: ArticleBodyProps) {
  const { currentIndex, articles, tagOptions } = props;

  const deleteItem = useCallback((articleId: string) => {
    const deleteArticle = async () => {
      try {
        await axios.delete(`/api/articles/${articleId}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') ?? '')?.token}`,
          },
        });
        message.success('删除成功!');
        window.location.reload();
      } catch (error) {
        if (axios.isAxiosError(error))
          return message.error((error.response?.data as { message: string })?.message);
        if (error instanceof Error) return message.error(error.message);
        return message.error(JSON.stringify(error));
      }
    };

    deleteArticle();
  }, []);

  return (
    <StyledArticleBody>
      <StyledTable>
        <thead>
          <tr>
            <th>项目</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {articles[currentIndex]?.map((article) => (
            <StyledRow key={article._id}>
              <td>{article.title}</td>
              <td>
                <StyledButtonBar>
                  <Button
                    onClick={() => deleteItem(article._id)}
                    state="dange"
                    size={window.matchMedia('(max-width: 400px)').matches ? 'small' : 'middle'}
                  >
                    删除
                  </Button>
                  <Button
                    size={window.matchMedia('(max-width: 400px)').matches ? 'small' : 'middle'}
                  >
                    修改
                  </Button>
                </StyledButtonBar>
              </td>
            </StyledRow>
          ))}
        </tbody>
      </StyledTable>
      <AddButton currentOption={tagOptions[currentIndex]} />
    </StyledArticleBody>
  );
}

export default React.memo(ArticleBody);
