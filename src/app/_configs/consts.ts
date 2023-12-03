import { LawyerViewConfig } from "../_modules/shared/components/lawyer-view/lawyer-view.model";
import { ToolBarButton } from "../_modules/shared/components/tool-bar-button/toolbar-button.model";

const ACTIONS: ToolBarButton[] = [
    { title: "call-lawyer", link: "call", icon: "call", color: "accent", needsAuth: true },
    { title: "text-lawyer", link: "question", icon: "contact_support", color: "primary" },
];
const MORE_ACTIONS = [
    { title: "view", link: "view", icon: "visibility", },
    { title: "call-lawyer", link: "call", icon: "call", needsAuth: true },
    { title: "text-lawyer", link: "question", icon: "contact_support", },
];

export const GeneralViewConfig: LawyerViewConfig = {
    role: "lawyer",
    showExpertise2: true,
    actions: ACTIONS,
    moreActions: MORE_ACTIONS,
}