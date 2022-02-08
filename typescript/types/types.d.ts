import { RowDataPacket, OkPacket, ResultSetHeader } from "mysql2"

// Workaround to allow certain variables to exists in all types specified under MySQLQueryCombinedTypes
type MySQLQueryCombinedTypes = OkPacket | ResultSetHeader | RowDataPacket[] | RowDataPacket[][] | OkPacket[]
export interface MySQLQueryResult extends MySQLQueryCombinedTypes {
    length?: number
    insertId?: number
    affectedRows?: number
}


// Declaration merging to explicitly define what data will exists inside each session
declare module 'express-session' {
    export type SessionUser = string | undefined

    export interface SessionData {
      user: SessionUser
    }
}

// Declaration merging to explicitly define what type of data will exists in request params and request body
declare module 'express' {

    export interface Request {
      body: { [key: string]: string}
      params: { [key: string]: string}
    }
}


