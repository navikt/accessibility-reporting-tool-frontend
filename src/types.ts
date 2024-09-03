export type CriterionType = {
  name: string;
  description: string;
  guideline: string;
  tools: string;
  number: string;
  breakingTheLaw: string;
  lawDoesNotApply: string;
  tooHardToComply: string;
  contentGroup: string;
  status: string;
  wcagUrl: string;
  helpUrl: string;
  wcagVersion: string;
  wcagLevel: string;
};

export type CriteriaProps = CriterionType[];

export type Team = {
  id: string;
  name: string;
  email: string;
  members: string[];
};

export type NewTeam = {
  name: string;
  email: string;
  members?: string[];
};

export type UserProps = {
  name: String;
  email: String;
  reports: Report[];
  teams: Team[];
};

export type Author = {
  email: string;
};

export type Report = {
  reportId: string;
  url: string;
  descriptiveName: string;
  team: Team;
  version: string; // Ask Rannveig what this is?
  testData: string; // Ask Rannveig what this is???
  author: Author;
  filters: string[];
  created: string; // Ask Rannveig why string?
  successCriteria: CriterionType[];
  lastChanged: string; // Ask Rannveig why string?
  contributers: string[]; // Ask Rannveig what this is?
  lastUpdatedBy: string;
  reportType: string;
  hasWriteAccess: boolean;
};

export type InitialReport = {
  name: string; // Changed to descriptiveName
  urlTilSiden: string; // Changed to url
  teamId: string; // Changed to just Id
};

export type InitializeAggregatedReport = {
  descriptiveName: string;
  url: string;
  notes: string;
  reports: string[];
};

export type AggregatedReport = {
  reportId: string;
  url: string;
  descriptiveName: string;
  team: Team;
  version: string; // Ask Rannveig what this is?
  testData: string; // Ask Rannveig what this is???
  author: Author;
  filters: string[];
  created: string; // Ask Rannveig why string?
  successCriteria: CriterionType[];
  lastChanged: string; // Ask Rannveig why string?
  contributers: string[]; // Ask Rannveig what this is?
  lastUpdatedBy: string;
  reportType: string;
  hasWriteAccess: boolean;
  fromTeams: [{ id: string; name: string }];
  fromReports: [
    {
      reportId: string;
      descriptiveNmae: string;
      url: string;
      team: Team;
      reportType: string;
      lastChanged: string;
    },
  ];
};
