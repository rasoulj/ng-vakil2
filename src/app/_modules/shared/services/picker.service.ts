import { HttpClient } from "@angular/common/http";
import { Observable, map, of, tap } from "rxjs";
import { BASE_URL } from "../config/consts";
import { Injectable } from "@angular/core";
import { getItem, removeItem, setItem } from "../utils/utils";
import { GenderEnum, GraduationTypeEnum, LawyerTypeEnum } from "../models/user-profile.model";


const NA = "NA";


function getUrl(type: string, id: any) {
    return `${BASE_URL}picker/${type}/${id}`;
}

export interface PickedValue {
    name: string,
    id: number,
}

@Injectable({
    providedIn: 'root'
})
export class PickerService {
    constructor(private http: HttpClient) {
    }

    get(url: string): Observable<Object> {
        const local = getItem(url);
        if (!local) {
            return this.http.get(url).pipe(
                tap((value) => {
                    removeItem(url);
                    setItem(url, JSON.stringify(value));
                })
            );
        } else {
            return of(JSON.parse(local));
        }
    }

    getAddress(id: number): Observable<PickedValue[]> {
        return this.get(getUrl("address", id)) as Observable<PickedValue[]>;
    }

    getCityName(pid: number | undefined, cid: number | undefined): Observable<string> {
        if (!pid || !cid) {
            return of(NA);
        }
        return (this.get(getUrl("address", `${pid}/${cid}`)) as Observable<{ name: string }>).pipe(
            map(p => p.name)
        );
    }

    getProvinceName(pid: number | undefined): Observable<string> {
        if (!pid) {
            return of(NA);
        }
        return (this.get(getUrl("address", `0/${pid}`)) as Observable<{ name: string }>).pipe(
            map(p => p.name)
        );
    }

    getExpertise(id: number): Observable<PickedValue[]> {
        return this.get(getUrl("expertise", id)) as Observable<PickedValue[]>;
    }

    getExpertiseName(id: number | undefined): Observable<string> {
        if (!id) {
            return of(NA);
        }

        return (this.get(getUrl("expertise", `n/${id}`)) as Observable<{ name: string }>).pipe(
            map(p => p.name)
        );
    }

    getGraduationType(): GraduationTypeEnum[] {
        return [GraduationTypeEnum.bachelor, GraduationTypeEnum.master, GraduationTypeEnum.phd,];
    }

    getLawyerType(): LawyerTypeEnum[] {
        return [LawyerTypeEnum.lawyer, LawyerTypeEnum.lawyerStudent];
    }

    getGenderType(): GenderEnum[] {
        return [GenderEnum.male, GenderEnum.female];
    }
}