import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import { message } from '../../Message/Message';
import { StyledTable, StyledRow } from './StyledTable';
import { StyledButtonBar, IconButton, Button } from '../../common/Button';
import AddArticleModal from './AddArticleModal';
import AddIcon from '../../../static/icon/plus.png';

function AddButton(props) {
  const { currentOption } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <IconButton width={24} description="添加" icon={AddIcon} handler={handleClick} />
      <AddArticleModal
        isModalVisible={isModalVisible}
        currentOption={currentOption}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}

const StyledArticleBody = styled.main`
  flex: 8;
  overflow: auto;
  background-color: ${(props) => props.theme.backgroundColor};

  & > button {
    position: fixed;
    bottom: 50px;
    right: 2em;
  }
`;

function ArticleBody(props) {
  const { currentIndex, articles, tagOptions } = props;

  const deleteItem = (articleId) => {
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
  };

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
                  <Button onClick={() => deleteItem(article._id)} state="dange">
                    删除
                  </Button>
                  <Button>修改</Button>
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

export default ArticleBody;
