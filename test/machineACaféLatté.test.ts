import {MachineACafé} from "../src/MachineACafé";
import {Pièce} from "../src/Pièce";
import {HardwareFake} from "./utilities/HardwareFake";
import "./utilities/HardwareMatchers"

describe("MVP", () => {
    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let hardware = new HardwareFake()
        let machineACafé = new MachineACafé(hardware)

        // QUAND on insère 50cts, 2 fois
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)
        hardware.SimulerInsertionPièce(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(hardware).xCafésSontServis(2);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(100);
    })
    
    test("Cas assez d'argent", () => {
        // ETANT DONNE une machine a café ET une pièce d'une valeur de 60cts
        // QUAND on choisis un café latté
        // ALORS le café latté est servis ET l'argent est encaissé
    })
    
    test("Cas pas assez d'argent", () => {
        // ETANT DONNE une machine a café ET une pièce d'une valeur de 50cts
        // QUAND on choisis un café latté
        // ALORS le café latté n'est pas servis et l'argent n'est pas encaissé
    })
    
    test("Cas pas de café", () => {
        // ETANT DONNE une machine a café ET une pièce est insérée
        // QUAND on choisis un type de café et qu'il n'est plus disponible en quantité suffisante
        // ALORS Une erreur s'affiche et l'argent est rendue (?)
    })
})