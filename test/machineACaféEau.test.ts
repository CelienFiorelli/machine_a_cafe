import { ButtonCodes } from "../src/hardware/hardware.interface";
import {MachineACafé} from "../src/MachineACafé";
import {Pièce} from "../src/Pièce";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"
import { MachineACaféBuilder } from "./utilities/MachineACaféBuilder";

describe("MVP café latté", () => {
    test("Cas eau sélectionné", () => {
        // ETANT DONNE une machine a café ET une pièce inséré
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        const pièce = Pièce.CinquanteCentimes

        // QUAND on choisis de l'eau
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_WATER)
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS l'argent d'un café normal est encaissé
        expect(machineACafé).aucunCaféNEstServi();
        expect(machineACafé).unVerreDEauEstServi();
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })

    test("Cas pas assez d'argent", () => {
        // ETANT DONNE une machine a café
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        
        // QUAND on choisis de l'eau ET une pièce d'une valeur de 5cts
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_WATER)
        machineACafé.SimulerInsertionPièce(Pièce.CinqCentimes)
        
        // ALORS l'eau n'est pas servis ET l'argent n'est pas encaissé
        expect(machineACafé).aucunVerreDEauNEstServi();
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    })
    
    test("Cas ajout de supplément dans de l'eau", () => {
        // ETANT DONNE une machine a café ET une pièce inséré
        let machineACafé = MachineACaféBuilder.ParDéfaut()
        const pièce = Pièce.CinquanteCentimes

        // QUAND on choisis de l'eau avec un supplément
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_WATER)
        machineACafé.SimulerBoutonPressé(ButtonCodes.BTN_MILK)
        machineACafé.SimulerInsertionPièce(pièce)

        // ALORS l'argent d'un pour l'eau est encaissé et le supplément n'est pas ajouté
        expect(machineACafé).aucunCaféNEstServi();
        expect(machineACafé).xCafésSucréeSontServis(0);
        expect(machineACafé).unVerreDEauEstServi();
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(pièce.getMontant());
    })
})