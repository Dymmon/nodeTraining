import { HttpHeaders } from "@angular/common/http";

export function rutHeaders(rut: string){
    if(rut){
        const headers = new HttpHeaders({
            'dv': rut.slice(-1),
            'rut': rut.substring(0, rut.length - 1)
        });
        return headers;
    }
    const headers = new HttpHeaders({
        'dv': '1',
        'rut': '11111111'
    });
    return headers;
}
