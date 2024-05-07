// @ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"
import { ControllerState } from "../../controllers/ControllerState";
import { LANGUAGE_CODE_DEFAULT } from "../../config";


@Entity()
export class UserSession {

    @PrimaryColumn({ type:"bigint" })
    id: number;

    @Column({ type:"varchar", length: 256 })
    firstName: string;

    @Column({ 
        type: "int",
        default: ControllerState.none,
    })
    state: ControllerState;

    @Column("varchar",{ 
        length: 8, 
        default: LANGUAGE_CODE_DEFAULT
    })
    languageCode: string;
}
