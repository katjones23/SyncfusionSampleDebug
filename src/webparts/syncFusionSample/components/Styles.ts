import {mergeStyleSets} from '@fluentui/react/lib/Styling';
import {IPivotStyles} from "@fluentui/react";
import {mergeStyles, ITheme, createTheme} from 'office-ui-fabric-react/lib/Styling';

const pivotStyles: Partial<IPivotStyles> = {
    text: {
        fontWeight: "bold"
    }
};

const iconStyles = mergeStyleSets({
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden'
            }
        }
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px'
    }
});

const cssFilterDropDown = mergeStyles({marginLeft: '8px', marginBottom: '8px'});

const cssButtonMargin = mergeStyles({marginRight: '8px'});

const cssLinkButton = mergeStyles({
    width: '85px',
    whiteSpace: 'break-spaces !important',
    marginLeft: '10px',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    marginTop: '15px',
    borderRadius: '8px !important',
    boxShadow: '0px 5px 5px #e0e0e0 !important'
});

const ThemeColorsFromWindow: any = (window as any).__themeState__.theme;
const siteTheme: ITheme = createTheme({palette: ThemeColorsFromWindow});

export {
    pivotStyles,
    iconStyles,
    cssFilterDropDown,
    cssButtonMargin,
    cssLinkButton,
    siteTheme
};
