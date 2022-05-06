import * as React from 'react';
import { ISyncFusionSampleProps } from './ISyncFusionSampleProps';
import { ISyncFusionSampleStates } from './ISyncFusionSampleStates';
import { iconStyles, cssFilterDropDown, cssButtonMargin, siteTheme, cssLinkButton } from './Styles';
import "./sfstyles.css";

import { Grid, GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, Inject, Filter, Toolbar, ColumnChooser, ExcelExport, ExcelExportProperties, RowSelectEventArgs } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { MultiSelect, MultiSelectComponent, CheckBoxSelection } from '@syncfusion/ej2-react-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { enableRipple } from '@syncfusion/ej2-base';
import { SortOrder } from '@syncfusion/ej2-lists';
import "@syncfusion/ej2-fabric-theme/styles/fabric.css";
import { Icon } from '@fluentui/react';
import { Persona } from 'office-ui-fabric-react/lib/Persona';
import { sampleData } from './data';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Link } from 'office-ui-fabric-react/lib/Link';

enableRipple(true);

const cssPanelPadding = mergeStyles({ marginBottom: '4px' });

export default class SyncFusionSample extends React.Component<ISyncFusionSampleProps, ISyncFusionSampleStates> {
  public grid: Grid | null;
  public btnobj: ButtonComponent;
  private sortASCOrder: SortOrder = 'Ascending';
  public multiFilterRole: MultiSelect;
  public multiFilterDepartment: MultiSelect;
  public multiFilterTitle: MultiSelect;
  public multiFilterOffice: MultiSelect;
  public multiFilterPractice: MultiSelect;
  public multiFilterIndustry: MultiSelect;
  public chckFilterNotary: CheckBoxComponent;
  private toolbarOptions;
  private strCurrentDeleteFilter;
  public txtSearch: HTMLInputElement;
  public data = [];

  constructor(props: ISyncFusionSampleProps, state: ISyncFusionSampleStates) {
    super(props);

    this.data = sampleData;

    this.toolbarOptions = [{ template: this.toolbarFiltersTemplate.bind(this) }];
    this.strCurrentDeleteFilter = "";

    this.state = {
      gridItems: [],
      filters: {
        colArrayFilterRole: null,
        colArrayFilterDepartment: null,
        colArrayFilterTitle: null,
        colArrayFilterOffice: null,
        colArrayFilterPractice: null,
        colArrayFilterIndustry: null,
      },
      blnPanelOpen: false
    };
  }

