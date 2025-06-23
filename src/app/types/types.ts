// export interface UserProps {
//   gender: string
//   name: {
//     title: string
//     first: string
//     last: string
//   }
//   location: {
//     street: {
//       number: number
//       name: string
//     }
//     city: string
//     state: string
//     country: string
//     postcode: number | string
//     coordinates: {
//       latitude: string
//       longitude: string
//     }
//     timezone: {
//       offset: string
//       description: string
//     }
//   }
//   email: string
//   phone: string
//   cell: string
//   picture: {
//     large: string
//     medium: string
//     thumbnail: string
//   }
//   nat: string
// }
export interface UserProps {
  id:string,
  name:string,
  username:string,
  email:string,
  address:{
    street:string,  
    suite:string,
    city:string,  
    zipcode:string,
    geo:{ 
      lat:string,
      lng:string
    } 
  },
  phone:string,
  website:string,
  company:{ 
    name:string,
    catchPhrase:string,
    bs:string
  }
}