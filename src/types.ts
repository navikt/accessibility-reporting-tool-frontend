export type CriterionType = { [key: string]: string }; /*{
  title: string;
  description: string;
  WCAGId: string;
  state: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export type CriteriaProps = Criterion[];
*/

export type CriteriaProps = CriterionType[];

export type OrganizationUnit = {
  id: string;
  name: string;
  email: string;
  members: string[];
};

export type Author = {
  email: string;
  oid: string; // Ask Rannveig what this is?
};

export type Report = {
  reportId: string;
  url: string;
  descriptiveName: string;
  organizationUnit: OrganizationUnit;
  version: string; // Ask Rannveig what this is?
  testData: string; // Ask Rannveig what this is?
  author: Author;
  criteria: CriteriaProps;
  filters: string[];
  created: Date; // Ask Rannveig why string?
  lastChanged: Date; // Ask Rannveig why string?
  contributers: string[]; // Ask Rannveig what this is?
  lastUpdatedBy: string;
  reportType: string;
};
