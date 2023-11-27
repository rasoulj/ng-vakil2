import { UserRole } from "../../models/user-profile.model";
import { ToolBarButton } from "../tool-bar-button/toolbar-button.model";

export interface LawyerViewConfig {
    showPhone?: boolean;
    showEmail?: boolean;
    hideExpertise1?: boolean;
    showExpertise2?: boolean;
    hideLocation?: boolean;
    showLawyerDocId?: boolean;
    hideAvatar?: boolean;
    hideOnline?: boolean;
    hideGraduation?: boolean;
    moreActions?: ToolBarButton[];
    actions?: ToolBarButton[];
    role: UserRole
}