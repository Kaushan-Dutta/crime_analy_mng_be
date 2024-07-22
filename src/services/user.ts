//@ts-nocheck
import { db } from "../lib/db.config";

class UserService {
    public static userRegister(payload) {
        console.log("Args:Inside", payload);
        const { email, password } = payload
        return db.account.create({
            data: {
                email: email,
                password: password,
            },
        })
    }
    public static async caseRegister(payload) {
        console.log("Args:Inside", payload);
        const { type,name,phone,pincode,document,account } = payload
        return db.caseApplication.create({
            data: {
                type: type,
                name: name,
                phone: phone,
                pincode: pincode,
                document: document,
                accountId:account,
                
            }
        })
    }
    
    public static async updateCaseEvidence(payload) {
        console.log("Args:Inside", payload);
        const { account, evidence } = payload
        for (let i = 0; i < evidence.length; i++) {
            await db.evidence.create({
                data: {
                    caseId: account,
                    ...evidence[i],
                }
            })
        }
        return true
    }

}
export default UserService