import * as React from "react";
import { Announced } from "@fluentui/react/lib/Announced";
import {
  Label,
  ILabelStyles,
  ILabelStyleProps,
} from "@fluentui/react/lib/Label";
import { DefaultEffects } from "@fluentui/react";
import { DefaultPalette, themeRulesStandardCreator } from "@fluentui/react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IDetailsRowBaseProps,
  IDetailsRowCheckStyles,
  IDetailsFooterProps,
  DetailsRow,
  DetailsRowCheck,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react/lib/DetailsList";
import { FontSizes } from "@fluentui/theme";
import { IRenderFunction } from "@fluentui/utilities";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { Separator } from "@fluentui/react/lib/Separator";
import {
  Stack,
  StackItem,
  IStackItemStyles,
  IStackTokens,
} from "@fluentui/react/lib/Stack";
import {
  TextField,
  ITextFieldStyles,
  ITextFieldStyleProps,
} from "@fluentui/react/lib/TextField";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { TooltipHost } from "@fluentui/react";
import { Sticky, StickyPositionType } from "@fluentui/react/lib/Sticky";
import { getItemStyles } from "@fluentui/react/lib/components/ContextualMenu/ContextualMenu.classNames";

const gridDisplayBackground = {
  paddingTop: 25,
  width: "100%",
};

const whiteGlassMorphism = {
  background: DefaultPalette.neutralLighter,
  borderRadius: 8,
  width: "80%",
  margin: "auto",
  alignItems: "left",
  boxShadow: DefaultEffects.elevation16,
  fontSize: FontSizes.size18,
  color: "white",
  foregroundColor: "white",
  textColor: "white",
  textForegroundColor: "white",
  textForeground: "white",
  fontColor: "white",
  fontWeight: "normal",
  //backdrop-filter: blur(5px),
  //-webkit-backdrop-filter: blur(5px),
  border: "1px solid " + DefaultPalette.neutralSecondary,
};

const blueGlassMorphism = {
  background: DefaultPalette.themePrimary,
  padding: 10,
  borderRadius: 8,
  width: "78%",
  margin: "auto",
  boxShadow: DefaultEffects.elevation16,
  //backdrop-filter: blur(5px),
  //-webkit-backdrop-filter: blur(5px),
  border: "1px solid " + DefaultPalette.themeDarker,
};

/*
<Separator>Summary</Separator>
<div style={whiteGlassMorphism}>
  <Stack>
    <Label>Number of rows: {items.length}</Label>
    <Label>
      Number of times users corrected an email: {items.length}
    </Label>
  </Stack>
</div>
<Separator>Data</Separator>
<div style={blueGlassMorphism}>
  <Stack>
    <Label className={classNames.summaryText}>
      Number of rows: {items.length}
    </Label>
    <Label styles={summaryStyles}>
      Number of times users corrected an email: {items.length}
    </Label>
  </Stack>
</div>
*/
const summaryHeaderStyles = {
  root: {
    textAlign: "left",
    fontSize: FontSizes.size16,
    color: DefaultPalette.whiteTranslucent40,
  },
};
const summaryStyles = {
  root: {
    textAlign: "left",
    fontSize: FontSizes.size12,
    //fontWeight: "normal",
    color: DefaultPalette.white,
    marginLeft: 15,
    padding: 0,
  },
};

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: "auto",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
});

function getStyles(props: ITextFieldStyleProps): Partial<ITextFieldStyles> {
  return {
    root: [{ margin: "auto", width: "80%" }],
    subComponentStyles: {
      label: getLabelStyles,
    },
  };
}

function getLabelStyles(props: ILabelStyleProps): ILabelStyles {
  return {
    root: {
      textAlign: "left",
    },
  };
}

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}

export interface IDocument {
  key: string;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}

export class GridDisplay extends React.Component<
  {},
  IDetailsListDocumentsExampleState