  public fetchDefaultView() {
    // ----------------------- SETUP DROPDOWN DATASOURCES
    let tmpColArrayFilterRole = this.data.map((obj) => {
      return obj.Role;
    });
    let tmpColArrayFilterDepartment = this.data.map((obj) => {
      return obj.Department;
    });
    let tmpColArrayFilterTitle = this.data.map((obj) => {
      return obj.Title;
    });
    let tmpColArrayFilterOffice = this.data.map((obj) => {
      return obj.Offices;
    });
    let tmpColArrayFilterPractice = this.data.map((obj) => {
      return obj.Practice;
    });
    let tmpColArrayFilterIndustry = this.data.map((obj) => {
      return obj.Industry;
    });

    tmpColArrayFilterRole = tmpColArrayFilterRole.filter(this.onlyUnique);
    tmpColArrayFilterDepartment = tmpColArrayFilterDepartment.filter(this.onlyUnique);
    tmpColArrayFilterTitle = tmpColArrayFilterTitle.filter(this.onlyUnique);
    tmpColArrayFilterOffice = tmpColArrayFilterOffice.filter(this.onlyUnique);
    tmpColArrayFilterPractice = tmpColArrayFilterPractice.filter(this.onlyUnique);
    tmpColArrayFilterIndustry = tmpColArrayFilterIndustry.filter(this.onlyUnique);

    let arrFilterTmp = [];

    // UNIQUE DROPDOWN OFFICES
    arrFilterTmp = [];
    if (tmpColArrayFilterOffice.length > 0) {
      for (let i = 0; i < tmpColArrayFilterOffice.length; i++) {
        if (tmpColArrayFilterOffice[i] != undefined) {
          if (tmpColArrayFilterOffice[i].indexOf(", ")) {
            let arrFilterTmpTemp = tmpColArrayFilterOffice[i].split(", ");
            for (let j = 0; j < arrFilterTmpTemp.length; j++) {
              if (arrFilterTmpTemp[j] !== "") {
                arrFilterTmp.push(arrFilterTmpTemp[j]);
              }
            }
          } else {
            if (tmpColArrayFilterOffice[i] !== "") {
              arrFilterTmp.push(tmpColArrayFilterOffice[i]);
            }
          }
        }
      }
      tmpColArrayFilterOffice = arrFilterTmp.filter(this.onlyUnique);
    }

    // UNIQUE DROPDOWN PRACTICE
    arrFilterTmp = [];
    if (tmpColArrayFilterPractice.length > 0) {
      for (let i = 0; i < tmpColArrayFilterPractice.length; i++) {
        if (tmpColArrayFilterPractice[i] != undefined) {
          if (tmpColArrayFilterPractice[i].indexOf("; ")) {
            let arrFilterTmpTemp = tmpColArrayFilterPractice[i].split("; ");
            for (let j = 0; j < arrFilterTmpTemp.length; j++) {
              if (arrFilterTmpTemp[j] !== "") {
                arrFilterTmp.push(arrFilterTmpTemp[j]);
              }
            }
          } else {
            if (tmpColArrayFilterPractice[i] !== "") {
              arrFilterTmp.push(tmpColArrayFilterPractice[i]);
            }
          }
        }
      }
      tmpColArrayFilterPractice = arrFilterTmp.filter(this.onlyUnique);
    }

    // UNIQUE DROPDOWN INDUSTRY
    arrFilterTmp = [];
    if (tmpColArrayFilterIndustry.length > 0) {
      for (let i = 0; i < tmpColArrayFilterIndustry.length; i++) {
        if (tmpColArrayFilterIndustry[i] != undefined) {
          if (tmpColArrayFilterIndustry[i].indexOf("; ")) {
            let arrFilterTmpTemp = tmpColArrayFilterIndustry[i].split("; ");
            for (let j = 0; j < arrFilterTmpTemp.length; j++) {
              if (arrFilterTmpTemp[j] !== "") {
                arrFilterTmp.push(arrFilterTmpTemp[j]);
              }
            }
          } else {
            if (tmpColArrayFilterIndustry[i] !== "") {
              arrFilterTmp.push(tmpColArrayFilterIndustry[i]);
            }
          }
        }
      }
      tmpColArrayFilterIndustry = arrFilterTmp.filter(this.onlyUnique);
    }
    // ----------------------- END SETUP DROPDOWN DATASOURCES

    this.setState({
      gridItems: this.data,
      filters: {
        colArrayFilterRole: tmpColArrayFilterRole,
        colArrayFilterDepartment: tmpColArrayFilterDepartment,
        colArrayFilterTitle: tmpColArrayFilterTitle,
        colArrayFilterOffice: tmpColArrayFilterOffice,
        colArrayFilterPractice: tmpColArrayFilterPractice,
        colArrayFilterIndustry: tmpColArrayFilterIndustry,
      }
    });
  }

  public componentDidMount() {
    this.fetchDefaultView();
  }

  private gridRowTemplate(props) {
    const builtRow = [];

    builtRow.push(<td className={"e-rowcell"}><Link onClick={() => this.OpenProfilePanel()}><Persona {...props["PersonaObj"]} hidePersonaDetails /></Link></td>);
    builtRow.push(<td className={"e-rowcell"}><Link onClick={() => this.OpenProfilePanel()}>{props["Name"]}</Link></td>);

    builtRow.push(
      <td className={"e-rowcell"} style={{ textAlign: "center" }}>
          <Icon iconName="Mail" className={iconStyles.fileIconImg} style={{ color: siteTheme.palette.themePrimary }} />
      </td>
    );

    builtRow.push(<td className={"e-rowcell"}>{props["TKNumber"]}</td>);
    builtRow.push(<td className={"e-rowcell"}>{props["Initials"]}</td>);
    builtRow.push(<td className={"e-rowcell"}>{props["PracticeIndustryDepartment"]}</td>);
    builtRow.push(<td className={"e-rowcell"}>{props["Title"]}</td>);

    let tmpOffices = [];

    if (props["Offices"] !== null && props["Offices"] !== "" && props["Offices"].includes(", ")) {
      let splitOffices = props["Offices"].split(", ");

      for (let j = 0; j < splitOffices.length; j++) {
        tmpOffices.push(splitOffices[j]);
        tmpOffices.push(<br />);
      }
    } else if (props["Offices"] === "(Empty)") {
      tmpOffices = null;
    } else {
      tmpOffices = props["Offices"];
    }

    builtRow.push(<td className={"e-rowcell"}>{tmpOffices}</td>);

    let tmpPhone = [];

    if (props["Phone"] !== null && props["Phone"] !== "" && props["Phone"].includes("; ")) {
      let splitPhone = props["Phone"].split("; ");

      for (let i = 0; i < splitPhone.length; i++) {
        tmpPhone.push(splitPhone[i]);
        tmpPhone.push(<br />);
      }
    } else {
      tmpPhone = props["Phone"];
    }

    builtRow.push(<td className={"e-rowcell"}>{tmpPhone}</td>);
    builtRow.push(<td className={"e-rowcell"}>{props["Extension"]}</td>);
    builtRow.push(<td className={"e-rowcell"}>{props["SecretaryName"]}</td>);

    return (
      <tr className="templateRow e-row" style={{ verticalAlign: "top" }}>
        {builtRow}
      </tr>
    );
  }

