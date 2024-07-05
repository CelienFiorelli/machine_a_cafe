export interface HardwareInterface
    extends ChangeMachineInterface,
        CupProviderInterface,
        ButtonPanelInterface,
        BrewerInterface {
}

export interface BrewerInterface {
    /**
     * Demande à la machine de faire couler un café.
     * Si aucune dose d'eau n'était préchargée dans le bouilleur, la machine tentera d'en charger une
     * @return True si aucun problème, False si défaillance
     */
    MakeACoffee(): boolean

    /**
     * Tire une dose d'eau depuis le réservoir vers le bouilleur
     * @return True si une dose a été tirée avec succès
     * @return False si le bouilleur contenait déjà une dose d'eau
     * @return False si aucune dose complète n'a pu être tirée
     */
    TryPullWater(): boolean

    /**
     * Ajoute une dose de lait au mélange. Il est conseillé d'ajouter le lait en premier.
     * @return True si aucun problème, False si défaillance
     */
    PourMilk(): boolean

    /**
     * Ajoute une dose d'eau au mélange. Il est conseillé d'ajouter l'eau en dernier.
     * Si aucune dose d'eau n'était dans le bouilleur, la machine tentera d'en charger une
     * @return True si aucun problème, False si défaillance
     */
    PourWater(): boolean

    /**
     * Ajoute une dose de sucre au mélange. Il est conseillé d'ajouter le sucre en premier.
     * @return True si aucun problème, False si défaillance
     */
    PourSugar(): boolean
}

export interface CupProviderInterface {
    /**
     * Renvoie l'état du capteur de présence d'une tasse
     * @return True si une tasse est présente
     * @return False si une tasse est absente
     */
    IsCupPresent(): boolean

    /**
     * Relâche un gobelet, s'il en reste. Il est conseillé de vérifier IsCupPresent ensuite.
     */
    ProvideCup(): void
}

export interface ButtonPanelInterface {
    /**
     * Enregistre un callback appelé lors de l'appui sur un bouton de la façade avant
     * @param callback prend un unique paramètre qui contiendra l'ID du bouton pressé
     */
    RegisterButtonPressedCallback(callback: (buttonCode: ButtonCodes) => void): void;
}

export enum ButtonCodes {
    BTN_LUNGO = 0,
    BTN_SUGAR = 1,
    BTN_MILK = 2
}

export interface ChangeMachineInterface {
    /**
     * Enregistre un callback, qui sera appelé lors de l'insertion d'une pièce reconnue valide
     * Attention : si le monnayeur est physiquement plein (plus de 5 pièces), cette méthode n'est
     * plus invoquée. Il est de la responsabilité du logiciel de surveiller cela.
     * @param callback prend un unique paramètre où sera injecté la valeur de la pièce détectée
     */
    RegisterMoneyInsertedCallback(callback: (coinValue: number) => void): void;

    /**
     * Vide le monnayeur et rend l'argent
     */
    FlushStoredMoney(): void;

    /**
     * Vide le monnayeur et encaisse l'argent
     */
    CollectStoredMoney(): void;
}