# Redis数据库

> NoSQL 非关系型的数据库(关系型数据库：数据结构是一种有行有列的数据库)
>
> NoSQL 数据库可以解决高并发，高可用，高可扩展，大数据存储
>
> NoSQL 与关系型数据库相辅相成，并非替代品

### 1. 类型

1. 健值存储数据库(key-value): Redis、Voldmort
2. 列存储数据库：HBase、Rjak
3. 文档型数据库: MongoDB、CouchDB

### 2. 数据类型

1. string
2. hash
3. list
4. set
5. zset

### 3. 常用命令

1. 获取所有key

   ```shell
   keys pattern
   ```

2. 删除

   ```shell
   del key
   ```

3. 判断是否存在

   ```shell
   exists key
   ```

4. 设置过期时间

   ```shell
   expire key seconds
   TTL key # 查剩余时间
   PERSIST key # 永久存在
   pexpire key milliseconds # 设置毫秒
   ```

5. 重命名

   ```shell
   rename oldkey newkey
   ```

### 4. 发布订阅模式

1. 订阅消息

   ```shell
   subscribe key
   ```

2. 发布消息

   ```shell
   publish kkb "xxx"
   ```



### 5. 事务

1. 通过MULTI（开启事务队列）、EXEC（执行事务）、DISCARD(清楚事务队列)、WATCH(乐观锁)、UNWATCH(取消)命令实现

###  应用场景

1. 内存数据库
2. 缓存服务器
3. 解决分布式集群架构中session分离问题(session共享)
4. 任务队列
5. 分布式锁
6. 发布订阅
7. 应用排行榜
8. 网站访问统计
9. 数据过期处理