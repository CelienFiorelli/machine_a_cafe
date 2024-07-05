export interface CreditCardMachineInterface {
    /**
     * Enregistre un callback appelé lors de l'appui sur un bouton de la façade avant
     * @param callback prend un unique paramètre qui contiendra l'ID du bouton pressé
     */
    RegisterCardDetectedCallback(callback: (cardHandle: CardHandleInterface) => void): void;
}

export interface CardHandleInterface {

    /**
     * Tente de prélever le montant passé en paramètre sur la carte
     * @param amountInCents le montant en centimes à prélever
     * @return True si la somme a été prélevée
     * @return False si la somme ne peut pas être prélevée
     */
    TryChargeAmount(amountInCents: number): boolean

    /**
     * Rembourse une somme sur la carte
     * @param amountInCents le montant en centimes à rembourser
     */
    Refund(amountInCents: number): void
}