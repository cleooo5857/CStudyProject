import {
  setTitle,
  setDescription,
  setPageNumber,
} from 'hooks/@redux/filterSlice';
import { useCallback } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stroe';
import { WorkbookFilterStoreType } from 'types/workbook';

const useWorkbookFilter = () => {
  const dispatch = useDispatch();

  const workbookFilter = useSelector(
    (state: RootState) => state.rootReducer.workbookfilter,
  );

  const handlePage = useCallback(
    (page: number) => {
      dispatch(setPageNumber(page));
    },
    [workbookFilter],
  );

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    ({ search }) => {
      dispatch(setTitle(search));
      //   dispatch(setDescription(search));
    },
    [workbookFilter],
  );

  return {
    workbookFilter,
    handlePage,
    onSubmit,
  };
};

export default useWorkbookFilter;
