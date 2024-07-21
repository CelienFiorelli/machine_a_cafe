import { ButtonCodes } from "../src/hardware/hardware.interface";
import {MachineACafé} from "../src/MachineACafé";
import {Pièce} from "../src/Pièce";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

describe("MVP café latté", () => {
    test("Cas pas de type de café sélectionné", () => {
        // ETANT DONNE une machine a café ET une pièce inséré
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        const pièce = Pièce.CinquanteCentimes
        machineACafé.SimulerInsertionPièce(pièce)

        // QUAND on ne choisis pas de type de café
        // ALORS l'argent d'un café normal est encaissé
        expect(machineACafé).unCaféEstServi();
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })

    test("Cas assez d'argent", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        
        // QUAND on choisis un café latté ET une pièce d'une valeur de 60cts
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_MILK)
        machineACafé.SimulerInsertionPièce(Pièce.UnEuro)
        
        // ALORS le café latté est servis ET l'argent est encaissé
        expect(machineACafé).xCafésLattéSontServis(1);
    })
    
    test("Cas pas assez d'argent", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        // QUAND on choisis un café latté ET qu'on insère une pièce d'une valeur inférieur a 60cts
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_MILK)
        machineACafé.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS le café latté n'est pas servis et l'argent n'est pas encaissé
        expect(machineACafé).xCafésLattéSontServis(0);
    })

    test("Cas café avec plusieurs supplément", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()

        // QUAND on choisis un type de café puis un autre ET une pièce est insérée
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_SUGAR)
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_MILK)

        machineACafé.SimulerInsertionPièce(Pièce.UnEuro)

        // ALORS un café avec plusieurs supplement est servis
        expect(machineACafé).xCafésLattéSontServis(1);
        expect(machineACafé).xCafésSucréeSontServis(1);
    })
})