import { IPersonaSharedProps } from 'office-ui-fabric-react/lib/Persona';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISyncFusionSampleProps {
  description: string;
  context: WebPartContext;
}

export interface ISyncFusionSampleGrid {
  ID: number;
  Image: string;
  Name: string;
  Email: string;
  TKNumber: string;
  Initials: string;
  Role: string;
  Department: string;
  Practice: string;
  Industry: string;
  PracticeIndustryDepartment: string;
  Title: string;
  Offices: string;
  Phone: string;
  Extension: string;
  SecretaryName: string;
  SecretaryTK: string;
  Notary: boolean;
  PersonaObj: IPersonaSharedProps;
}