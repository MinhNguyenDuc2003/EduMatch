declare global {
  type IFunction = {
    FunctionID?: string;
    FunctionCode?: string;
    FunctionName?: string;
    FunctionDescription?: null;
    Module?: string;
    FunctionType?: string;
    Permissions?: string ;
    ParentFunctionID?: string;
    IsShow?: boolean;
  };
}
export {};
