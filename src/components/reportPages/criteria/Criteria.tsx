import useSWRImmutable from 'swr/immutable';
import Criterion from '.././criterion/Criterion';
import type { CriterionProps } from '@src/types';
import { apiUrl } from '@src/urls';
import { fetcher } from '@src/utils/api.client';

const Criteria = () => {
  const { data, isLoading } = useSWRImmutable(
    { url: `${apiUrl}/criteria` },
    fetcher,
  );

  return (
    <div>
      {data?.map((criterion: CriterionProps) => (
        <Criterion
          key={criterion.WCAGId}
          title={criterion.title}
          description={criterion.description}
          WCAGId={criterion.WCAGId}
          state={criterion.state}
        />
      ))}
    </div>
  );
};
export default Criteria;
