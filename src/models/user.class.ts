// export class User {
//     firstName: string;
//     lastName: string;
//     email: string;
//     birthDate: number;
//     street: string;
//     zipCode: number;
//     city: string;


//     constructor(obj?: any){
//         this.firstName = obj ? obj.firstName : '';
//         this.lastName = obj ? obj.lastName : '';
//         this.email = obj ? obj.email : '';
//         this.birthDate = obj ? obj.birthDate : '';
//         this.street = obj ? obj.street : '';
//         this.zipCode = obj ? obj.zipCode : '';
//         this.city = obj ? obj.city : '';

//     }


//     public toJSON() {
//         return {

//             firstName: this.firstName,
//             lastName: this.lastName,
//             email: this.email,
//             birthDate: this.birthDate,
//             street: this.street,
//             zipCode: this.zipCode,
//             city: this.city

//         };
//     }
// }



export class User {
    uid: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    createdAt: number;

    constructor(obj: any) {
        this.uid = obj ? obj.uid : '';
        this.email = obj ? obj.email : '';
        this.displayName = obj ? obj.displayName : '';
        this.emailVerified = obj ? obj.emailVerified : '';
        this.isAnonymous = obj ? obj.isAnonymous : '';
        this.createdAt = obj ? obj.metadata.createdAt : '';
    }

    /**
     * Converts a user object into a JSON
     * @returns JSON
     */
    public UserToJSON() {
        return {
            uid: this.uid,
            email: this.email,
            displayName: this.displayName,
            emailVerified: this.emailVerified,
            isAnonymous: this.isAnonymous,
            createdAt: this.createdAt,
        }
    }
}