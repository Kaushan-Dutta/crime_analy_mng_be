//@ts-nocheck
import { db } from "../lib/db.config";
class AdminService{
    public static createEvent(payload){
        const {description,date,name,location} = payload
        console.log("Args:Inside",description,date,name,location);
        const formattedDate = new Date(date).toISOString();

        return db.event.create({
            data: {
                description:description,
                date:formattedDate,
                name:name,
                location:location
            },
        })
    }
    public static async updateAgencyFormStatus(payload){
        const {id,status} = payload
        console.log("Args:Inside",id,status);
        const update=await  db.agencyApplication.update({
            where:{
                id:id
            },
            data:{
                status:status
            }
        })
        console.log(update);
        if(update && update.status==="APPROVED"){
            const createAcc=await this.createAgencyAcccount(update)
            console.log(createAcc);
            if(createAcc){
                
                    const setAgencyLoc=await this.setAgencyLoc({account:createAcc.id,...update})
                    if(setAgencyLoc){
                        return true
                    }
                
            }
            
        }
        throw new Error("Error updating form status")
    
    }
    private static async createAgencyAcccount(payload){
        console.log(payload)
        return db.account.create({
            data: {
                email: payload.email,
                password: "agency",
                role: "AGENCY",
                name: payload.name,
                phone: payload.phone,
        }})
    }
    
    private static async setAgencyLoc(payload){
        const {latitude,longitude,account,pincode,state,city} = payload
        return db.location.create({
            data: {
                latitude:latitude,
                longitude:longitude,
                pincode:pincode,
                state:state,
                city:city,
                accountId:account
            },
        })
    }
    public static async getAgencyForms(payload){
        console.log("Args:Inside ",payload);
        return db.agencyApplication.findMany()
    }
    public static async getEvents(payload){
        console.log("Args:Inside",payload);
        return db.event.findMany()
    }
}
export default AdminService
// mutation CreateEvent($data:EventInput){
//     createEvent(data:$data){
//       message
//     }
//   }