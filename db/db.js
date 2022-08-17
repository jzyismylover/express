/**
 * 封装数据库增删查改
 */

const mysql = require('mysql')
const dbconfig = require('./dbconfig')
const pool = mysql.createPool(dbconfig)
const sql = require('./sql/index')
const json = require('./json')

// 封装 sql 传参
const paramList = (obj) => {
  let paramArr = [];
  for (let key in obj) {
    if (obj[key]) {
      paramArr.push(obj[key]);
    }
  }
  return paramArr;
}

// 插入(insert命名具有局限性, 不能应对多种insert的场景)
const queryAdd = (table, req, res, next) => {
  pool.getConnection((err, connection) => {
    let param = paramList(req)
    connection.query(sql[table].insert, [...param], (err, result) => {
      connection.release()
    })
  })
}

// 根据 id 查询
const queryById = (table, req, res, next) => {
  let param = paramList(req)
  pool.getConnection((err, connection) => {
    connection.query(sql[table].queryById, [...param], (err, result) => {
      if (result) {
        var _result = result;
        result = {
          result: "select",
          data: _result,
        };
      } else {
        result = undefined;
      }
      json(res, result, err);
      connection.release();
    })
  })
}

// 查询全部
const queryAll = (table, req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query(sql[table].queryAll, (err, result) => {
      if (result) {
        var _result = result;
        result = {
          result: "selectall",
          data: _result,
        };
      } else {
        result = undefined;
      }
      json(res, result, err);
      connection.release();
    })
  })
}

module.exports = {
  queryAdd,
  queryById,
  queryAll
}