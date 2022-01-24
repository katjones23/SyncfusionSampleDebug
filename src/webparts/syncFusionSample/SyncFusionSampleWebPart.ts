import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import SyncFusionSample from './components/SyncFusionSample';
import { ISyncFusionSampleProps } from './components/ISyncFusionSampleProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISyncFusionSampleWebPartProps {
  description: string;
  columnWidths: string;
  context: WebPartContext;
}

export default class SyncFusionSampleWebPart extends BaseClientSideWebPart<ISyncFusionSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISyncFusionSampleProps> = React.createElement(
      SyncFusionSample,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Sample"
          },
          groups: [
          ]
        }
      ]
    };
  }
}