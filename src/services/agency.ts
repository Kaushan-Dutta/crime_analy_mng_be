//@ts-nocheck
import { db } from "../lib/db.config";
class AgencyService {
    public static agencyRegister(payload) {
        console.log("Args:Inside AgencyRegister", payload);

        return db.agencyApplication.create({
            data: {
                ...payload
            },
        })

    }
    
    public static async getNearestAgency(payload) {
        const { latitude, longitude } = payload
        console.log("Args:Inside PostAlert",payload);
        const agencies = await db.account.findMany({
            where: {
                role: "AGENCY"
            },
            select: {
                id: true,
                location: true
            }
        });

        let agencyId = null;
        let minDistance = 100000;
        
        agencies.forEach(agency => {
            if(!agency.location) {
                return;
            }
            // console.log(agency.location?.latitude)
            const distance = Math.abs(latitude - agency.location.latitude) + Math.abs(longitude - agency.location.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                agencyId = agency.id;
            }
        })
        console.log(agencyId)
        if(agencyId === null) {
            throw new Error("No agency found")
        }
        return agencyId
    }
    
    public static  updateCaseStatus(payload) {
        console.log("Args:Inside UpdateCaseStatus", payload);
        const { id, status } = payload
        console.log(id, status);
        
        return db.caseApplication.update({
            where: { id: id },
            data: { status: status },
        })
    }
    public static getAgencyCases(payload) {
        console.log("Args:Inside GetAgencyCases", payload);
        const { agencyId } = payload
        return db.caseAgencyMap.findMany({
            where: {
                agencyId: agencyId,
            },

            include: {
                case:{
                    
                    select:{
                        id:true,
                        type:true,
                        createdAt:true,
                        title:true,
                        status:true,
                        reporter:true,
                        location:{
                            select:{
                                pincode:true,
                                state:true,
                                country:true,
                                district:true
                            }
                        }
                    }
                }
            }
        })

    }
    public static async getAllCases() {
        console.log("Args:Inside GetAllCases");
        const cases=await db.caseAgencyMap.findMany({
            
            include: {
                case:{
                    
                    select:{
                        id:true,
                        type:true,
                        createdAt:true,
                        title:true,
                        status:true,
                        reporter:true,
                        location:{
                            select:{
                                pincode:true,
                                state:true,
                                country:true,
                                district:true
                            }
                        }
                    }
                }
            }
        })
        return cases

    }
  

    public static getAgencyCaseMap(payload) {
        console.log("Args:Inside GetAgencyCaseMap", payload);
        const { agencyId, caseId } = payload
        return db.caseAgencyMap.findFirst({
            where: {
                AND: [
                    { agencyId: agencyId },
                    { caseId: caseId }
                ]
            },
            include: {
                agency: {
                    select: {
                        name: true
                    }
                },
            }

        })

    }
    public static sendCaseReq(payload){
        console.log("Args:Inside SendCaseReq", payload);
        const {requestMessage}=payload;
        return {message:"Case Request Sent"}       
    }
    
    public static updateCaseEvidence(payload) {
        return { message: "Case Evidence Updated" }
    }
}
export default AgencyService