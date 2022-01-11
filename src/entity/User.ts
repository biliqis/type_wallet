import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column
} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id !:number

    @Column()
    email !:string

    @Column()
    password !:string

    @Column({default:"",select:false})
    card?: string

    @Column({default:"",select:false})
    cvv?: string

    @Column({default:""})
    expiryDate?: string

    @Column({default:""})
    accountNumber?: string

    @Column()
    @CreateDateColumn()
    dateCreated !:Date

    @Column()
    @UpdateDateColumn()
    updated !:Date


}