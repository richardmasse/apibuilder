import sql from 'mssql';
import { config } from 'mssql';

export default class Sql {
    databaseConfiguration: config;

    constructor(config: any) {

        // Database
        this.databaseConfiguration = {
            user: config.db.user,
            password: config.db.password,
            server: config.db.server,
            database: config.db.database,
            // debug: true,
            // multipleStatements: true,
            options: {
                encrypt: false,
                port: 1433
            },
            pool: {
                max: 50,
                min: 10,
                idleTimeoutMillis: 30000,
            }
        };
    }

    // Connect to database
    async connectDB(): Promise<any> {
        const pool = new sql.ConnectionPool(this.databaseConfiguration);
        try {
            await pool.connect();
            return pool;
        } catch (err) {
            console.log('Database connection failed!', err);
            return err;
        }
    }
    
    async executeQuery(statement: String, input: any): Promise<any> {
        const DB:any = await this.connectDB();
        try {
            const request = DB.request();
            for (const [key, value] of Object.entries(input)) {
                request.input(key, value);
            };
            console.log(statement);
            const result = await request.query(statement);
            return result.recordset;
        } catch (err) {
            console.log('Error querying database', err);
            return err;
        } finally {
            DB.close();
        }
    }
    
    async executeQueryNew(res:any, statement: String, input: any): Promise<any> {
        try {
            const result = await this.executeQuery(statement, input);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ status: 400, message: error });
        }
    }

    
}