> {
  private _selection: Selection;
  private _allItems: IDocument[];
  private _cancelledTotal: number;

  constructor(props: {}) {
    super(props);

    this._allItems = _generateDocuments();
    this._cancelledTotal = _getCancelledTotal(this._allItems);

    const columns: IColumn[] = [
      {
        key: "column1",
        name: "Date",
        fieldName: "dateModifiedValue",
        minWidth: 50,
        maxWidth: 140,
        flexGrow: 20, // was maxWidth: 140, 20+35+15+30, 4+7+3+6=20
        targetWidthProportion: 20,
        isResizable: true,
        isCollapsible: false,
        isSorted: true,
        isSortedDescending: true,
        onColumnClick: this._onColumnClick,
        data: "number",
        onRender: (item: IDocument) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true,
      },
      {
        key: "column2",
        name: "User Email",
        fieldName: "modifiedBy",
        minWidth: 70,
        maxWidth: 180,
        flexGrow: 35, //
        targetWidthProportion: 35,
        isResizable: true,
        isCollapsible: false,
        data: "string",
        //isRowHeader: true,
        //sortAscendingAriaLabel: "Sorted A to Z",
        //sortDescendingAriaLabel: "Sorted Z to A",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true,
      },
      {
        key: "column3",
        name: "Response",
        fieldName: "fileSizeRaw",
        minWidth: 35,
        maxWidth: 90,
        flexGrow: 15, //
        targetWidthProportion: 15,
        isResizable: true,
        isCollapsible: false,
        data: "number",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.fileSize}</span>;
        },
      },
      {
        key: "column4",
        name: "Rule",
        fieldName: "name",
        minWidth: 100,
        maxWidth: 350,
        flexGrow: 30, //
        targetWidthProportion: 30,
        isResizable: true,
        isCollapsible: false,
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true,
      },
      /*
      {
        key: "column3",
        name: "File Type",
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel:
          "Column operations for File type, Press to sort on File type",
        iconName: "Page",
        isIconOnly: true,
        fieldName: "name",
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => (
          <TooltipHost content={`${item.fileType} file`}>
            <img
              src={item.iconName}
              className={classNames.fileIconImg}
              alt={`${item.fileType} file icon`}
            />
          </TooltipHost>
        ),
      },*/
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this._allItems,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: true,
      announcedMessage: undefined,
    };
  }

  render() {
    const {
      columns,
      isCompactMode,
      items,
      selectionDetails,
      isModalSelection,
      announcedMessage,
    } = this.state;

    return (
      <div style={gridDisplayBackground}>
        <div style={blueGlassMorphism}>
          <Stack>
            <Label styles={summaryHeaderStyles}>Summary:</Label>
            <Label styles={summaryStyles}>
              Number of users: {items.length}
            </Label>
            <Label styles={summaryStyles}>
              Number of times users prompted with a warning: {items.length}
            </Label>
            <Label styles={summaryStyles}>
              Number of times users corrected an email: {this._cancelledTotal}
            </Label>
          </Stack>
        </div>
        <Separator />
        <div className={classNames.controlWrapper}>
          <TextField
            label="Search:"
            placeholder="Dates, Email addresses, rules..."
            onChange={this._onChangeText}
            styles={getStyles}
            //styles={controlStyles}
          />
          <Announced
            message={`Number of items after filter applied: ${items.length}.`}
          />
        </div>
        {announcedMessage ? (
          <Announced message={announcedMessage} />
        ) : undefined}
        {isModalSelection ? (
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              compact={isCompactMode}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="select row"
            />
          </MarqueeSelection>
        ) : (
          <DetailsList
            items={items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            onItemInvoked={this._onItemInvoked}
          />
        )}
      </div>
    );
  }

  public componentDidUpdate(
    previousProps: any,
    previousState: IDetailsListDocumentsExampleState
  ) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  private _onChangeCompactMode = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    checked?: boolean | undefined
  ): void => {
    if (checked != undefined) {
      this.setState({ isCompactMode: checked });
    }
  };

  private _onChangeModalSelection = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    checked: boolean | undefined
  ): void => {
    if (checked != undefined) {
      this.setState({ isModalSelection: checked });
    }
  };

  private _onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text?: string | undefined
  ): void => {
    if (text != undefined) {
      this.setState({
        items: text
          ? this._allItems.filter(
              (i) => i.name.toLowerCase().indexOf(text) > -1
            )
          : this._allItems,
      });
    }
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return "No items selected";
      case 1:
        return (
          "1 item selected: " +
          (this._selection.getSelection()[0] as IDocument).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    this._sortOnColumn(column);
  };

  private _sortOnColumn = (column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      (currCol) => column.key === currCol.key
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? "descending" : "ascending"
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}

function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
    );
}

