import { FieldValues, useForm } from 'react-hook-form';
import useWorkbookFilter from 'hooks/Workbook/useWorkbookFilter';
import useGetWorkbookList from 'hooks/@query/workbook/useGetWorkbookList';
import { WorkbookList } from 'types/api';
import ContentBodyWrapper from 'components/commons/ContentBodyWrapper';
import * as S from './style';
import NoData from 'components/commons/NoData';
import ContentHeaderWrapper from 'components/commons/ContentHeaderWrapper';
import ContentContainer from 'components/commons/ContentContainer';
import Pagination from 'components/commons/Pagination';
import WorkbookCards from 'components/unit/Workbook/WorkbookCards';

const Workbook = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      search: '',
    },
  });
  const { workbookFilter, handlePage, onSubmit } = useWorkbookFilter();
  console.log(workbookFilter);

  const workbookList = useGetWorkbookList({
    page: workbookFilter.pageNumber,
    title: workbookFilter.title,
    description: workbookFilter.description,
  });
  console.log(workbookList);

  const handleReset = () => {
    reset();
    // workbookFilter.reset();
  };

  return (
    <ContentContainer>
      <ContentHeaderWrapper adminLink="문제집생성 ">
        <S.SearchWrapper>
          <S.SearchInput
            type="text"
            {...register('search', { required: true })}
          />
          <button onClick={handleSubmit(onSubmit)} className="navy xl style">
            검색
          </button>
          <button onClick={handleReset} className="ml xl  revert">
            버튼
          </button>
        </S.SearchWrapper>
      </ContentHeaderWrapper>
      <ContentBodyWrapper>
        {workbookList?.totalElements === 0 && (
          <NoData>문제집이 없습니다.</NoData>
        )}
        <WorkbookCards workbookList={workbookList as WorkbookList} />
        {/* {(workbookList?.totalPages as number) > 1 && (
              )} */}
        <S.PaginationWrapper>
          <Pagination
            totalPages={workbookList?.totalPages as number}
            handlePage={handlePage}
            page={workbookFilter.pageNumber}
            white
          />
        </S.PaginationWrapper>
      </ContentBodyWrapper>
    </ContentContainer>
  );
};

export default Workbook;
