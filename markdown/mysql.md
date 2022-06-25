# mysql

[npm 官网](https://www.npmjs.com/package/mysql#pool-events)



```js
/* 全局数据库连接配置 */
const connection = mysql.createConnection({
  host: sqlConfig.host,
  user: sqlConfig.user,
  password: sqlConfig.password,
  database: sqlConfig.database
})

connection.connect()
connection.on('error', (error) => console.log(error))
connection.on('once', () => console.log('Connect to the database'))
```



:question: 顺带插入一个 [module.exports & exports](https://zhuanlan.zhihu.com/p/87729137) 的一些理解



也就是说我们在下载了这个包以后可以进行 mysql 的链接，CRUD 等操作。[CSDN 博客](https://blog.csdn.net/qq_42866164/article/details/106048663) 这篇博客提供了我认为非常不错的封装思路，其中摈弃了原来 mysql 在程序运行的时候持续连接，而且有添加防止 SQL 注入的操作，整体下来思路还是非常清晰的。



:key: 我比较好奇的是数据库连接池这个概念，运作机制到底是什么呢？相比于传统的有啥优势呢？数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个。



正常执行一个 SQL 语句经历的过程：

![img](E:\杂七杂八的东西\typeorm 图片存储区\2018092721591380.png)

也就是说如果执行多个 SQL 语句的话其实是非常损耗资源的。分析下优缺点：优点在于实现简单，但是缺点在于网络IO 较多，数据库的负载高等等。



![img](https://img-blog.csdn.net/20180927215937655)

第一次访问的时候，需要建立连接。 但是之后的访问，均会复用之前创建的连接，直接执行SQL语句。其实第一次的操作就是传统的连接方式。





## sql 操作封装

```js
/**
 * @description 新增一条数据
 * @param  {str} table 数据库表的名称
 * @param  {obj} req 插入的数据
 * @param  {obj} res 接口函数中的res对象
 * @param  {obj} next 接口函数中的next对象
 */
let dbAdd = (table, req, res, next) => {
  pool.getConnection((err, connection) => {
    let paramValue = paramList(req);
    connection.query(sql[table].insert, [...paramValue], (err, result) => {
      if (result) {
        result = "add";
      }
      // 以json形式，把操作结果返回给前台页面
      json(res, result, err);
      // 释放连接
      connection.release();
    });
  });
};

/**
 *@description 删除一条数据
  @param 同abAdd
 */
let dbDelete = (table, req, res, next) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    connection.query(sql[table].delete, [...paramValue], (err, result) => {
      if (result.affectedRows > 0) {
        result = "delete";
      } else {
        result = undefined;
      }
      json(res, result, err);
      connection.release();
    });
  });
};

/**
 *@description 修改一条数据
  @param 同abAdd
 */
let dbUpdate = (table, req, res, next) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    connection.query(sql[table].update, [...paramValue], (err, result) => {
      console.log(result)
      if (result.affectedRows > 0) {
        result = "update";
      } else {
        result = undefined;
      }
      json(res, result, err);
      connection.release();
    });
  });
};

/**
 *@description 查找一条数据
  @param 同abAdd
 */
let dbQueryById = (table, req, res, next) => {
  let paramValue = paramList(req);
  pool.getConnection((err, connection) => {
    connection.query(sql[table].queryById, [...paramValue], (err, result) => {
      if (result != "") {
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
    });
  });
};

/**
 *@description 查找全部数据
  @param 同abAdd
 */
let dbQueryAll = (table, req, res, next) => {
  pool.getConnection((err, connection) => {
    connection.query(sql[table].queryAll, (err, result) => {
      if (result != "") {
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
    });
  });
};

/**
 * @description 遍历数据的值
 * @param {obj} obj 包含参数的对象
 * */
let paramList = (obj) => {
  let paramArr = [];
  for (let key in obj) {
    if (obj[key]) {
      paramArr.push(obj[key]);
    }
  }
  return paramArr;
};

module.exports = {
  dbAdd,
  dbDelete,
  dbUpdate,
  dbQueryById,
  dbQueryAll,
};


```

:key: 需要注意的一些问题

1. paramList 返回的是一个数组。数组其实是为了替换 SQL 中的 ?，数组中的元素按顺序进行替换这样可以有效完成对 SQL 注入的预防。
2. 封装 CRUD 函数需要传递四个参数
   1. table - 需要操作的表
   2. req - 请求传递的参数
   3. res - 返回对象
   4. next - 我认为应该是中间件什么的
3. sql[table].... 其实是我们在写 SQL 的时候其实是针对某个表写的，里面有针对....的查询，那么这里其实也就是一个对对象属性访问的过程从而调用不同的 SQL 语句。