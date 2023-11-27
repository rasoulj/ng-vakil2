import { ToolBarButton } from "../../components/tool-bar-button/toolbar-button.model";

export interface MessageBoxModel {
    title: string,
    message: string,
    actions: ToolBarButton[],

    action?: string,
}

export interface StringFunction {
    (arg?: string): void;
}
