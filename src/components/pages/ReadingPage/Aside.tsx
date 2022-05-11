import styled from 'styled-components';
import axios from 'axios';

import { IconButton } from '../../common/Button';
import { message } from '../../Message/Message';
import debounce from '../../../utils/debounce';
import CommentIcon from '../../../static/icon/comment.png';
import ShareIcon from '../../../static/icon/share.png';
import LikeIcon from '../../../static/icon/like.png';

const StyledButtonBar = styled.aside`
  height: fit-content;
  position: sticky;
  display: flex;
  flex-direction: column;
  padding: 1em;
  top: 160px;
  left: 2em;
  z-index: 2;
  min-width: 150px;

  & > * {
    margin: 2em 0;
  }

  @media (max-width: 530px) {
    padding: 0 1em;
    justify-content: space-between;
    width: 100%;
    top: unset;
    flex-direction: row;
    position: fixed !important;
    background-color: ${(props) => props.theme.foregroundColor};
    bottom: 0;
    left: 0;
    flex-direction: row;
    box-shadow: 0px 0px 3px rgb(0 0 0 / 0.5);

    & > * {
      margin: 0 1em;
    }
  }
`;

function Aside(props) {
  const { isChapter, itemId } = props;

  const handleShare = () => {
    // 创建输入框
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'absolute';
    textarea.style.clip = 'rect(0 0 0 0)';
    // 赋值
    textarea.value = window.location.href;
    // 选中
    textarea.select();
    // 复制
    const result = document.execCommand('copy', true);
    if (result) message.success('链接已复制到剪贴板!');
    else message.error('再试一次！');
  };

  const handleLike = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const increaseLikes = async () => {
      try {
        if (isChapter) {
          await axios.put(
            `/api/notes/${itemId}`,
            {
              addLikes: true,
            },
            {
              headers: {
                contentType: 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
        } else {
          await axios.put(
            `/api/articles/${itemId}`,
            {
              addLikes: true,
            },
            {
              headers: {
                contentType: 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            },
          );
        }

        message.success('谢谢你的赞哦!');
      } catch (error) {
        message.error(error?.response?.data?.message || error.message);
      }
    };

    if (user) {
      increaseLikes();
    } else {
      message.warn('您还未登录!');
    }
  };

  return (
    <StyledButtonBar>
      <IconButton
        width="28"
        icon={LikeIcon}
        desription="点赞"
        handler={debounce(handleLike, 600)}
      />
      <a href="#comment">
        <IconButton width="28" icon={CommentIcon} desription="评论" />
      </a>
      <IconButton
        width="28"
        icon={ShareIcon}
        desription="分享"
        handler={debounce(handleShare, 600)}
      />
    </StyledButtonBar>
  );
}

export default Aside;
