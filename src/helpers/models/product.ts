import type { IUser } from "./user"

export interface IBusiness {
    "id": string,
    "createdDate": number,
    "lastModifiedDate": number,
    "isDeleted": boolean,
    "name": string,
    "category": string,
    "openingHours": any,
    "images": Array<
        string
    >,
    "price": string,
    "hasFixedPrice": boolean,
    "discount": number,
    "description": string,
    "rating": number,
    "vendor": IUser,
    "totalBooking": 0,
    "isOnline": boolean,
    "address": any,
    "email": string,
    "phone": string,
    "socialMediaHandles": Array<any>,
    "website": string,
    "location": {
        "link": any,
        "address": any,
        "country": any,
        "street": any,
        "city": any,
        "zipcode": any,
        "state": string,
        "locationDetails": any,
        "latlng": any,
        "placeIds": any,
        "toBeAnnounced": any
    },
    "state": string,
    "hasBought": boolean,
    "hasReviewed": boolean
}