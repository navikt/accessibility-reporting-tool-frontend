import Criterion from '@components/criterion/Criterion';
import type { CriteriaProps } from '@src/types';

const Criteria = ({ criteria }: CriteriaProps) => (
  <div>
    {criteria.map((criterion) => (
      <Criterion
        key={criterion.WCAGId}
        title={criterion.title}
        description={criterion.description}
      />
    ))}
  </div>
);

export default Criteria;
