import {HardwareFake} from "./HardwareFake";
import {MachineACaféHarness} from "./MachineACaféHarness";
import {PénurieGobeletsDecorator} from "./PénurieGobeletsDecorator";

export class MachineACaféBuilder {
    private _pénurieGobelets: boolean = false;
    public static ParDéfaut() {
        return new MachineACaféBuilder().Build()
    }

    public Build() : MachineACaféHarness {
        let hardware: HardwareFake = new HardwareFake();
        if(this._pénurieGobelets) hardware = new PénurieGobeletsDecorator(hardware);

        return new MachineACaféHarness(hardware)
    }

    SansGobelets() {
        this._pénurieGobelets = true;
        return this;
    }
}