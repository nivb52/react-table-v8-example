/// <reference types="react" />
import { AnyObject } from 'src/types/UtilsTypes';
export type ConnectivityStatus = 'connected' | 'disconnected' | 'off';

export type IndicatorPosition = 'bottom' | 'end' | 'start' | 'top';
declare const CustomTheme: any;
export interface ObjectWithId extends AnyObject {
  id: number | string;
}
export type SxProp = {
  [key: string]: any;
};
export type StyleProp = {
  [key: string]: any;
};
export type ListItemDataProps = {
  data: {
    [key: string]: any;
  };
  selectedItem?: {
    [key: string]: any;
  };
  idField: string;
  onClick?: (data: any, event?: React.MouseEvent) => unknown;
};
export type HEX = `#${string}`;
export type RGB = `rgb(${string})`;
export type RGBA = `rgba(${string})`;
export type BaseColor = 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';
export type IconColor = BaseColor | 'action' | 'disabled' | 'inherit';
export type SwitchColor = BaseColor | 'default';
export type Variant = 'contained' | 'outlined' | 'text';
export type Target = '_blank' | '_parent' | '_self' | '_top';
export type BaseSize = 'large' | 'medium' | 'small';
export type IconSize = BaseSize | 'inherit';
export type IconType = keyof typeof SVGAElement;
export type LabelPlacement = 'bottom' | 'end' | 'start' | 'top';
export type TooltipPlacement = 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
export type TooltipMode = 'dark' | 'html' | 'light';
export type TypographyVariant = 'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2';
export type TypographyAlign = 'center' | 'inherit' | 'justify' | 'left' | 'right';
export type AvatarVariant = 'circular' | 'rounded' | 'square';
type DimensionUnit = '%' | 'em' | 'px' | 'rem';
export type DimensionPercentage = `${number}%`;
export type DimensionPx = `${number}px`;
export type DimensionEm = `${number}em`;
export type DimensionRem = `${number}rem`;
export type DimensionPercentageOrPx = DimensionPercentage | DimensionPx;
export type GlobalValues = 'inherit' | 'initial' | 'revert-layer' | 'revert' | 'unset';
export type FontSize = DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | GlobalValues | number | 'large' | 'larger' | 'math' | 'medium' | 'small' | 'smaller' | 'x-large' | 'x-small' | 'xx-large' | 'xx-small' | 'xxx-large';
export type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'bold' | 'bolder' | 'inherit' | 'initial' | 'lighter' | 'normal' | 'revert' | 'unset';
export type LineHight = DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | GlobalValues | number;
export type LetterSpacing = DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | GlobalValues | number;
export type DimensionVariant = DimensionPercentage | DimensionPx | GlobalValues | 'auto' | 'fit-content' | 'max-content' | 'min-content' | 'unset' | `fit-content(${DimensionPercentageOrPx})`;
export type DoubleDimension = `${DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | 0} ${DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | 0}`;
export type Gap = DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | DoubleDimension | GlobalValues | 'large' | 0;
export type BackgroundColors = 'disabled' | 'primary' | 'secondary';
export type ColumnAlignmentVariant = 'center' | 'left' | 'right';
export type DirectionVariant = 'column-reverse' | 'column' | 'row-reverse' | 'row';
export type DisplayVariant = 'block' | 'flex';
export type LoadingPosition = 'center' | 'end' | 'start';
export type AlignItems = GlobalValues | 'baseline' | 'center' | 'end' | 'first baseline' | 'flex-end' | 'flex-start' | 'last baseline' | 'normal' | 'safe center' | 'self-end' | 'self-start' | 'start' | 'stretch' | 'unsafe center';
export type AlignContent = GlobalValues | 'baseline' | 'center' | 'end' | 'first baseline' | 'flex-end' | 'flex-start' | 'last baseline' | 'normal' | 'safe center' | 'space-around' | 'space-between' | 'space-evenly' | 'start' | 'stretch' | 'unsafe center';
export type AlignSelf = AlignContent | 'auto';
export type JustifyContent = GlobalValues | 'center' | 'end' | 'flex-end' | 'flex-start' | 'left' | 'normal' | 'right' | 'safe center' | 'space-around' | 'space-between' | 'space-evenly' | 'start' | 'stretch' | 'unsafe center';
export type JustifySelf = JustifyContent | 'auto';
export type AbsolutePosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type Wrap = GlobalValues | 'nowrap' | 'wrap-reverse' | 'wrap';
export type FlexBasis = DimensionEm | DimensionPercentage | DimensionPx | DimensionRem | GlobalValues | 'auto' | 'content' | 'fit-content' | 'max-content' | 'min-content';
export type FlexAlignment = {
  alignContent?: AlignContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  justifyContent?: JustifyContent;
  justifySelf?: JustifySelf;
};
export type FlexChange = {
  flexBasis?: FlexBasis;
  flexGrow?: GlobalValues | number;
  flexShrink?: GlobalValues | number;
};
export type FontColor = BaseColor | HEX | RGB | RGBA | 'black' | 'white';
export type GapDimension = {
  [key: string]: {
    value: number;
    unit: DimensionUnit;
  };
};
export type PaddingDimensions = {
  topBottom: number;
  leftRight: number;
  unit: DimensionUnit;
};
export type ColumnSelfAlignment = {
  selfAlignment?: ColumnAlignmentVariant;
};
export type FlexDirection = {
  flexDirection?: DirectionVariant;
};
export type FlexPositions = FlexDirection & {
  alignContent?: AlignContent;
  justifyContent?: JustifyContent;
};
export type GuttersAndDenseGuard = {
  noGutters: boolean | undefined;
  dense: boolean | undefined;
};
export type GapGuard = GuttersAndDenseGuard & {
  gap: Gap | undefined;
};
export type ThemeGuard = {
  theme: typeof CustomTheme;
  color?: FontColor;
};

