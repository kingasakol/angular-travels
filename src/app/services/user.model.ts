export interface User {
    uid: string;
    email: string;
    roles?: {
        reader: boolean,
        pracownik: boolean,
        admin: boolean,
        VIP: boolean
    },
    basket?: {
        count: number,
        travel: string[]
    }
}