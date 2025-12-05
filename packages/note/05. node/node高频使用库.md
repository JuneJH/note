# Nodejs常见库的使用

[toc]

## mysql
> 官方mysql驱动库
> [npm包库](https://www.npmjs.com/package/mysql)

1.官方示例
```javascript
    const mysql = require('mysql');
    const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db'
    });
    D
    connection.connect();
    
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    });
    
    connection.end();
```

## mysql2

> 前身是MySql-Native
> [npm包库](https://www.npmjs.com/package/mysql2)

1. 官方示例
   
```javascript
    // get the client
    const mysql = require('mysql2');
    
    // create the connection to database
    const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
    });
    
    // simple query
    connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
    );
    
    // with placeholder
    connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45],
    function(err, results) {
        console.log(results);
    }
    );
```

## sequelize

> Sequelize是一个基于promise的Node.js 的ORM
> 目前支持Postgres、Mysql、MariaDB、SQLite、Microsoft、SQL Server
> [npm包库](https://www.npmjs.com/package/sequelize)
> [中文文档](https://github.com/demopark/sequelize-docs-Zh-CN)

1. 连接到数据库

```javascript
    const { Sequelize } = require('sequelize');
    const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
    });

```

## md5

> JavaScript函数，把传入参数使用MD5进行hash加密
> 不可逆

1. 官方示例
   
```javascript
    const md5 = require('md5');
    console.log(md5('message')); //78e731027d8fd50ed642340b7c9a63b3
```



## moment

> 一个前后端通用的时间处理库
> [npm包库](https://www.npmjs.com/package/moment)
> [中文官网](http://momentjs.cn/docs/)

## log4js

> 日志管理
> [npm包库](https://www.npmjs.com/package/log4js)
> [github](https://github.com/stritti/log4js)

1. 使用配置

```javascript
    const log4js = require("log4js");
    const path = require("path");

    log4js.configure({
        //入口
        appenders:{
            sql: {
                type:"file",filename:path.resolve(__dirname,"logs","sql.log"),
                layout:{
                    type:"pattern",
                    pattern:"[%p] %c %m %d{yyyy-MM-dd hh:mm:ss}"
                }
            },
            default:{
                type:"file",filename:path.resolve(__dirname,"logs","default.log"),
            }
        },
        // 类别，与入口相对应
        categories:{
            sql:{
                appenders:["sql"],
                level:"all"
            },
            default:{
                appenders:["default"],
                level:"all"
            }
        }
    })
    //当进程突然终止时，完成写入日志
    process.on("EXIT", function(){
        log4js.shutdown();
    });

    const sql = log4js.getLogger("sql");
    exports.sqlLog = sql;

```

## validate
> 验证一个JavaScript对象的属性
> [npm包库](https://www.npmjs.com/package/validate.js)
> [文档](http://validatejs.org/#examples)

1. 官方示例

```javascript

const validate = require("validate.js");
// 定义一个规则
const constraints = {
  // 对象属性
  creditCardNumber: {
    presence: true,
    format: {
      // 自定义匹配规则
      pattern: /^(34|37|4|5[1-5]).*$/,
      // 自定义提示消息
      message: function(value, attribute, validatorOptions, attributes, globalOptions) {
        return validate.format("^%{num} is not a valid credit card number", {
          num: value
        });
      }
    },
    length: function(value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {is: 15};
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value)) return {is: 16};
      }
      // Unknown card, don't validate length
      return false;
    }
  },
  creditCardZip: function(value, attributes, attributeName, options, constraints) {
    if (!(/^(34|37).*$/).test(attributes.creditCardNumber)) return null;
    return {
      presence: {message: "is required when using AMEX"},
      length: {is: 5}
    };
  }
};

validate({creditCardNumber: "4"}, constraints);
// => {"creditCardNumber": ["Credit card number is the wrong length (should be 16 characters)"]}

validate({creditCardNumber: "9999999999999999"}, constraints);
// => {"creditCardNumber": ["9999999999999999 is not a valid credit card number"]}

validate({creditCardNumber: "4242424242424242"}, constraints);
// => undefined

validate({creditCardNumber: "340000000000000"}, constraints);
// => {"creditCardZip": ["Credit card zip is required when using AMEX"]}
validate.async(stuObj, rule); // 异步调用
```

## cheerio

> 服务器端的jQuery
> 该库实现了核心Jquery的子集，该库从jQuery库中消除了所有Dom不一致和浏览器残骸。
> [npm包库](https://www.npmjs.com/package/cheerio)
> [文档](https://cheerio.js.org/)

1. 官方示例

```javascript
const cheerio = require('cheerio')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')
 
$('h2.title').text('Hello there!')
$('h2').addClass('welcome')
 
$.html()
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>
```

## mock

> 一个前后端通用的生成随机数据，拦截Ajax请求
> [npm包库](https://www.npmjs.com/package/mock)
> [文档](http://mockjs.com/0.1/)

1. 使用示例

```javascript
const Mock = require("mockjs");
const data = Mock.mock({
    "students|500-1000":[{
        'name':"@cname",
        "birthdate":"@date",
        "sex|1-2":true,
        mobile:/1[3-9]{10}/,
        "ClassId|1-16":0
    }]
}).students
const Student = require("../models/Students");
Student.bulkCreate(data).then(data=>{
    console.log("导入数据完成")
})
```