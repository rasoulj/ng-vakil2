import { FormBuilder, Validators } from "@angular/forms";
import { MobileValidator, normalizePhone } from "../_modules/shared/validators/mobile.validator";
import { optionalValidator } from "../_modules/shared/validators/optional.validator";
import { AuthService } from "../_modules/shared/services/auth.service";
import { Injectable } from "@angular/core";
import { ILawyer } from "./lawyer-register.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { BASE_URL } from "../_modules/shared/config/consts";
import { GenderEnum, GraduationTypeEnum, LawyerTypeEnum } from "../_modules/shared/models/user-profile.model";

const LAWYER_REGISTER = "lawyer-register";

function getUrl(ep: string): string {
    return `${BASE_URL}users/${ep}`;
}


@Injectable({
    providedIn: 'root'
})
export class LawyerRegisterService {
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private http: HttpClient,
    ) { }

    form = this.fb.group({
        firstName: ['Rasoul', Validators.required],
        lastName: ['Jafari', Validators.required],
        phone: ['09133834091', [Validators.required, MobileValidator.mobileValidator], [this.auth.mobileExistsValidator()]],


        email: ['rasoulj@gmail.com', [optionalValidator([Validators.email])]],
        lawyerDocId: ['EE-234', Validators.required],
        age: [45, [Validators.required, Validators.max(100), Validators.min(20)]],

        expertise1: [5, Validators.required],
        expertise2: [10, Validators.required],
        lawyerType: [LawyerTypeEnum.lawyer, Validators.required],

        gender: [GenderEnum.male, Validators.required],
        graduationType: [GraduationTypeEnum.phd, Validators.required],
        provinceId: [9, Validators.required],

        cityId: [347, Validators.required],
        address: ['Farsan, Motahari', Validators.required],
        bio: ["I'm Rasoul!"],

    });

    c(name: string) { return this.form.get(name) }

    get data(): ILawyer {
        return {
            firstName: this.c("firstName")?.value,
            lastName: this.c("lastName")?.value,
            phone: normalizePhone(this.c("phone")?.value),
            email: this.c("email")?.value,
            lawyerDocId: this.c("lawyerDocId")?.value,
            age: this.c("age")?.value,
            expertise1: this.c("expertise1")?.value,
            expertise2: this.c("expertise2")?.value,
            lawyerType: this.c("lawyerType")?.value,
            gender: this.c("gender")?.value,
            graduationType: this.c("graduationType")?.value,
            provinceId: this.c("provinceId")?.value,
            cityId: this.c("cityId")?.value,
            address: this.c("address")?.value,
            bio: this.c("bio")?.value,
        }
    }

    create(): Observable<any> {
        return (this.http.post(getUrl(LAWYER_REGISTER), { ...this.data, phone: normalizePhone(this.data.phone ?? "") }) as Observable<any>);
    }

}