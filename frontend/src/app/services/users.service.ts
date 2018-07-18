import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UsersService {
    private backendUrl = environment.BACKEND_DOMAIN_NAME;
    private usersUrl = `${this.backendUrl}/v1/users`;
    constructor(private http: HttpClient) { }


    getUserById(id: string, token: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http.get(`${this.usersUrl}/${id}`, {headers});
    }

    update(id: string, user: any, token: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http.patch(`${this.usersUrl}/${id}`, user, {headers});
    }

    getUserMeals(id: string, token: string, filters: any) {
        const keysFilters = Object.keys(filters);
        let query = keysFilters.length ? '?' : '';
        for (const key of keysFilters) {
            query += `${key}=${filters[key]}&`;
        }
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http
            .get(
                `${this.usersUrl}/${id}/meals${query}`, {headers});
    }

    getUserMealsById(userId: string, mealId: string, token: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http
            .get(
                `${this.usersUrl}/${userId}/meals/${mealId}`, {headers});
    }

    updateUserMealsById(userId: string, meal: any, token: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http
            .patch(
                `${this.usersUrl}/${userId}/meals/${meal.id}`, meal, {headers});
    }

    login(body: any) {
        return this.http.post(`${this.usersUrl}/login/`, body);
    }
    signin(body: any) {
        return this.http.post(`${this.usersUrl}/`, body);
    }

    createMeal(meal: any, token: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http.post(`${this.usersUrl}/${meal.userId}/meals`, meal, {headers});
    }

    deleteMeal(userId: string, mealId: string, token: string) {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('x-auth', token);
        return this.http.delete(`${this.usersUrl}/${userId}/meals/${mealId}`, {headers});
    }
}
