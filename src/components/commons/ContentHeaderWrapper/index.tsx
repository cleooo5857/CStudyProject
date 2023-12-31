import { PropsWithChildren, useState, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../Input';
import StyleLink from '../StyleLink';

import * as Styled from './style';
import { isAdmin } from 'repository/auth';
import { useUpdateWorkbook } from 'hooks/@query/workbook/useUpdateWorkbook';

interface CreateContestProps {
  desc?: string;
  admin?: boolean;
  adminLink?: string;
}

const ContentHeaderWrapper = ({
  desc,
  admin,
  adminLink,
  children,
}: PropsWithChildren<CreateContestProps>) => {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { questionId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const handleIsLoading = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const handleIsActive = useCallback((isActive: boolean) => {
    setIsActive(isActive);
  }, []);

  const UpdateWorkbook = useUpdateWorkbook({ handleIsLoading, handleIsActive });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    data.id = questionId;
    UpdateWorkbook(data);
  };

  return (
    <Styled.Header>
      <div>
        {isAdmin() && admin && (
          <Styled.AdminWrapper>
            <button
              type="button"
              className="lg navy style"
              onClick={() => setIsActive(active => !active)}
            >
              문제집 정보 수정
            </button>
            {isActive && (
              <>
                <button
                  className="lg green style"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading}
                >
                  수정하기
                </button>
                <button
                  className="lg revert"
                  onClick={() => setIsActive(false)}
                  disabled={isLoading}
                >
                  취소
                </button>
              </>
            )}
          </Styled.AdminWrapper>
        )}
        {isAdmin() && adminLink && (
          <StyleLink className="lg navy style" to="admin/CreateWorkbook">
            {adminLink}
          </StyleLink>
        )}

        {desc && (
          <Styled.Desc>
            {isActive ? (
              <Input
                id="description"
                defaultValue={desc}
                register={register}
                errors={errors}
                required
              />
            ) : (
              desc
            )}
          </Styled.Desc>
        )}
      </div>
      {children}
    </Styled.Header>
  );
};

export default memo(ContentHeaderWrapper);
