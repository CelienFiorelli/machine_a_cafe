declare global {
    namespace jest {
        interface Matchers<R> {
            xCafésSontServis(expected: number): R
            aucunCaféNEstServi(): R
            unCaféEstServi(): R
            unVerreDEauEstServi(): R
            aucunVerreDEauNEstServi(): R
            xCafésLattéSontServis(expected: number): R
            xCafésSucréeSontServis(expected: number): R
        }
    }
}

export {};
