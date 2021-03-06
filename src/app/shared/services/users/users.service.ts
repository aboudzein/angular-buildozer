import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersModel, ListEntityResponse, ListEntityQuery, PlainQuery } from '@shared/models';
import { map } from 'rxjs/operators';
import { TokenHelper } from '@core/helpers/token';
import { Constants } from '@core/constants';

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private http: HttpClient,
        private tokenService: TokenHelper
    ) { }

    public getUsers() {
        return this.http.get<ListEntityResponse<UsersModel.IUser>>(Constants.API.USERS.base)
            .pipe(map(({ list }) => list));
    }

    public searchForUsers(username: string) {
        const plainQuery = new PlainQuery<UsersModel.SearchForUserQuery>({ username, page: 0, size: 20 });
        return this.http.get<ListEntityResponse<UsersModel.IUser>>(`${Constants.API.USERS.search}?${plainQuery.asString}`)
            .pipe(map(({ list }) => list));
    }

    public getUsersWithoutMe() {
        return this.getUsers()
            .pipe(map(list => list.filter(user => user._id !== this.tokenService.decodedToken.id)));
    }

    public getCurrentUser() {
        return this.http.get<UsersModel.IUser>(`${Constants.API.USERS.base}/${this.tokenService.decodedToken.id}`)
    }

}

