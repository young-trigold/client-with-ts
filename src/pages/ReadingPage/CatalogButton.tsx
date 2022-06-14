import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { toggleCatalogVisible } from './CataLogVisibleSlice';
import { IconButton } from '../../components/Button';

import ListIcon from '../../static/icon/list.png';
import CacelIcon from '../../static/icon/cancel.png';
import { RootState } from '../../app/store';

function CatalogButton() {
  const catalogVisible = useSelector((state: RootState) => state.catalogVisible.value);
  const [isCacel, setIsCacel] = useState(catalogVisible);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsCacel(!isCacel);
    dispatch(toggleCatalogVisible());
  };

  return (
    <IconButton
      icon={isCacel ? CacelIcon : ListIcon}
      width={24}
      description="目录"
      handler={handleClick}
    />
  );
}

export default CatalogButton;
