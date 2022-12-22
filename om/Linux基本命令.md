# Linux 基本操作命令

> https://greasyfork.org/zh-CNhttps://greasyfork.org/zh-CN

## 基本目录意义

> **FHS协议 定义每个目录下放的文件都要一致**

## 根目录路径 

| 目录名称     | 意义                         | 备注                   |
| ------------ | ---------------------------- | ---------------------- |
| /usr         | UNIX Software Resource       | UNIX Software Resource |
| /var         |                              |                        |
| /bin         | 该目录下是可执行的           |                        |
| /boot        | 存放开机所需要的文件         |                        |
| /dev         | 所有的设备以文件存在         |                        |
| /etc         | 配置文件                     |                        |
| /home        | 用户目录                     |                        |
| cd ~         | 当前用户的根目录             |                        |
| /lib         | linux 的库                   |                        |
| /Media       | 可以删除的设备 U盘           |                        |
| /mnt         | 类似media                    |                        |
| /opt         | 存放第三方软件               |                        |
| /sbin        | 只允许管理员运行，可执行文件 |                        |
| /srv         | 存放用户主动生产的数据       |                        |
| /tmp         | 临时文件                     |                        |
| /proc        | 存放再内存                   |                        |
| /sys         | 虚拟                         |                        |
| Lost + found |                              |                        |



## 1. 基础操作

| 命令                                     | 作用                                    | 备注 |
| ---------------------------------------- | --------------------------------------- | ---- |
| ll                                       | 显示列表   ls -l 缩写                   |      |
| ls                                       | 横着展示  ls -al 看到隐藏文件           |      |
| xz -d                                    | 解压                                    |      |
| tar -xf                                  | 解压                                    |      |
| ln -s ~/目标位置 /usr/bin/指令名  软链接 | 软接链 绝对路径                         |      |
| cd                                       | 进入                                    |      |
| mkdir                                    | 创建路径                                |      |
| rmdir                                    | 删除一个空文件   rm -rf 删除本文件一切  |      |
| cat                                      | 输出文件                                |      |
| echo                                     |                                         |      |
| vi                                       | 创建一个文件  hjkl可以移动光标 等       |      |
| tail                                     | 显示最后10行  tail -f 实时性  tail -20f |      |
| grep                                     |                                         |      |
| sh                                       | 执行文件                                |      |
| cp -r /dir/* /dir0                       | 复制dir目录下所有的文件到dir0下         |      |

## 2. 权限修改

1. 文件权限

   - 第一个字符： 路径还是文件 `d`表示文件夹 `-`表示文件
       分三组: 读写可执行
       第一组：当前所属用户的权限
       第二组：当前所属组的权限
       第三组: 其他用户的权限

2.    R W X
      4 2 1   mkdir -m 777 所有满权限

      r --  : 只读
      rw-   ： 读写
      rwx   ：读写执行

| 命令  | 作用         | 备注 |
| ----- | ------------ | ---- |
| chmod | 修改文件权限 |      |
|       |              |      |

## 3. 包管理

1. rpm
2. yum

| 命令  | 作用 | 备注 |
| ----- | ---- | ---- |
| yum   |      |      |
| weget |      |      |

## 4. 硬件相关



| 命令                        | 作用                                         | 备注 |
| --------------------------- | -------------------------------------------- | ---- |
| ip addr                     | 查看ip                                       |      |
| lscpu                       | 查看cpu                                      |      |
| df                          | 查看磁盘空间 df -h 磁盘   df -i  索引        |      |
| ps aux                      | 查看系统启动那些服务  ` ps aux |grep 'node'` |      |
| top                         | 机器信息                                     |      |
| systemctl disable firewalld | 关闭防火墙                                   |      |
| reboot                      | 重启                                         |      |
| netstat -anp                |                                              |      |



## 5. 用户相关

> 用户必须至少属于一个用户组

| 命令          | 作用                                                  | 备注 |
| ------------- | ----------------------------------------------------- | ---- |
| useradd       | 创建一个用户 ` cat /etc/passwd   useradd -G `用户组名 |      |
| passwd 用户名 | 设置密码                                              |      |
| groupadd      | 创建用户组                                            |      |
| groupdel      | 移除                                                  |      |
| userdel       |                                                       |      |
| grops         | 查看属于  whoami                                      |      |
| su 用户名     | 切换用户                                              |      |
| exit          | 退出                                                  |      |

## 6. 三剑客

- grep
- sed
- awk

## 7. 文件操作

1. Mac 上传文件只服务器

   ```shell
   scp -r blog_project root@ip:/root/data/app/blog
   ```

   

## 实操

1. 解压 tar

2. 下载 wget

3. yum

4. 查看端口

   ```shell
   lsof -i tcp:【端口】
   netstat -ntlp # 查看所有端口
   
   ```

   
