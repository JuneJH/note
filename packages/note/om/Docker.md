# Docker 使用



> Build,Ship and Run Any APP，Anywhere

##  基本命令

1. 安装

   ```shell
   yum install docker
   ```

2. 查看已有镜像

   ```shell
   docker images
   ```

3. 拉去镜像

   ```shell
   docker pull mongo
   ```

4. 运行镜像

   ```shell
   docker run 
   ```

5. 交互运行镜像

   ```shell
   docker run -i -t --name 容器名称 repository:tag /bin/bash # 直接进入容器虚拟机中,且实用exit退出后该容器也会关闭
   ```

6. 后台运行镜像

   ```shell
   docker run -di --name 容器名称 repository:tag
   ```

7. 进入容器虚拟机中

   ```shell
   docker exec -it 容器名称或者容器 ID /bin/bash # 退出不会影响容器运行
   docker attach -it 容器名称或者容器 ID /bin/bash # 使用 exit 退出容器，则容器停止。
   ```

8. 启动容器

   ```shell
   docker start
   ```

9. 查看容器

   ```shell
   docker ps # 查看运行中的容器
   docker ps -a # 查看所有容器
   docker ps -l # 查看最近运行容器
   ```

10. 复制

    ```shell
    docker cp 源文件 目标文件 # 宿主直接写地址，容器加上 容器：地址
    ```

10. 查看日志

    ```shell
    docker logs [容器id]
    ```

10. 停止运行

    ```shell
    docker kill CONTAINERID
    ```





## 常见使用

### 1. 部署一个mysql

1. 拉去mysql镜像

   ```shell
   docker pull mysql:5.7.8
   ```

2. 创建镜像并运行

   ```shell
   docker run \
   --name mysql5.7 \
   -p 3306:3306 \
   -e MYSQL_ROOT_PASSWORD=root \
   -d \
   -v /usr/local/docker_data/mysql/data:/var/lib/mysql \
   -v /usr/local/docker_data/mysql/conf:/etc/mysql/ \
   -v /usr/local/docker_data/mysql/logs:/var/log/mysql \
   mysql:5.7
   ```

3. 数据库连接失败原因1

   ```shell
   mysql -uroot # 登录mysql
   show databases；
   use mysql;
   select user,host from user;
   pdate user set host = ‘%’ where user=‘root’;
   flush privileges;
   ALTER USER 'root'@'%' IDENTIFIED BY '123456';# 修改密码
   ```

   

## 为什么

## 如何使用











## docker-compose