export interface LabelProps {
  style?: React.CSSProperties;
  variant?: TypographyVariant;
  align?: TypographyAlign;
  typographyProps?: any;
  className?: string;
  fontSize?: FontSize;
  fontFamily?: string;
  fontWeight?: FontWeight;
  lineHeight?: LineHight;
  letterSpacing?: LetterSpacing;
  textAlign?: TypographyAlign;
  color?: FontColor;
  sx?: SxProp;
}
export type TextTransformProps = {
  isEllipsis?: boolean;
  isUppercase?: boolean;
  isCapitalized?: never;
  capitalizeFirst?: never;
  maxCharsEllipsis?: number | null;
} | {
  isEllipsis?: boolean;
  isUppercase?: never;
  isCapitalized?: boolean;
  capitalizeFirst?: never;
  maxCharsEllipsis?: number | null;
} | {
  isEllipsis?: boolean;
  isUppercase?: never;
  isCapitalized?: never;
  capitalizeFirst?: boolean;
  maxCharsEllipsis?: number | null;
};

export type Locale = 'ar' | 'en';
export type OverflowVariant = 'auto' | 'hidden' | 'inherit' | 'initial' | 'overlay' | 'revert' | 'scroll' | 'unset' | 'visible';
export type DayOfWeek = 'Friday' | 'Monday' | 'Saturday' | 'Sunday' | 'Thursday' | 'Tuesday' | 'Wednesday';
export interface IReportListItem {
  id: number | string;
  label: string;
  labelProps?: LabelProps;
  textTransformProps?: TextTransformProps;
  icon: IconProps;
  value: {
    label: string;
    labelProps?: LabelProps;
    icon?: IconProps;
  };
}
// export type DateState = {
//   current: Dayjs;
//   month: number;
//   year: number;
// };
// export type DateRangeState = {
//   start: DateState;
//   end?: DateState;
// };
// export type SelectedRange = {
//   start: Dayjs;
//   end: Dayjs;
// };
export type DateRangeType = {
  start: number;
  end: number;
};
export { };


export interface IconProps {
  name?: IconType;
  color?: IconColor;
  size?: IconSize;
  style?: StyleProp;
  className?: string;
  component?: any;
  testId?: string;
  sx?: SxProp;
}