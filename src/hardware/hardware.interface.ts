export interface HardwareInterface {
    /**
     * Demande à la machine de faire couler un café
     * @return True si aucun problème, False si défaillance
     */
    MakeACoffee(): boolean

    /**
     * Enregistre un callback, qui sera appelé lors de l'insertion d'une pièce reconnue valide
     * @param callback prend un unique paramètre où sera injecté la valeur de la pièce détectée
     */
    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void;
}