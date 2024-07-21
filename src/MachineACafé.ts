import {Pièce} from "./Pièce";
import {BoissonType, ButtonCodes, HardwareInterface, SupplementType} from "./hardware/hardware.interface";

export class MachineACafé {
    private readonly _hardware: HardwareInterface;

    constructor(hardware: HardwareInterface) {
        hardware.RegisterMoneyInsertedCallback((montant: number) => {
            this.insérer(Pièce.Parse(montant))
        })
        hardware.RegisterButtonPressedCallback((bouton: number) => {
            this.sélectionnerOption(bouton)
        })

        this._hardware = hardware
    }

    private static readonly prixDuCafé: Pièce = Pièce.CinquanteCentimes;
    private static readonly supplement: any = {
        [ButtonCodes.BTN_MILK]: {price: Pièce.DixCentimes, type: SupplementType.MILK },
        [ButtonCodes.BTN_LUNGO]: {price: Pièce.UnEuro, type: SupplementType.LUNGO },
        [ButtonCodes.BTN_SUGAR]: {price: Pièce.CinqCentimes, type: SupplementType.SUGAR },
        [ButtonCodes.BTN_CHOCOLATE]: {price: Pièce.CinqCentimes, type: SupplementType.CHOCOLATE },
        [ButtonCodes.BTN_CAPUCHINO]: {price: Pièce.CinqCentimes, type: SupplementType.CAPUCHINO },
    }
    private boissonSélectionné: BoissonType = BoissonType.CAFFE;

    supplementSélectionnés: Array<any> = [];

    argentEncaisséEnCentimes: number = 0;

    private insérer(pièce: Pièce) {
        const pièces = [MachineACafé.prixDuCafé]
        if (this.supplementSélectionnés) pièces.push(...this.supplementSélectionnés.map(ss => ss.price));

        if(pièce.EstInférieureA(pièces)) return
        
        if (this.supplementSélectionnés.length) {
            for (const supplement of this.supplementSélectionnés) {
                this._hardware.ajouteSupplement(supplement.type)
            }
        }
        if (this.boissonSélectionné === BoissonType.WATER) {
            this._hardware.MakeWater()
        } else {
            this._hardware.MakeACoffee()
        }
        this.argentEncaisséEnCentimes += pièce.getMontant()
    }

    private sélectionnerOption(bouton: ButtonCodes) {
        if (bouton === ButtonCodes.BTN_WATER || this.boissonSélectionné === BoissonType.WATER) {
            this.boissonSélectionné = BoissonType.WATER;
            return
        }
        this.supplementSélectionnés.push(MachineACafé.supplement[bouton])
    }
}