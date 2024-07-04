import {MachineACafé} from "../src/MachineACafé";
import {Pièce} from "../src/Pièce";

describe("MVP", () => {
    test("Cas nominal", () => {
        // ETANT DONNE une machine a café
        let machineACafé = new MachineACafé()

        // QUAND on insère 50cts
        machineACafé.insérer(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir un café
        expect(machineACafé.nombreCafésServis).toEqual(1);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(50);
    })

    test("Cas 2 cafés", () => {
        // ETANT DONNE une machine a café
        let machineACafé = new MachineACafé()

        // QUAND on insère 50cts, 2 fois
        machineACafé.insérer(Pièce.CinquanteCentimes)
        machineACafé.insérer(Pièce.CinquanteCentimes)

        // ALORS il a été demandé au hardware de servir deux cafés
        expect(machineACafé.nombreCafésServis).toEqual(2);

        // ET l'argent est encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(100);
    })

    test.each([
        Pièce.UnCentime,
        Pièce.DeuxCentimes,
        Pièce.CinqCentimes,
        Pièce.DixCentimes,
        Pièce.VingtCentimes,
    ])
    ("Cas pas assez argent : %s", (pièce: Pièce) => {
        // ETANT DONNE une machine a café
        // ET une pièce d'une valeur inférieure 50cts
        let machineACafé = new MachineACafé()

        // QUAND on insère la pièce
        machineACafé.insérer(pièce)

        // ALORS il n'a pas été demandé au hardware de servir un café
        expect(machineACafé.nombreCafésServis).toEqual(0);

        // ET l'argent n'est pas encaissé
        expect(machineACafé.argentEncaisséEnCentimes).toEqual(0);
    })

    // TODO : Plus de 50cts
})