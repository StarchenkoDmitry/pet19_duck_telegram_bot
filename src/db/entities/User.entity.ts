import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"
import { ControllerState } from "../../controllers/ControllerState";


@Entity()
export class UserSession {

    @PrimaryColumn({ type:"bigint" })
    id: number

    @Column({ type:"varchar", length: 256 })
    firstName: string

    @Column({ 
        type: "enum",
        enum: ControllerState,
        default: ControllerState.none,
    })
    state: ControllerState;
}
