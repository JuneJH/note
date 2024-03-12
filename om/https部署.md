# 通过Nginx反向代理实现

> 通过 [Let's Encrypt](https://letsencrypt.org/) 获取免费的证书

## 获取证书方案

1. **安装 Certbot**：

   ```shell
   # 首先安装 Certbot 工具使用以下命令来在 Ubuntu 上安装 Certbot
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. **获取证书**：

   ```shell
   sudo certbot --nginx -d your_domain.com
   ```

3. **配置自动更新**：

   ```shell
   sudo crontab -e
   ```

4. 添加配置

   ```shell
   0 0 1 * * certbot renew # 在打开的编辑器中添加以下行，以每月自动更新证书
   ```

5. 添加配置

   ```shell
   server {
       listen 80;
       server_name your_domain.com;
       return 301 https://$host$request_uri;
   }
   
   server {
       listen 443 ssl;
       server_name your_domain.com;
   
       ssl_certificate /path/to/your/certificate.crt;	# 在获取证书时需要注意日志，确定存放路径
       ssl_certificate_key /path/to/your/private.key;
   
       location / {
           proxy_pass http://localhost:3000; # 假设你的 NestJS 应用程序在 localhost:3000 上运行
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. 重启Nginx

## 2. 使用PM2部署Nest服务

1. 安装pm2

   ```shell
   npm i -g pm2
   ```

2. 启动应用程序

   ```shell
   pm2 start xxx.js
   ```

3. 设置开机启动

   ```shell
   pm2 startup # 这将为你生成一个启动脚本，并指导你如何将其添加到系统启动中。
   ```

   