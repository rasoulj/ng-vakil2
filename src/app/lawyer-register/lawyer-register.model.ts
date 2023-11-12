import { GenderEnum, GraduationTypeEnum, LawyerTypeEnum } from "../_modules/shared/models/user-profile.model";

export interface ILawyer {
    firstName?: string,
    lastName?: string,
    phone?: string,
    email?: string,
    lawyerDocId?: string,
    age?: number,
    expertise1?: number,
    expertise2?: number,
    lawyerType?: LawyerTypeEnum,
    gender?: GenderEnum,
    graduationType?: GraduationTypeEnum,
    provinceId?: number,
    cityId?: number,
    address?: string,
    bio?: string,
}