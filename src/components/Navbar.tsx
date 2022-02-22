import React, { Component } from "react";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { IIconProps } from "@fluentui/react/lib/Icon";
import { IconButton } from "@fluentui/react/lib/Button";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";
import {
  Stack,
  StackItem,
  IStackItemStyles,
  IStackTokens,
} from "@fluentui/react/lib/Stack";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import { Text } from "@fluentui/react/lib/Text";
import { TooltipHost, ITooltipHostStyles } from "@fluentui/react/lib/Tooltip";
import { DefaultPalette } from "@fluentui/react";

const neutralLighterBackground = {
  root: {
    background: DefaultPalette.neutralLighter,
  },
};

const iconClass = mergeStyles({
  fontSize: 25,
  height: 25,
  width: 25,
  margin: "0 12px",
});

// Tokens definition
const containerStackTokens: IStackTokens = { childrenGap: 5 };
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const itemAlignmentsStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};
// Styles definition
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: 5,
  },
};

const imageProps: Partial<IImageProps> = {
  imageFit: ImageFit.centerContain,
  width: 50,
  height: 50,
  // Show a border around the image (just for demonstration purposes)
  //styles: (props) => ({
  //  root: { border: "1px solid " + props.theme.palette.neutralSecondary },
  //}),
};

// The TooltipHost root uses display: inline by default.
// If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
const hostStyles: Partial<ITooltipHostStyles> = {
  root: { display: "inline-block" },
};
const calloutProps = { gapSpace: 0 };
const accountIcon: IIconProps = {
  iconName: "AccountManagement",
  styles: (props) => ({
    root: { fontSize: 25, color: props.theme?.palette.black },
  }),
};
const helpIcon: IIconProps = {
  iconName: "Help",
  styles: (props) => ({
    root: { fontSize: 25, color: props.theme?.palette.black },
  }),
};
const logoutIcon: IIconProps = {
  iconName: "ErrorBadge",
  styles: (props) => ({
    root: { fontSize: 25, color: props.theme?.palette.black },
  }),
};

export class Navbar extends Component {
  render() {
    return (
      <div style={{ padding: 5 }}>
        <Stack
          horizontal
          horizontalAlign="space-between"
          tokens={containerStackTokens}
        >
          <Stack horizontal tokens={containerStackTokens}>
            <StackItem styles={stackItemStyles}>
              <Image
                {...imageProps}
                src="../assets/SafeguardSend-128.png"
                alt="Company Logo"
              />
            </StackItem>
            <StackItem styles={stackItemStyles}>
              <Stack>
                <Text variant="xLarge">Sperry Software</Text>
                <Text variant="xSmall">(Your company name can go here)</Text>
              </Stack>
            </StackItem>
          </Stack>
          <StackItem styles={stackItemStyles}>
            <Text variant="xxLarge">Safeguard Send Dashboard</Text>
          </StackItem>
          <StackItem styles={stackItemStyles}>
            <Stack horizontal tokens={containerStackTokens}>
              <TooltipHost
                content="Account Settings"
                id="AccountTooltip"
                calloutProps={calloutProps}
                styles={hostStyles}
                setAriaDescribedBy={false}
              >
                <IconButton iconProps={accountIcon} ariaLabel="Account" />
              </TooltipHost>
              <TooltipHost
                content="Help"
                id="HelpTooltip"
                calloutProps={calloutProps}
                styles={hostStyles}
                setAriaDescribedBy={false}
              >
                <IconButton iconProps={helpIcon} ariaLabel="Help" />
              </TooltipHost>
              <TooltipHost
                content="Logout"
                id="LogoutTooltip"
                calloutProps={calloutProps}
                styles={hostStyles}
                setAriaDescribedBy={false}
              >
                <IconButton iconProps={logoutIcon} ariaLabel="Logout" />
              </TooltipHost>
            </Stack>
          </StackItem>
        </Stack>
      </div>
    );
  }
}

export default Navbar;