  public OpenProfilePanel() {
    this.setState({
      blnPanelOpen: true
    });
  }

  private toolbarFiltersTemplate() {
    function btnClearClick(): void {
      this.multiFilterRole.value = [];
      this.multiFilterDepartment.value = [];
      this.multiFilterTitle.value = [];
      this.multiFilterOffice.value = [];
      this.multiFilterPractice.value = [];
      this.multiFilterIndustry.value = [];
      this.chckFilterNotary.checked = false;

      this.grid.clearFiltering();

      this.multiFilterRole.dataSource = this.state.filters.colArrayFilterRole;
      this.multiFilterDepartment.dataSource = this.state.filters.colArrayFilterDepartment;
      this.multiFilterTitle.dataSource = this.state.filters.colArrayFilterTitle;
      this.multiFilterOffice.dataSource = this.state.filters.colArrayFilterOffice;
      this.multiFilterPractice.dataSource = this.state.filters.colArrayFilterPractice;
      this.multiFilterIndustry.dataSource = this.state.filters.colArrayFilterIndustry;
    }

    function btnClearSearchClick() {
      this.txtSearch.value = "";
      this.grid.search("");
    }

    function btnSearchClick() {
      this.grid.search(this.txtSearch.value);
    }

    function btnExcelClick() {
      const excelExportProperties: ExcelExportProperties = {
        enableFilter: true
      };
      this.grid.excelExport(excelExportProperties);
    }

    return (
      <div style={{ cursor: "default" }}>
        <div style={{ clear: "both", cursor: "default" }}>
          <div style={{ float: "left" }}>
            <div id="ddFirstRow">
              <span style={{ marginRight: "10px" }}>Filter by:</span>
              <MultiSelectComponent
                id="mselRole"
                ref={(scope) => { (this.multiFilterRole as MultiSelect | null) = scope; }}
                dataSource={this.state.filters.colArrayFilterRole}
                sortOrder={this.sortASCOrder}
                fields={{ text: 'Role', value: 'Role' }}
                select={this.onFilterRoleChange.bind(this)}
                removed={this.onFilterRoleChange.bind(this)}
                placeholder="Role"
                width="140px"
                mode="CheckBox"
                showSelectAll={false}
                showDropDownIcon={false}
                style={{ marginRight: "8px" }}
                className={cssFilterDropDown}
                popupWidth={140}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
              <MultiSelectComponent
                id="mselTitle"
                ref={(scope) => { (this.multiFilterTitle as MultiSelect | null) = scope; }}
                dataSource={this.state.filters.colArrayFilterTitle}
                sortOrder={this.sortASCOrder}
                fields={{ text: 'Title', value: 'Title' }}
                select={this.onFilterTitleChange.bind(this)}
                removed={this.onFilterTitleChange.bind(this)}
                placeholder="Title"
                width="140px"
                mode="CheckBox"
                showSelectAll={false}
                showDropDownIcon={false}
                className={cssFilterDropDown}
                popupWidth={450}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
              <MultiSelectComponent
                id="mselOffice"
                ref={(scope) => { (this.multiFilterOffice as MultiSelect | null) = scope; }}
                dataSource={this.state.filters.colArrayFilterOffice}
                sortOrder={this.sortASCOrder}
                fields={{ text: 'Offices', value: 'Offices' }}
                select={this.onFilterOfficeChange.bind(this)}
                removed={this.onFilterOfficeChange.bind(this)}
                placeholder="Office"
                width="140px"
                mode="CheckBox"
                showSelectAll={false}
                showDropDownIcon={false}
                className={cssFilterDropDown}
                popupWidth={200}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
              <CheckBoxComponent
                label="Notary"
                labelPosition="Before"
                id="chckNotary"
                ref={(scope) => { this.chckFilterNotary = scope; }}
                change={this.onFilterNotaryChange.bind(this)}
              />
            </div>
            <div id="ddSecondRow">
              <span style={{ marginRight: "10px", color: "white" }}>Filter by:</span>
              <MultiSelectComponent
                id="mselDepartment"
                ref={(scope) => { (this.multiFilterDepartment as MultiSelect | null) = scope; }}
                dataSource={this.state.filters.colArrayFilterDepartment}
                sortOrder={this.sortASCOrder}
                fields={{ text: 'Department', value: 'Department' }}
                select={this.onFilterDepartmentChange.bind(this)}
                removed={this.onFilterDepartmentChange.bind(this)}
                placeholder="Department"
                width="140px"
                mode="CheckBox"
                showSelectAll={false}
                showDropDownIcon={false}
                style={{ marginRight: "8px" }}
                className={cssFilterDropDown}
                popupWidth={400}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
              <MultiSelectComponent
                id="mselPractice"
                ref={(scope) => { (this.multiFilterPractice as MultiSelect | null) = scope; }}
                dataSource={this.state.filters.colArrayFilterPractice}
                sortOrder={this.sortASCOrder}
                fields={{ text: 'Practice', value: 'Practice' }}
                select={this.onFilterPracticeChange.bind(this)}
                removed={this.onFilterPracticeChange.bind(this)}
                placeholder="Practice Groups"
                width="140px"
                mode="CheckBox"
                showSelectAll={false}
                showDropDownIcon={false}
                className={cssFilterDropDown}
                popupWidth={500}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
              <MultiSelectComponent
                id="mselIndustry"
                ref={(scope) => { (this.multiFilterIndustry as MultiSelect | null) = scope; }}
                dataSource={this.state.filters.colArrayFilterIndustry}
                sortOrder={this.sortASCOrder}
                fields={{ text: 'Industry', value: 'Industry' }}
                select={this.onFilterIndustryChange.bind(this)}
                removed={this.onFilterIndustryChange.bind(this)}
                placeholder="Industry Teams"
                width="140px"
                mode="CheckBox"
                showSelectAll={false}
                showDropDownIcon={false}
                className={cssFilterDropDown}
                popupWidth={250}
              >
                <Inject services={[CheckBoxSelection]} />
              </MultiSelectComponent>
              <ButtonComponent onClick={btnClearClick.bind(this)} style={{ paddingLeft: "10px", paddingRight: "10px" }}>Clear Filters</ButtonComponent>
            </div>
          </div>
          <div style={{ float: "left" }}>
            <div id="ddThirdRow">
              <span style={{ marginRight: "10px" }}>Search:</span>
              <input ref={t => this.txtSearch = t} className="e-input" type="text" placeholder="Search All Columns" />
            </div>
            <div id="searchBtns">
              <ButtonComponent onClick={btnSearchClick.bind(this)} className={cssButtonMargin} style={{ width: "100px", textAlign: "center", 'backgroundColor': siteTheme.palette.themePrimary, 'color': 'white', marginLeft: '7px' }}>Search</ButtonComponent>
              <ButtonComponent onClick={btnClearSearchClick.bind(this)} style={{ paddingLeft: "10px", paddingRight: "10px" }}>Clear Search</ButtonComponent>
            </div>
          </div>
          <div id="exportRow">
            <ButtonComponent id="excelButton" className={cssLinkButton} onClick={btnExcelClick.bind(this)}>
              <img className={iconStyles.fileIconImg} src={"https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/excel_16x1.svg"} />
              <div style={{ lineHeight: "18px" }}>Excel Export</div>
            </ButtonComponent>
          </div>
        </div>
      </div>
    );
  }

