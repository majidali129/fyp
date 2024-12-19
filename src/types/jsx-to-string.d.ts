declare module 'jsx-to-string' {
    export default function jsxToString(
      element: React.ReactNode,
      options?: {
        displayName?: (element: React.ReactNode) => string;
        keyValueOverride?: (key: string, value: any) => any;
        useFunctionCode?: boolean;
        functionNameOnly?: boolean;
        shortBooleanSyntax?: boolean;
        tabStop?: number;
        ignoreProps?: string[];
      }
    ): string;
  }
