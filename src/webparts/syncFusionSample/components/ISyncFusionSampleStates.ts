import { ISyncFusionSampleGrid } from './ISyncFusionSampleProps';

export interface ISyncFusionSampleStates {
    gridItems: ISyncFusionSampleGrid[];
    filters: {
        colArrayFilterRole: any;
        colArrayFilterDepartment: any;
        colArrayFilterTitle: any;
        colArrayFilterOffice: any;
        colArrayFilterPractice: any;
        colArrayFilterIndustry: any;
    };
    officeLinks: any;
}