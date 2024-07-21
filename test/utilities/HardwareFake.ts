import {ButtonCodes, HardwareInterface, SupplementType} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";

export class HardwareFake implements HardwareInterface {
    FlushStoredMoney(): void {
        throw new Error("Method not implemented.");
    }
    CollectStoredMoney(): void {
        throw new Error("Method not implemented.");
    }
    IsCupPresent(): boolean {
        throw new Error("Method not implemented.");
    }
    ProvideCup(): void {
        throw new Error("Method not implemented.");
    }
    TryPullWater(): boolean {
        throw new Error("Method not implemented.");
    }
    PourMilk(): boolean {
        this._invocationsPourMilk ++;
        return true;
    }
    PourWater(): boolean {
        throw new Error("Method not implemented.");
    }
    PourChocolate(): boolean {
        this._invocationsPourChocolate ++;
        return true;
    }
    PourSugar(): boolean {
        this._invocationsPourSugar ++;
        return true;
    }

    private _moneyInsertedCallback: (coinValue: number) => void = () => {};
    private _buttonPressedCallback: (buttonCode: ButtonCodes) => void = () => {};
    private _invocationsMakeWater: number = 0;
    private _invocationsMakeACoffee: number = 0;
    private _invocationsPourMilk: number = 0;
    private _invocationsPourChocolate: number = 0;
    private _invocationsPourSugar: number = 0;

    MakeACoffee(): boolean {
        this._invocationsMakeACoffee ++;
        return true;
    }

    MakeWater(): boolean {
        this._invocationsMakeWater ++;
        return true;
    }

    ajouteSupplement(supplement: SupplementType): boolean {
        switch (supplement) {
            case SupplementType.MILK:
                this.PourMilk()
                break;
            case SupplementType.SUGAR:
                this.PourSugar()
                break;
            case SupplementType.CHOCOLATE:
                this.PourChocolate()
                break;
            case SupplementType.CAPUCHINO:
                this.PourMilk()
                this.PourSugar()
                break;
            default:
                return false
        }
        return true
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._moneyInsertedCallback = callback;
    }

    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        this._buttonPressedCallback = callback;
    }

    public SimulerInsertionPièce(pièce: Pièce): void {
        this._moneyInsertedCallback(pièce.getMontant())
    }

    public SimulerBoutonPressé(bouton: ButtonCodes): void {
        this._buttonPressedCallback(bouton)
    }

    public CountInvocationsMakeACoffee() {
        return this._invocationsMakeACoffee;
    }
  
    public CountInvocationsPourSugar() {
        return this._invocationsPourSugar;
    }
  
    public CountInvocationsPourChocolate() {
        return this._invocationsPourChocolate;
    }

    public CountInvocationsPourMilk() {
        return this._invocationsPourMilk;
    }
   
    public CountInvocationsMakeWater() {
        return this._invocationsMakeWater;
    }
}