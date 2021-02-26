# 命令

1. yum install wget     下载
2. wget                 下载   wget + url
3. ll                    显示列表   ls -l 缩写
4. ls                    横着展示  ls -al 看到隐藏文件
5. xz -d                解压
6. tar -xf               解压
7. ln -s ~/目标位置 /usr/bin/指令名  软链接
8. cd                   进入
9. mkdir                创建路径  
10. rmdir               删除一个空文件   rm -rf 删除本文件一切
11. 文件权限
   第一个字符： 路径还是文件 D表示文件 -表示文件
   分三组
   第一组：当前所属用户的权限
   第二组：当前所属组的权限
   第三组: 其他用户的权限
   - - -
   R W X
   4 2 1   mkdir -m 777 所有满权限

   r --  : 只读
   rw-   ： 读写
   rwx   ：读写执行
12. vi                  创建一个文件  hjkl可以移动光标  数字加方向向该方向移动几步  ctrl + d等等 +光标移到空格 大写的DD dd回到第一行 查找
13. tail        显示最后10行  tail -f 实时性  tail -20f
14. cat        展示全部     cat  |grep 'yu' |grep 过滤
15. |grep
16. .sh        加权限可执行
17. chmod       加权限   chmod 777;
18. ip addr  查看ip
19. lscpu   查看cpu
20. df    查看磁盘空间 df -h 磁盘   df -i  索引
21. ps aux   查看系统启动那些服务   ps aux |grep 'node
22. top  机器信息
23. systemctl disable firewalld   关闭防火墙
24. reboot   重启
25. netstat -anp  

**FHS协议 定义每个目录下放的文件都要一致**
## 根目录路径

1. /usr UNIX Software Resource
2. /var
3. /bin  该目录下是可执行的
4. /boot 存放开机所需要的文件
5. /dev   所有的设备以文件存在
6. /etc   配置文件
7. /home   用户目录
8. cd ~    当前用户的根目录
9. /lib    linux 的库
10. /Media  可以删除的设备 U盘
11. /mnt    类似media  
12. /opt    存放第三方软件
13. //sbin  只允许管理员运行，可执行文件
14. /srv     存放用户主动生产的数据
15. /tmp     临时文件
16. /proc     存放再内存
17. /sys      虚拟
18. Lost + found


## 用户组  用户

1. 用户必须至少属于一个用户组
2. useradd  创建一个用户  cat /etc/passwd   useradd -G 用户组名
3. passwd 用户名 设置密码
4. groupadd 创建用户组
5. groupdel  移除
6. userdel
7. grops   查看属于  whoami
8. su 用户名   切换用户
9. exit  退出




