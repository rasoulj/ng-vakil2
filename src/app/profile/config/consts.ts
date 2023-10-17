import { ToolBarButton } from "../models/toolbar-button.model"

export const PROFILE_TOOLBAR: ToolBarButton[] = [
    { title: "profile-home", link: "profile-home", icon: "home" },
    { title: "favorite-lawyers", link: "favorite-lawyers", icon: "favorite" },
    { title: "legal-requests", link: "legal-requests", icon: "assignment" },
    { title: "pending-payments", link: "pending-payments", icon: "payment" },
    { title: "my-calls", link: "my-calls", icon: "call" },
    { title: "my-questions", link: "my-questions", icon: "question_answer", hasDivider: true },

    { title: "call-lawyer", link: "../call-lawyer", icon: "call" },
    { title: "text-lawyer", link: "../text-lawyer", icon: "textsms", hasDivider: true },

    { title: "logout", link: "logout", icon: "logout" },
]


export const SIDE_MENU_TOOLBAR: ToolBarButton[] = [
    { title: "call-lawyer", link: "call-lawyer", icon: "call" },
    { title: "text-lawyer", link: "text-lawyer", icon: "textsms" },
    { title: "law-tables", link: "law-tables", icon: "payment" },
]