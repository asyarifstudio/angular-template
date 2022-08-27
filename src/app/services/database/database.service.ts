import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { Model } from "src/app/models/model";
import { environment } from "src/environments/environment";

export class DatabaseService<M extends Model>{

    protected path: string;
    constructor(protected http: HttpClient, path: string) {
        this.path = `${environment.server}/${path}`
    }

    get(): Promise<M[]> {
        return firstValueFrom(this.http.get<M[]>(`${this.path}`));
    }
    getById(id: string): Promise<M> {
        return firstValueFrom(this.http.get<M>(`${this.path}/${id}`))
    }

    add(m: M): Promise<M> {
        return firstValueFrom(this.http.post<M>(this.path, m));
    }

    update(id: string, m: M): Promise<M> {
        return firstValueFrom(this.http.put<M>(`${this.path}/${id}`, m));
    }

    query(params: any): Promise<M[]> {
        return firstValueFrom(this.http.get<M[]>(`${this.path}`, {
            params
        }));
    }
}