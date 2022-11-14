import { Component} from "@angular/core";

@Component({
    selector: "componente1",
    templateUrl: "./componente1.component.html"
})
export class Componente1{
    public titulo: string;
    public comentario: string;
    public year: number ;
    constructor(){
        this.titulo = "Tremendo el componente1"
        this.comentario = "Este"
        this.year = 2022
    }
}
