import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm'
import { Banker } from './Banker'
import { Transaction } from './Transaction'
import { Person } from './utils/Person'

@Entity('client')
export class Client extends Person {

    @Column({
        type: 'numeric'
    })
    balance: number

    @Column({
        default: true,
        name: "active"
    })
    is_active: boolean

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        age: number,
        Birth_Place: string
    }

    @Column({
        default: [],
        type: "simple-array"
    })
    family_members: string[]

    @OneToMany(
        () => Transaction,
        (transaction) => transaction.client   //foreign key
    )
    transactions: Transaction[]

    @ManyToMany(
        () => Banker
    )
    bankers: Banker[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}