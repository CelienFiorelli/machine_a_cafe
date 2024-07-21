import { ButtonCodes } from "../../src/hardware/hardware.interface";
import {MachineACafé} from "../../src/MachineACafé";
import {Pièce} from "../../src/Pièce";
import {HardwareFake} from "./HardwareFake";

export class MachineACaféHarness extends MachineACafé {
    private hardware: HardwareFake;

    public constructor(hardware: HardwareFake) {
        super(hardware);
        this.hardware = hardware;
    }

    public SimulerInsertionPièce(pièce: Pièce) : void{
        this.hardware.SimulerInsertionPièce(pièce)
    }

    public SimulerBoutonPressé(bouton: ButtonCodes) : void{
        this.hardware.SimulerBoutonPressé(bouton)
    }

    public CountInvocationsMakeACoffee() {
        return this.hardware.CountInvocationsMakeACoffee();
    }

    public CountInvocationsPourSugar() {
        return this.hardware.CountInvocationsMakeACoffee();
    }

    public CountInvocationsPourMilk() {
        return this.hardware.CountInvocationsPourMilk();
    }

    public CountInvocationsMakeWater() {
        return this.hardware.CountInvocationsMakeWater();
    }
}