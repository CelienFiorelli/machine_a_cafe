import {HardwareInterface} from "../../src/hardware/hardware.interface";
import {Pièce} from "../../src/Pièce";

export class HardwareFake implements HardwareInterface {
    private _moneyInsertedCallback: (coinValue: number) => void = () => {};
    private _invocationsMakeACoffee: number = 0;

    MakeACoffee(): boolean {
        this._invocationsMakeACoffee ++;
        return true;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._moneyInsertedCallback = callback;
    }

    public SimulerInsertionPièce(pièce: Pièce): void {
        this._moneyInsertedCallback(pièce.getMontant())
    }

    public CountInvocationsMakeACoffee() {
        return this._invocationsMakeACoffee;
    }
}