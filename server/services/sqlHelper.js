"use strict";

import mysqlPromise from "mysql2/promise.js";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import logger from "./logger.js";
import AppError from "./customError.js";
import helpers from "./helpers.js";

export default class sqlHelper {

  #dbhost ;
  #dbport ;
  #dbname ;
  #dbuser ;
  #dbpass ;
  
  constructor(tracer = null) {
    
    this.Version = "sqlHelper.js May 28 2026, 1.66";

    /** Implement singleton pattern */
    if(!!sqlHelper.instance) {
      return sqlHelper.instance;
    }
    // 1st call to constructor, initialize the instance
    // Get environment variables and log the result
    let serverenv = { message: 'No env file searched yet', filepath: '' };
    async function getEnvAndLog() {
      serverenv = await helpers.findEnvFile();
      console.log(`************************* serverenv search result: ${serverenv.message}, file path: ${serverenv.filepath}  `);
      return serverenv;
    }
    getEnvAndLog().then(env => {
      this.getEnv(env.filepath);      
      this.#dbhost = process.env.DBHOST; 
      this.#dbport = process.env.DBPORT;
      this.#dbname = process.env.DBNAME;
      this.#dbuser = process.env.DBUSER;
      this.#dbpass = process.env.DBPASS;
      this.logger = logger;
      
      this.pool = this.#createPool();
      sqlHelper.instance = this;
      return this;
    }).catch(error => {
      console.error(`Error fetching environment variables: ${error}`);
    });
  }
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  getVersion() {
    return this.Version;
  }
  // ------------------------------------------------------------------------
  Select(query, params = null, conn) {
    if(conn === null || conn === undefined ) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ rows ] = await conn.query(query, params);
          resolve(rows) ;
        }
        catch(error) {
          reject(error);
        }
      })();
    });
  }
  // ------------------------------------------------------------------------
  Insert(sql, params = null, conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ result, fields ] = await conn.execute(sql, params);
          resolve(result) ;
        }
        catch(error) {
          console.log(`INSERT ERROR ${error}`);
          reject(error);
        }
      })();
    });
  }
  // ------------------------------------------------------------------------
  Delete(sql, params = null, conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ result, fields ] = await conn.execute(sql, params);
          resolve(result) ;
        }
        catch(error) {
          console.log(`DELETE ERROR ${error}`);
          reject(error);
        }
      })();
    });
  }
  // ------------------------------------------------------------------------
  Update(sql, params = null, conn ) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ result, fields ] = await conn.execute(sql, params);
          resolve(result) ;
        }
        catch(error) {
          console.log(`UPDATE ERROR ${error}`);
          reject(error);
        }
      })();
    });
  }
  
  
  // ------------------------------------------------------------------------
  startTransactionRW() {
    return new Promise((resolve, reject) => {
      (async () => {
        let theconnection = null;
        try {
          theconnection = await this.pool.getConnection();
          if(theconnection == null) {
            throw new AppError("SQLHelper startRW cannot get a connection");
          }
          await theconnection.execute('set transaction read write');
          resolve(theconnection);
        }
        catch(err) {
          if(theconnection != null) {
            this.pool.releaseConnection(theconnection);
          }
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  startTransactionRO() {
    return new Promise((resolve, reject) => {
      (async () => {
        let theconnection = null;
        try {
          theconnection = await this.pool.getConnection();
          if(theconnection == null) {
            throw new AppError("SQLHelper startRO cannot get a connection");
          }
          await theconnection.execute('set transaction read only');
          resolve(theconnection);
        }
        catch(err) {
          if(theconnection != null) {
            this.pool.releaseConnection(theconnection);
          }
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  rollbackTransaction(conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
              await conn.execute('rollback');
              this.pool.releaseConnection(conn);
              resolve(true);
        }
        catch(err) {
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  commitTransaction(conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
              await conn.execute('commit');
              this.pool.releaseConnection(conn);
              resolve(true);
        }
        catch(err) {
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
  getEnv(envFile) {
    dotenv.config({ 
      path: path.resolve('./', envFile),
      debug: true,
      // quiet: true 
    });
    return process.env[envFile];
  }

  #createPool() {
      console.log(`createPool : host=${this.#dbhost}, port=${this.#dbport}, database=${this.#dbname}, user=${this.#dbuser}`);
      try {
        const pool = mysqlPromise.createPool({
            host: this.#dbhost, 
            port: this.#dbport,
            database: this.#dbname,
            user: this.#dbuser,
            password: this.#dbpass,
            waitForConnections: true,
            connectionLimit: 50,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            charset: 'utf8mb4',
            keepAliveInitialDelay: 0,
          });
          return(pool);
      }
      catch( error ) {
        throw new Error(`Got a problem with connection pooling ${error}`);
      }
  }
}