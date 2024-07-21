import {ButtonCodes} from "../../src/hardware/hardware.interface";
import {HardwareFake} from "./HardwareFake";

export class HardwareFakeDecorator extends HardwareFake {
    private _decorated: HardwareFake;

    public constructor(decorated: HardwareFake) {
        super();
        this._decorated = decorated;
    }

    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void {
        this._decorated.RegisterMoneyInsertedCallback(callback)
    }
    FlushStoredMoney(): void {
        this._decorated.FlushStoredMoney()
    }
    CollectStoredMoney(): void {
        this._decorated.CollectStoredMoney()
    }
    IsCupPresent(): boolean {
        return this._decorated.IsCupPresent()
    }
    ProvideCup(): void {
        return this._decorated.ProvideCup()
    }
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void {
        return this._decorated.RegisterButtonPressedCallback(callback)
    }
    MakeACoffee(): boolean {
        return this._decorated.MakeACoffee()
    }
    TryPullWater(): boolean {
        return this._decorated.TryPullWater()
    }
    PourMilk(): boolean {
        return this._decorated.PourMilk()
    }
    PourWater(): boolean {
        return this._decorated.PourWater()
    }
    PourSugar(): boolean {
        return this._decorated.PourSugar()
    }
}

export class PénurieGobeletsDecorator extends HardwareFakeDecorator {
    public constructor(decorated: HardwareFake) {
        super(decorated);
    }

    ProvideCup(): void {
        throw new Error("Plus de gobelets")
    }
}