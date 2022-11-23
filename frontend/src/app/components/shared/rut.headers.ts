import { HttpHeaders } from "@angular/common/http";

export function rutHeaders(rut: string){
    const headers = new HttpHeaders({
        'dv': rut.slice(-1),
        'rut': rut.substring(0, rut.length - 1)
    });
    return headers;
}
