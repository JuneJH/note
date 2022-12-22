# pm2

> Node服务部署利器



## 1. 常用命令

1. 启动

   ```shell
   pm2 start [id] [src]
   pm2 start src/index.js --name=webhook
   ```

2. 停止

   ```shell
   pm2 stop [id]
   ```

3. 查看列表

   ```shell
   pm2 list
   ```

4. 查看日志

   ```shell
   pm2 log
   ```





## 2. 日常踩坑

