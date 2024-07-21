declare global {
    namespace jest {
        interface Matchers<R> {
            xCafésSontServis(expected: number): R
            aucunCaféNEstServi(): R
            unCaféEstServi(): R
            unVerreDEauEstServi(): R
            aucunVerreDEauNEstServi(): R
            xCafésChocolatSontServis(expected: number): R
            xCafésLattéSontServis(expected: number): R
            xCafésSucréeSontServis(expected: number): R
        }
    }
}

export {};
