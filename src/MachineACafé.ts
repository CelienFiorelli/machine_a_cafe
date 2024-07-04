import {Pièce} from "./Pièce";

export class MachineACafé {
    private static readonly PrixDuCafé = Pièce.CinquanteCentimes;

    nombreCafésServis: number = 0;
    argentEncaisséEnCentimes: number = 0;

    insérer(pièce: Pièce) {
        if(pièce.EstInférieureA(MachineACafé.PrixDuCafé)) return

        this.nombreCafésServis ++
        this.argentEncaisséEnCentimes += 50
    }
}