  // --------------------- START FILTER CHANGE EVENTS
  public onFilterRoleChange(sel: { value: string }): void {
    if (sel["name"] == "removed") {
      this.strCurrentDeleteFilter = "Role";
    } else {
      this.strCurrentDeleteFilter = "";
    }

    if (sel["value"] == undefined && sel["cancel"] != undefined && sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["cancel"] == false && sel["name"] == "select") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterRole.value != null) {
          this.multiFilterRole.value.forEach((s) => {
            arrCurrentValuesTmp.push(s);
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          if (arrCurrentValuesTmp.indexOf(sel["itemData"]) < 0) {
            arrCurrentValuesTmp.push(sel["itemData"]);
            this.grid.clearFiltering(['Role']);
            this.grid.filterByColumn('Role', 'contains', arrCurrentValuesTmp);
          }
        } else {
          this.grid.filterByColumn('Role', 'contains', sel["itemData"]);
        }
      }
    }

    if (sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["name"] == "removed") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterRole.value != null) {
          this.multiFilterRole.value.forEach((s) => {
            if (s != sel["itemData"]) {
              arrCurrentValuesTmp.push(s);
            }
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          this.grid.clearFiltering(['Role']);
          this.grid.filterByColumn('Role', 'contains', arrCurrentValuesTmp);
        } else {
          this.grid.clearFiltering(['Role']);
        }
      }
    }
  }

  public onFilterDepartmentChange(sel: { value: string }): void {
    if (sel["name"] == "removed") {
      this.strCurrentDeleteFilter = "Department";
    } else {
      this.strCurrentDeleteFilter = "";
    }

    if (sel["value"] == undefined && sel["cancel"] != undefined && sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["cancel"] == false && sel["name"] == "select") {

        let arrCurrentValuesTmp = [];

        if (this.multiFilterDepartment.value != null) {
          this.multiFilterDepartment.value.forEach((s) => {
            arrCurrentValuesTmp.push(s);
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          if (arrCurrentValuesTmp.indexOf(sel["itemData"]) < 0) {
            arrCurrentValuesTmp.push(sel["itemData"]);
            this.grid.clearFiltering(['Department']);
            this.grid.filterByColumn('Department', 'contains', arrCurrentValuesTmp);
          }
        } else {
          this.grid.filterByColumn('Department', 'contains', sel["itemData"]);
        }
      }
    }

    if (sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["name"] == "removed") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterDepartment.value != null) {
          this.multiFilterDepartment.value.forEach((s) => {
            if (s != sel["itemData"]) {
              arrCurrentValuesTmp.push(s);
            }
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          this.grid.clearFiltering(['Department']);
          this.grid.filterByColumn('Department', 'contains', arrCurrentValuesTmp);
        } else {
          this.grid.clearFiltering(['Department']);
        }
      }
    }
  }

  public onFilterTitleChange(sel: { value: string }): void {
    if (sel["name"] == "removed") {
      this.strCurrentDeleteFilter = "Title";
    } else {
      this.strCurrentDeleteFilter = "";
    }

    if (sel["value"] == undefined && sel["cancel"] != undefined && sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["cancel"] == false && sel["name"] == "select") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterTitle.value != null) {
          this.multiFilterTitle.value.forEach((s) => {
            arrCurrentValuesTmp.push(s);
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          if (arrCurrentValuesTmp.indexOf(sel["itemData"]) < 0) {
            arrCurrentValuesTmp.push(sel["itemData"]);
            this.grid.clearFiltering(['Title']);
            this.grid.filterByColumn('Title', 'contains', arrCurrentValuesTmp);
          }
        } else {
          this.grid.filterByColumn('Title', 'contains', sel["itemData"]);
        }
      }
    }

    if (sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["name"] == "removed") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterTitle.value != null) {
          this.multiFilterTitle.value.forEach((s) => {
            if (s != sel["itemData"]) {
              arrCurrentValuesTmp.push(s);
            }
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          this.grid.clearFiltering(['Title']);
          this.grid.filterByColumn('Title', 'contains', arrCurrentValuesTmp);
        } else {
          this.grid.clearFiltering(['Title']);
        }
      }
    }
  }

  public onFilterOfficeChange(sel: { value: string }): void {
    if (sel["name"] == "removed") {
      this.strCurrentDeleteFilter = "Offices";
    } else {
      this.strCurrentDeleteFilter = "";
    }

    if (sel["value"] == undefined && sel["cancel"] != undefined && sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["cancel"] == false && sel["name"] == "select") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterOffice.value != null) {
          this.multiFilterOffice.value.forEach((s) => {
            arrCurrentValuesTmp.push(s);
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          if (arrCurrentValuesTmp.indexOf(sel["itemData"]) < 0) {
            arrCurrentValuesTmp.push(sel["itemData"]);
            this.grid.clearFiltering(['Offices']);
            this.grid.filterByColumn('Offices', 'contains', arrCurrentValuesTmp);
          }
        } else {
          this.grid.filterByColumn('Offices', 'contains', sel["itemData"]);
        }
      }
    }

    if (sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["name"] == "removed") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterOffice.value != null) {
          this.multiFilterOffice.value.forEach((s) => {
            if (s != sel["itemData"]) {
              arrCurrentValuesTmp.push(s);
            }
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          this.grid.clearFiltering(['Offices']);
          this.grid.filterByColumn('Offices', 'contains', arrCurrentValuesTmp);
        } else {
          this.grid.clearFiltering(['Offices']);
        }
      }
    }
  }

  public onFilterPracticeChange(sel: { value: string }): void {
    if (sel["name"] == "removed") {
      this.strCurrentDeleteFilter = "Practice";
    } else {
      this.strCurrentDeleteFilter = "";
    }

    if (sel["value"] == undefined && sel["cancel"] != undefined && sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["cancel"] == false && sel["name"] == "select") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterPractice.value != null) {
          this.multiFilterPractice.value.forEach((s) => {
            arrCurrentValuesTmp.push(s);
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          if (arrCurrentValuesTmp.indexOf(sel["itemData"]) < 0) {
            arrCurrentValuesTmp.push(sel["itemData"]);
            this.grid.clearFiltering(['Practice']);
            this.grid.filterByColumn('Practice', 'contains', arrCurrentValuesTmp);
          }
        } else {
          this.grid.filterByColumn('Practice', 'contains', sel["itemData"]);
        }
      }
    }

    if (sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["name"] == "removed") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterPractice.value != null) {
          this.multiFilterPractice.value.forEach((s) => {
            if (s != sel["itemData"]) {
              arrCurrentValuesTmp.push(s);
            }
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          this.grid.clearFiltering(['Practice']);
          this.grid.filterByColumn('Practice', 'contains', arrCurrentValuesTmp);
        } else {
          this.grid.clearFiltering(['Practice']);
        }
      }
    }
  }

  public onFilterIndustryChange(sel: { value: string }): void {
    if (sel["name"] == "removed") {
      this.strCurrentDeleteFilter = "Industry";
    } else {
      this.strCurrentDeleteFilter = "";
    }

    if (sel["value"] == undefined && sel["cancel"] != undefined && sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["cancel"] == false && sel["name"] == "select") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterIndustry.value != null) {
          this.multiFilterIndustry.value.forEach((s) => {
            arrCurrentValuesTmp.push(s);
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          if (arrCurrentValuesTmp.indexOf(sel["itemData"]) < 0) {
            arrCurrentValuesTmp.push(sel["itemData"]);
            this.grid.clearFiltering(['Industry']);
            this.grid.filterByColumn('Industry', 'contains', arrCurrentValuesTmp);
          }
        } else {
          this.grid.filterByColumn('Industry', 'contains', sel["itemData"]);
        }
      }
    }

    if (sel["name"] != undefined && sel["e"] != undefined) {
      if (sel["name"] == "removed") {
        let arrCurrentValuesTmp = [];

        if (this.multiFilterIndustry.value != null) {
          this.multiFilterIndustry.value.forEach((s) => {
            if (s != sel["itemData"]) {
              arrCurrentValuesTmp.push(s);
            }
          });
        }

        if (arrCurrentValuesTmp.length > 0) {
          this.grid.clearFiltering(['Industry']);
          this.grid.filterByColumn('Industry', 'contains', arrCurrentValuesTmp);
        } else {
          this.grid.clearFiltering(['Industry']);
        }
      }
    }
  }

  public onFilterNotaryChange(args): void {
    let notaryValue = args.checked;
    if (notaryValue === false) {
      this.strCurrentDeleteFilter = "Notary";
      this.grid.clearFiltering(['Notary']);
    } else {
      this.strCurrentDeleteFilter = "";
      this.grid.clearFiltering(['Notary']);
      this.grid.filterByColumn('Notary', 'equal', true);
    }
  }
  // --------------------- END FILTER CHANGE EVENTS

  public onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  public GetUniqueColumnValues(tmp, col) {
    let filteredRecords = Object.values(this.grid.getFilteredRecords());
    let data = [];
    let filteringCount = 0;

    if (this.multiFilterRole !== null) {
      if (this.multiFilterRole.value !== null && this.multiFilterRole.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterTitle !== null) {
      if (this.multiFilterTitle.value !== null && this.multiFilterTitle.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterOffice !== null) {
      if (this.multiFilterOffice.value !== null && this.multiFilterOffice.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterDepartment !== null) {
      if (this.multiFilterDepartment.value !== null && this.multiFilterDepartment.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterPractice !== null) {
      if (this.multiFilterPractice.value !== null && this.multiFilterPractice.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterIndustry !== null) {
      if (this.multiFilterIndustry.value !== null && this.multiFilterIndustry.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.chckFilterNotary !== null) {
      if (this.chckFilterNotary.checked === true) {
        filteringCount++;
      }
    }

    if (filteredRecords.length < 1) {
      data = this.state.gridItems;
    } else if (filteringCount < 2) {
      data = this.state.gridItems;
    } else {
      data = filteredRecords;
    }

    let arrTmp = [];
    for (let i = 0; i < data.length; i++) {
      switch (col) {
        case "Offices":
          if (data[i][col] == null) {
            arrTmp.push("");
          } else {
            let arrColTmp = String(data[i][col]).split(', ');
            arrColTmp.forEach((s) => {
              if (s !== "") {
                arrTmp.push(s.trim());
              }
            });
          }
          break;
        case "Practice":
          if (data[i][col] == null) {
            arrTmp.push("");
          } else {
            let arrColTmp = String(data[i][col]).split('; ');
            arrColTmp.forEach((s) => {
              if (s !== "") {
                arrTmp.push(s.trim());
              }
            });
          }
          break;
        case "Industry":
          if (data[i][col] == null) {
            arrTmp.push("");
          } else {
            let arrColTmp = String(data[i][col]).split('; ');
            arrColTmp.forEach((s) => {
              if (s !== "") {
                arrTmp.push(s.trim());
              }
            });
          }
          break;
        default:
          arrTmp.push(data[i][col]);
          break;
      }
    }
    arrTmp = arrTmp.filter(this.onlyUnique);
    return arrTmp;
  }

  public GetColumnTotalValues(tmp, col) {
    let filteredRecords = Object.values(this.grid.getFilteredRecords());
    let data = [];
    let filteringCount = 0;

    if (this.multiFilterRole !== null) {
      if (this.multiFilterRole.value !== null && this.multiFilterRole.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterTitle !== null) {
      if (this.multiFilterTitle.value !== null && this.multiFilterTitle.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterOffice !== null) {
      if (this.multiFilterOffice.value !== null && this.multiFilterOffice.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterDepartment !== null) {
      if (this.multiFilterDepartment.value !== null && this.multiFilterDepartment.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterPractice !== null) {
      if (this.multiFilterPractice.value !== null && this.multiFilterPractice.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.multiFilterIndustry !== null) {
      if (this.multiFilterIndustry.value !== null && this.multiFilterIndustry.value.length > 0) {
        filteringCount++;
      }
    }

    if (this.chckFilterNotary !== null) {
      if (this.chckFilterNotary.checked === true) {
        filteringCount++;
      }
    }

    if (filteredRecords.length < 1) {
      data = this.state.gridItems;
    } else if (filteringCount < 2) {
      data = this.state.gridItems;
    } else {
      data = filteredRecords;
    }

    let arrTmp = [];
    for (let i = 0; i < data.length; i++) {
      switch (col) {
        case "Offices":
          if (data[i][col] == null) {
            arrTmp.push("");
          } else {
            let arrColTmp = String(data[i][col]).split(', ');
            arrColTmp.forEach((s) => {
              if (s !== "") {
                arrTmp.push(s.trim());
              }
            });
          }
          break;
        case "Practice":
          if (data[i][col] == null) {
            arrTmp.push("");
          } else {
            let arrColTmp = String(data[i][col]).split('; ');
            arrColTmp.forEach((s) => {
              if (s !== "") {
                arrTmp.push(s.trim());
              }
            });
          }
          break;
        case "Industry":
          if (data[i][col] == null) {
            arrTmp.push("");
          } else {
            let arrColTmp = String(data[i][col]).split('; ');
            arrColTmp.forEach((s) => {
              if (s !== "") {
                arrTmp.push(s.trim());
              }
            });
          }
          break;
        default:
          arrTmp.push(data[i][col]);
          break;
      }
    }
    arrTmp = arrTmp.filter(this.onlyUnique);
    return arrTmp.length;
  }

  private rowSelected(args: RowSelectEventArgs) {
    if (this.grid) {
      const rowHeight: number = this.grid.getRows()[this.grid.getSelectedRowIndexes()[0]].scrollHeight;
      this.grid.getContent().children[0].scrollTop = rowHeight * this.grid.getSelectedRowIndexes()[0];
    }
  }

  public gridHandleRefresh = (args) => {
    if (args["name"] == "actionComplete" && args["action"] != undefined) {
      if (args["action"] == "filter") {
        switch (args["currentFilteringColumn"]) {
          case "Role":
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Department":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Title":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Offices":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Practice":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Industry":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            break;
          case "Notary":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
        }
      }
    }

    if (args["name"] == "actionComplete" && args["requestType"] != undefined) {
      if (args["requestType"] == "refresh" && this.strCurrentDeleteFilter != "") {
        switch (this.strCurrentDeleteFilter) {
          case "Role":
            let arrSubTmp: any = [];
            arrSubTmp = this.multiFilterRole.dataSource;
            if (arrSubTmp.length != this.GetColumnTotalValues(args, "Role")) {
              this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            }

            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Department":
            arrSubTmp = [];
            arrSubTmp = this.multiFilterDepartment.dataSource;
            if (arrSubTmp.length != this.GetColumnTotalValues(args, "Department")) {
              this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            }

            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Title":
            arrSubTmp = [];
            arrSubTmp = this.multiFilterTitle.dataSource;
            if (arrSubTmp.length != this.GetColumnTotalValues(args, "Title")) {
              this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            }

            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Offices":
            arrSubTmp = [];
            arrSubTmp = this.multiFilterOffice.dataSource;
            if (arrSubTmp.length != this.GetColumnTotalValues(args, "Offices")) {
              this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            }

            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Practice":
            arrSubTmp = [];
            arrSubTmp = this.multiFilterPractice.dataSource;
            if (arrSubTmp.length != this.GetColumnTotalValues(args, "Practice")) {
              this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            }

            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
          case "Industry":
            arrSubTmp = [];
            arrSubTmp = this.multiFilterIndustry.dataSource;
            if (arrSubTmp.length != this.GetColumnTotalValues(args, "Industry")) {
              this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            }

            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            break;
          case "Notary":
            this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
            this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
            this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
            this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
            this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
            this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
            break;
        }
        this.strCurrentDeleteFilter = "";
      }
    }

    if (args["name"] == "actionComplete" && args["requestType"] != undefined) {
      if (args["requestType"] == "searching") {
        this.multiFilterRole.dataSource = this.GetUniqueColumnValues(args, "Role");
        this.multiFilterDepartment.dataSource = this.GetUniqueColumnValues(args, "Department");
        this.multiFilterTitle.dataSource = this.GetUniqueColumnValues(args, "Title");
        this.multiFilterOffice.dataSource = this.GetUniqueColumnValues(args, "Offices");
        this.multiFilterPractice.dataSource = this.GetUniqueColumnValues(args, "Practice");
        this.multiFilterIndustry.dataSource = this.GetUniqueColumnValues(args, "Industry");
      }
    }
  }

  public render(): React.ReactElement<ISyncFusionSampleProps> {
    if (this.state.gridItems.length == 0) {
      return (<div />);
    } else {
      return (
        <>
          <GridComponent
            id='grid'
            ref={g => this.grid = g}
            enableStickyHeader={true}
            dataSource={this.state.gridItems}
            actionComplete={this.gridHandleRefresh}
            toolbar={this.toolbarOptions}
            allowExcelExport={true}
            height='100%'
            width='100%'
            allowResizing={true}
            allowSorting={true}
            allowFiltering={true}
            filterSettings={{ type: 'Excel' }}
            allowTextWrap={true}
            showColumnChooser={true}
            rowTemplate={this.gridRowTemplate.bind(this)}
            rowSelected={this.rowSelected}
          >
            <ColumnsDirective>
              <ColumnDirective
                field='Image'
                headerText='Image'
                allowFiltering={false}
              />
              <ColumnDirective
                field='Name'
                headerText='Name'
                allowFiltering={false}
              />
              <ColumnDirective
                field='Email'
                headerText='Email'
                allowFiltering={false}
              />
              <ColumnDirective
                field='TKNumber'
                headerText='TK#'
                allowFiltering={false}
              />
              <ColumnDirective
                field='Initials'
                headerText='Initials'
                allowFiltering={false}
              />
              <ColumnDirective
                field='PracticeIndustryDepartment'
                headerText='Practice / Industry / Department'
              />
              <ColumnDirective
                field='Title'
                headerText='Title'
              />
              <ColumnDirective
                field='Offices'
                headerText='Office(s)'
              />
              <ColumnDirective
                field='Phone'
                headerText='Phone'
                allowFiltering={false}
              />
              <ColumnDirective
                field='Extension'
                headerText='Extension'
                allowFiltering={false}
              />
              <ColumnDirective
                field='SecretaryName'
                headerText='Secretary'
                allowFiltering={false}
              />
              <ColumnDirective
                field='Notary'
                headerText=''
                width="0px"
              />
              <ColumnDirective
                field='Role'
                headerText=''
                width="0px"
              />
              <ColumnDirective
                field='Department'
                headerText=''
                width="0px"
              />
              <ColumnDirective
                field='Practice'
                headerText=''
                width="0px"
              />
              <ColumnDirective
                field='Industry'
                headerText=''
                width="0px"
              />
            </ColumnsDirective>
            <Inject services={[Filter, Resize, Sort, Toolbar, ColumnChooser, ExcelExport]} />
          </GridComponent>
          <Panel
            isLightDismiss
            onLightDismissClick={() => { this.setState({ blnPanelOpen: false }); }}
            headerText="DEMO PANEL"
            isOpen={this.state.blnPanelOpen}
            onDismiss={(ev?: React.SyntheticEvent<HTMLElement, Event>) => { this.setState({ blnPanelOpen: false }); }}
            closeButtonAriaLabel="Close"
            type={PanelType.medium}
          >
            <div>This is a demo.</div>
          </Panel>
        </>
      );
    }
  }
}