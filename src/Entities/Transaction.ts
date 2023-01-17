import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Client } from './Client';
import { Person } from './utils/Person';


export enum TranscationTypes {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw'
}

@Entity('transactions')
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: TranscationTypes
    })
    type: string


    @Column({
        type: 'numeric'
    })
    amount: number

    /**Entity1 -> Client
    Entity2 -> Tranasctions
    */
    @ManyToOne(
        () => Client,
        (client) => client.transactions,
        {
            onDelete: 'CASCADE'
        }
    )
    @JoinColumn({
        name: 'client_id'
    })
    client: Client

}