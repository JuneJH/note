# 登录

> 登录应该是大多数系统必备的模块，是服务端和客户端建立信任的基础模块
> 登录操作应该保证用户操作尽量少，同时也能保证服务端不遭受攻击
> 同时可实现跨端登录，并且身份信息不会被篡改、伪造

## 1. 技术选型

> 没有最好的技术方案，只有最适合的方案
> 技术方案不重要，重要的实现思路
### 前端

1. react

### 后端

1. `express`:基于Node快速建站框架
   - `jsonwebtoken`:生成jwt并验证其正确性
   - `md5`:为密码实现加密
   - `validate.js`: 验证数据正确性
2. `sequelize`:操作数据的的ORM框架
   - `mysql2`:`sequelize`框架所依赖的驱动

## 2. 接口定义

### 响应结构

| 响应字段属性 | 字段说明   |
| ------------ | ---------- |
| code         | 响应状态码 |
| msg          | 响应信息   |
| data         | 响应数据   |

### 接口设计

### 1. 注册

1. 注册一个用户
2. URL: /register
3. Method:POST

| 字段属性 | 字段说明 | 是否必传 |
| -------- | -------- | -------- |
| username | 用户名   | 是       |
| password | 用户密码 | 是       |
| mobile   | 手机号码 | 否       |
| email    | 邮箱     | 否       |

4. 错误的响应

```javascript

{
    "code": 400,
    "data": {
        "password": [
            "密码的长度必须在6~16之间",
            "您的密码格式在目前这个危险的世界并不安全"
        ],
        "mobile": [
            "您的移动电话需要11位"
        ],
        "email": [
            "邮箱不是这样子滴"
        ]
    },
    "msg": "参数验证不通过"
}

```

5. 正确的响应

```javascript
{
    "code": 200,
    "data": {
        "id": 7,
        "username": "Joh",
        "mobile": "13753210411",
        "email": "13753210410@17.com",
        "count": 0
    },
    "msg": "注册成功"
}
```

### 2. 登录

1. 登录
2. URL: /login
3. Method:POST

| 字段属性 | 字段说明 | 是否必传 |
| -------- | -------- | -------- |
| username | 用户名   | 是       |
| password | 用户密码 | 是       |

1. 错误的响应

```javascript
{
    "code": 400,
    "data": {},
    "msg": "用户名和密码不匹配"
}

```

5. 正确的响应

```javascript

{
    "code": 200,
    "data": {
        "id": 7,
        "username": "Joh",
        "mobile": "13753210411",
        "email": "13753210410@17.com",
        "count": 0
    },
    "msg": "登录成功"
}
```

### 3. 获取个人信息

1. 登录
2. URL: /whoIam
3. Method:GET
4. 无需参数

4. 错误的响应

```javascript
{
    "code": 403,
    "data": "请重新登录，你的身份已经过期",
    "msg": "身份已过期"
}
```

5. 正确的响应

```javascript

{
    "code": 200,
    "data": {
        "username": "Joh",
        "mobile": "13753210411",
        "email": "13753210410@17.com",
        "count": 1
    },
    "msg": "获取成功"
}
```

### 4. 修改

1. 修改用户信息
2. URL: /update
3. Method:PATCH
4. 修改个人信息后需要重新保存jwt

| 字段属性 | 字段说明 | 是否必传 |
| -------- | -------- | -------- |
| username | 用户名   | 否       |
| password | 用户密码 | fou       |
| mobile   | 手机号码 | 否       |
| email    | 邮箱     | 否       |

4. 错误的响应

```javascript

{
    "code": 400,
    "data": {
        "username": [
            "june jh12333111已存在,请选择专属您的用户名"
        ]
    },
    "msg": "参数验证不通过"
}
```

5. 正确的响应

```javascript
{
    "code": 200,
    "data": {
        "id": 7,
        "username": "JuneJH12333",
        "mobile": "13110283131",
        "email": "13753210410@17.com",
        "count": 1
    },
    "msg": "修改成功"
}
```
### 5. 上传头像

1. 上传头像
2. URL: /uploadHeaderImg
3. Method:POST
4. 修改个人信息后需要重新保存jwt

| 字段属性 | 字段说明 | 是否必传 |
| -------- | -------- | -------- |
| headerImg | 头像数据   | 是       |


1. 错误的响应

```javascript

{
    "code": 400,
    "data": "File too large",
    "msg": "服务端已收到你的请求，但是你的参数不符合我们得要求"
}
```

5. 正确的响应

```javascript
{
    "code": 200,
    "data": "成功修改头像",
    "msg": "修改成功"
}
```
## 3. 后端实现

### 1. 连接数据库

1. 使用`sequelize`连接数据库 [文档](https://sequelize.org/master/)

```javascript
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("database","username","password",{
    host:"12.1.1.12",
    dialect:"mysql",
    logging:(msg)=>{
        // 写入日志
    }
})

module.exports = sequelize;

```

2. 对应数据库实体

```javascript

const sequelize = require("./db");  // 连接数据所导出的orm接口
const {DataTypes} = require("sequelize");// 设置数据类型

const Admin = sequelize.define("Admin", {
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    mobile:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    count:{
        type:DataTypes.INTEGER,
    },
    headerImg:{
        type:DataTypes.STRING,
    }
},{
    paranoid:true,
})

// 同步至数据库具体的表
sequelize.sync({alter:true}).then(()=>{
    console.log("同步完成")
})

module.exports = Admin;

```

3. 构建服务层
> 服务连接了业务与数据库，需要在这里做好对数据库的操作，以及做好一道防护墙(数据合法性，规范)
> 可以再这里实现对数据的验证、检查是否合法
> > 利用`validate.js`辅助进行验证
> > 自定义检查规则
> >``` javascript
> >  validate.validators.isExistUserName = async (value)=>{
> >     if(!value)return ;
> >     const result =  await getAdminByUsername(value);
> >     if(result){
> >         return "^%{value}已存在,请选择专属您的用户名"
> >     };
> > }
> >```
> 也可以再这里对密码进行加密
> >``` obj.password = md5(obj.password);```
> > 直接利用`md5`对密码进行加密


4. 接口整合
> 是时候实现需求了
> 权限验证
> > 用户登录成功后，需要为其颁发`jwt`。**颁发时需要注意`CSRF`攻击**
> > 此处利用的是`jsonwebtoken` [文档](https://github.com/auth0/node-jsonwebtoken#readme)
> > > ```javascript
> > >exports.publish = function (maxAge,user){
> > >    const token = jwt.sign(user,secrete,{
> > >        expiresIn:maxAge
> > >    })
> > >    return token;
> > >}
> > >```
> > 用户再登录后获得一个令牌，之后的请求需要携带服务端进行身份验证
> > 验证方案
> > >```javascript
> > >exports.verify = function (token){
> > >    try{
> > >        const result = jwt.verify(token,secrete);
> > >        return  result;
> > >    }catch (err){
> > >        return  null;
> > >    }
> > >}
> > > ```
> > 每次调用接口都需要对其进行检查身份，看是否拥有访问权限
> 上传头像
> > 此处利用`multer`来处理数据获取，文件保存
> > [了解更多]()

## 总结

> 仅仅是一个思路







