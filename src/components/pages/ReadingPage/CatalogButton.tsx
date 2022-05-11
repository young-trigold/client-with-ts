import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { toggleCatalogVisible } from './CataLogVisibleSlice';

import ListIcon from '../../../static/icon/list.png';
import CacelIcon from '../../../static/icon/cancel.png';
import { IconButton } from '../../common/Button';

function CatalogButton() {
  const [isCacel, setIsCacel] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsCacel(!isCacel);
    dispatch(toggleCatalogVisible());
  };

  return <IconButton icon={isCacel ? CacelIcon : ListIcon} width="24" description="目录" handler={handleClick} />;
}

export default CatalogButton;
