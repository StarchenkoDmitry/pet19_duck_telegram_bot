import { StorageAdapter } from "grammy";
import { DataSource, Repository } from "typeorm";
import { UserSession } from "./entities/User.entity";


export class SessionStorage implements StorageAdapter<UserSession> {
    private readonly rep: Repository<UserSession>;
    constructor(private readonly db:DataSource) {
        this.rep = db.getRepository(UserSession);
    }

    async read(key: string):Promise<UserSession | undefined> {
        console.log("read: ", key);
        const user = await this.rep.findOne({
            where:{
                id: parseInt(key)
            }
        });
        if(user === null) return undefined;
        return user;
    }

    async has(key: string) {
        console.log("has: ", key);
        const res = await this.rep.exists({
            where:{
                id: parseInt(key)
            }
        });
        console.log("exist: ",res, key);
        return res;
    }

    async write(key: string, value: UserSession) {
        console.log("write: ", key,value);
        await this.rep.save(value);
    }

    async delete(key: string) {
        console.log("delete: ", key);
        await this.rep.delete({
            id: parseInt(key)
        });
    }
}
