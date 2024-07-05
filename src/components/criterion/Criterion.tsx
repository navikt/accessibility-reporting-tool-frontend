import { Radio, RadioGroup } from '@navikt/ds-react';

const Criterion = (title: string, description: string) => {
  const handleChange = (val: string) => console.log(val);

  return (
    <div>
      <RadioGroup
        legend={title}
        onChange={handleChange}
        description={description}
      >
        <Radio value="10">10-20 år</Radio>
        <Radio value="20">21-45 år</Radio>
        <Radio value="40">46-80 år</Radio>
      </RadioGroup>
    </div>
  );
};
