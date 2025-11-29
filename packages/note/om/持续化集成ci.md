# 持续化集成

> 利用github的webhooks
>
> 当向github或者gitlab提交时webhook会向设置好的服务端发送一条post请求

## 1. webhooks

> 监听仓库一系列动作并向指定的服务器发送一条携带该次动作的信息的post请求

1. 在github/gitlab中设置webhook
   - Payload URL：指定的服务器api
   - Content type：content-type
   - Secret：秘密token,会携带在请求头中用于验证权限
2. node起服务
   - 监听设置payload url的路由
   - 对其进行鉴权和锁,避免多次部署
   - 通过child-process执行脚本
