export class Pièce {
    public static CinquanteCentimes: Pièce = new Pièce(50);
    static VingtCentimes: Pièce = new Pièce(20);
    static DixCentimes: Pièce = new Pièce(10);
    static CinqCentimes: Pièce = new Pièce(5);
    static DeuxCentimes: Pièce = new Pièce(2);
    static UnCentime: Pièce = new Pièce(1);
    private readonly _montant: number;

    private constructor(montant: number) {
        this._montant = montant;
    }

    EstInférieureA(comparée: Pièce) {
        return this._montant < comparée._montant;
    }

    public toString(){
        return this._montant.toString() + 'cts';
    }
}