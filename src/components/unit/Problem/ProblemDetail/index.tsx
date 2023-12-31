import { PropsWithChildren, memo } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { IProblem } from 'types/api';
// import ProblemRenderTitle from '../ProblemRenderTitle';
// import ResultImage from 'components/@shared/ResultImage';
import * as S from './style';
import ProblemDetailContent from '../ProblemDetailContent';
import ProblemDetailSubmit from '../ProblemDetailSubmit';
import ProblemDetailTitle from '../ProblemDetailTitle';
import { useParams } from 'react-router-dom';
import { useGetProblem } from 'hooks/@query/problem/useGetProblem';
import { useSelectAnswerProblem } from 'hooks/@query/problem/useSelectAnswerProblem';
import ResultImage from 'components/commons/ResultImage';

interface ProblemDetailProps {
  problem: IProblem;
  Answer: string;
  isAnswer: boolean;
  isAction: boolean;
  timeCheck: boolean;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  isLoading: boolean;
}

const ProblemDetail = ({
  isLoading,
  problem,
  isAnswer,
  isAction,
  timeCheck,
  Answer,
  register,
  handleSubmit,
  onSubmit,
  children,
}: PropsWithChildren<ProblemDetailProps>) => {
  const { problemId } = useParams();
  // const problem = useGetProblem(problemId as string);
  // const { register, handleSubmit } = useForm<FieldValues>();

  if (!problem) {
    return <div>Loading...</div>;
  }

  // const SelectAnswerProblem = useSelectAnswerProblem({ handleIsLoading, handleIsAnswer, actionAnimations });

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <ProblemDetailTitle problem={problem} />
      {children}
      <ResultImage
        isAnswer={isAnswer}
        isAction={isAction}
        timeCheck={timeCheck}
      />
      <ProblemDetailContent problem={problem} register={register} />
      <ProblemDetailSubmit
        timeCheck={timeCheck}
        isAnswer={isAnswer}
        Answer={Answer}
        isLoading={isLoading}
      />
    </S.Form>
  );
};

export default ProblemDetail;
