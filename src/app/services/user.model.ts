export interface User {
    uid?: string;
    id?: string;
    email: string;
    roles?: {
        reader: boolean,
        pracownik: boolean,
        admin: boolean,
        VIP: boolean
    }
}