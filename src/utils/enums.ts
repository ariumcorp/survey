export enum Slice {
  Theme = "themeSlice",
  Auth = "authSlice",
  Alert = "alertSlice",
  Loading = "loadingSlice",
  InfoDeviceSlice = "infoDeviceSlice",
  TranslationSlice = "translateSlice",
  AccessSlice = "accessSlice",
  SurveyConfigSlice = "surveyConfigSlice",
  SurveyBuilderSlice = "surveyBuilderSlice ",
  SurveysSlice = "surveysSlice ",
  AnswerSurveySlice = "answerSurveySlice",
  ProcessedSurveysSlice = "processedSurveysSlice",
}

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export enum PagePath {
  Root = "/",
  Login = "/login",
  SurveysConfig = "/surveys-config",
  Surveys = "/surveys",
  AnswerSurvey = "/answer-survey",
  Dashboard = "/dashboard",
}

export enum PageCode {
  Root = "root",
  Login = "login",
}

export enum UrlType {
  AdminCenter = "AdminCenter",
  Identity = "IDENTITY",
}

export enum Severity {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export enum SelectionMode {
  Single = "single",
  Multiple = "multiple",
  None = "none",
}

export enum SummaryTypeDataGrid {
  Count = "count",
  Avg = "avg",
  Custom = "custom",
  Max = "max",
  Min = "min",
  Sum = "sum",
}

export enum ColumnTypeDataGrid {
  String = "string",
  Number = "number",
  Date = "date",
  Boolean = "boolean",
  Object = "object",
  DateTime = "datetime",
}

export enum SourceControls {
  DevExtreme = "devextreme",
  MaterialUi = "material-ui",
}

export enum Orientation {
  Vertical = "vertical",
  Horizontal = "horizontal",
}
export enum AccessType {
  Menu = "menu",
  Group = "group",
  Option = "option",
}

export enum AppCode {
  AdminCenter = "admin-center",
}
