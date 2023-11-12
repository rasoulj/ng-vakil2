import { ToolBarButton } from "../components/tool-bar-button/toolbar-button.model";
import { UserRole, UserRoles } from "../models/user-profile.model";

export const BASE_URL = "http://localhost:8000/v1/";

const HomeToolBar: ToolBarButton = {
    title: "home-page",
    link: "/home",
    icon: "home",
}

const SignInToolBar: ToolBarButton = {
    title: "login",
    link: "/login",
    icon: "login",
}

const LogoutToolBar: ToolBarButton = {
    title: "logout",
    link: "logout",
    icon: "logout",
}

const TODO_TOOLBAR: ToolBarButton[] = [
    HomeToolBar,
    LogoutToolBar,
];

const TODO_SIDE: ToolBarButton[] = [
    HomeToolBar,
    LogoutToolBar,
]


///Not logged

const NONE_TOOLBAR: ToolBarButton[] = [
];

const NONE_SIDE: ToolBarButton[] = [
    { title: "call-lawyer", link: "call-lawyer", icon: "call" },
    { title: "text-lawyer", link: "text-lawyer", icon: "textsms" },
    { title: "law-tables", link: "law-tables", icon: "payment", hasDivider: true },

    SignInToolBar,
]

//Customer logged

const CUSTOMER_TOOLBAR: ToolBarButton[] = [
    { title: "profile-home", link: "profile-home", icon: "home" },
    { title: "favorite-lawyers", link: "favorite-lawyers", icon: "favorite" },
    { title: "legal-requests", link: "legal-requests", icon: "assignment" },
    { title: "pending-payments", link: "pending-payments", icon: "payment" },
    { title: "my-calls", link: "my-calls", icon: "call" },
    { title: "my-questions", link: "my-questions", icon: "question_answer", hasDivider: true },

    { title: "call-lawyer", link: "../call-lawyer", icon: "call" },
    { title: "text-lawyer", link: "../text-lawyer", icon: "textsms", hasDivider: true },

    LogoutToolBar,
]


const CUSTOMER_SIDE: ToolBarButton[] = [
    { title: "call-lawyer", link: "call-lawyer", icon: "call" },
    { title: "text-lawyer", link: "text-lawyer", icon: "textsms" },
    { title: "law-tables", link: "law-tables", icon: "payment" },
]


const TOOLBAR = {
    [UserRoles.none]: NONE_TOOLBAR,
    [UserRoles.customer]: CUSTOMER_TOOLBAR,
    [UserRoles.admin]: TODO_TOOLBAR,
    [UserRoles.init]: TODO_TOOLBAR,
    [UserRoles.initLawyer]: TODO_TOOLBAR,
    [UserRoles.lawyer]: TODO_TOOLBAR,
    [UserRoles.manager]: TODO_TOOLBAR,
}

const HEADER = {
    [UserRoles.none]: CUSTOMER_SIDE,
    [UserRoles.customer]: CUSTOMER_SIDE,
    [UserRoles.admin]: CUSTOMER_SIDE,
    [UserRoles.init]: CUSTOMER_SIDE,
    [UserRoles.initLawyer]: CUSTOMER_SIDE,
    [UserRoles.lawyer]: CUSTOMER_SIDE,
    [UserRoles.manager]: CUSTOMER_SIDE,
}

const SIDE = {
    [UserRoles.none]: NONE_SIDE,
    [UserRoles.customer]: CUSTOMER_SIDE,
    [UserRoles.admin]: TODO_SIDE,
    [UserRoles.init]: TODO_SIDE,
    [UserRoles.initLawyer]: TODO_SIDE,
    [UserRoles.lawyer]: TODO_SIDE,
    [UserRoles.manager]: TODO_SIDE,
}

const LINKS = {
    [UserRoles.none]: ["login"],
    [UserRoles.customer]: ["profile", "profile-home"],
    [UserRoles.admin]: [""],
    [UserRoles.init]: [""],
    [UserRoles.initLawyer]: ["lawyer"],
    [UserRoles.lawyer]: [""],
    [UserRoles.manager]: [""],
}



export function getProfileLink(role: UserRole) {
    return LINKS[role ?? UserRoles.none];
}

export function getSideMenu(role: UserRole): ToolBarButton[] {
    return SIDE[role ?? UserRoles.none];
}

export function getToolbarMenu(role: UserRole): ToolBarButton[] {
    return TOOLBAR[role ?? UserRoles.none];
}

export function getHeaderMenu(role: UserRole): ToolBarButton[] {
    return HEADER[role ?? UserRoles.none];
}