function _getCancelledTotal(items: IDocument[]): number {
  let cancelledCount: number = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].fileSize == "Cancelled") {
      cancelledCount++;
    }
  }
  return cancelledCount;
}

function _generateDocuments() {
  const items: IDocument[] = [];
  let newItems: IDocument[] = [];
  for (let i = 0; i < 50; i++) {
    const randomDate = _randomDate(new Date(2022, 0, 1), new Date());
    const randomFileSize = _randomFileSize();
    const randomFileType = _randomFileIcon();
    let ruleName = "Email is being sent outside the company";
    switch (i) {
      case 3:
        ruleName =
          "Email is being sent outside the company and has an attachment";
        break;
      case 4:
        ruleName = "Email contains sensitive keywords";
        break;
      case 7:
        ruleName = "Email is being sent to two different domains";
        break;
    }
    //let ruleName = _lorem(2);
    //ruleName =
    //  ruleName.charAt(0).toUpperCase() +
    //  ruleName.slice(1).concat(`.${randomFileType.docType}`);
    let userName = _lorem(2);
    userName =
      userName
        .split(" ")
        .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(".") + "@yourcompany.com";
    items.push({
      key: i.toString(),
      name: ruleName,
      value: ruleName,
      iconName: randomFileType.url,
      fileType: randomFileType.docType,
      modifiedBy: userName,
      dateModified: randomDate.dateFormatted,
      dateModifiedValue: randomDate.value,
      fileSize: randomFileSize.value,
      fileSizeRaw: randomFileSize.rawSize,
    });
  }
  //
  // Show the most recent interactions first.
  //
  newItems = _copyAndSort(items, "dateModifiedValue", true);
  return newItems;
}

function _randomDate(
  start: Date,
  end: Date
): { value: number; dateFormatted: string } {
  const date: Date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return {
    value: date.valueOf(),
    dateFormatted: date.toLocaleString(),
  };
}

const FILE_ICONS: { name: string }[] = [
  { name: "accdb" },
  { name: "audio" },
  { name: "code" },
  { name: "csv" },
  { name: "docx" },
  { name: "dotx" },
  { name: "mpp" },
  { name: "mpt" },
  { name: "model" },
  { name: "one" },
  { name: "onetoc" },
  { name: "potx" },
  { name: "ppsx" },
  { name: "pdf" },
  { name: "photo" },
  { name: "pptx" },
  { name: "presentation" },
  { name: "potx" },
  { name: "pub" },
  { name: "rtf" },
  { name: "spreadsheet" },
  { name: "txt" },
  { name: "vector" },
  { name: "vsdx" },
  { name: "vssx" },
  { name: "vstx" },
  { name: "xlsx" },
  { name: "xltx" },
  { name: "xsn" },
];

function _randomFileIcon(): { docType: string; url: string } {
  const docType: string =
    FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
  return {
    docType,
    url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${docType}.svg`,
  };
}

function _randomFileSize(): { value: string; rawSize: number } {
  const fileSize: number = Math.floor(Math.random() * 100) + 30;
  if (fileSize > 80) {
    return {
      value: "Cancelled",
      rawSize: fileSize,
    };
  } else {
    return {
      value: "Sent",
      rawSize: fileSize,
    };
  }
  //return {
  //  value: `${fileSize} KB`,
  //  rawSize: fileSize,
  //};
}

const LOREM_IPSUM = (
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut " +
  "labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut " +
  "aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
  "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt "
).split(" ");
let loremIndex = 0;
function _lorem(wordCount: number): string {
  const startIndex =
    loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
  loremIndex = startIndex + wordCount;
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(" ");
}

export default GridDisplay;
