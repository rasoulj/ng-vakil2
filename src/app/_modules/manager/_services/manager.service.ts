import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile, UserRole, UserRoles } from '../../shared/models/user-profile.model';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../shared/config/consts';



@Injectable()
export class ManagerService {
  editUserRole(user: UserProfile, action: string): Observable<any> {
    const url = `${BASE_URL}users/id/${user._id}`;
    return this.http.put(url, {
      role: action,
    });
  }

  constructor(
    private http: HttpClient,
  ) { }


  getUserRole(role: UserRole): Observable<UserProfile[]> {
    const url = `${BASE_URL}users/role/${role}`;
    return this.http.get(url) as Observable<UserProfile[]>;
  }
}
