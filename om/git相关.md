# Git相关



## 1. 安装

1. yum安装

   ```shell
   yum -y install git 
   ```

2. 设置用户信息

   ```shell
   git config --global user.name JuneJH
   git config --global user.email 153XXX7388@163.com
   ```

3. 生成密钥

   ```shell
   ssh-keygen -t rsa -C "JuneJH" # 生成成功后在.ssh下找到配置github的ssh key中	
   ```

4. 测试是否成功

   ```shell
   ssh -T git@github.com # Hi JuneJH! You've successfully authenticated, but GitHub does not provide shell access.
   ```

   



## 2. 使用

1. 初始化

2. 克隆

3. 推送

4. 拉取

5. 提交

6. 保存缓存

   ```shell
   git stash save
   git stash pop
   ```

   





## 3. 场景

### 1. 迁移仓库