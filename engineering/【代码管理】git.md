# git 的基本使用

> 版本控制管理
>
> 工作区 => 缓存区 => 仓库区 => 远程仓库

## 1. 基础命令

##### 0. 配置

```shell
git config user.name "xxx"; # 设置用户名
git config --global user.name "xxx"; # 全局设置
git config --list; # 获取全部配置
git config user.name; # 获取单个属性
git remote show orgin # 查看远程仓库
```

 ##### 1. 初始化仓库

```shell
git init   # 初始化仓库
```

##### 2. 加入追踪

```shell
git add . [文件名]  # 提交至缓存区
```

##### 3. 提交

```shell
git commit -am "" # 提交
git commit --amend -m ## 修复上次提交
```

##### 4. 从缓存区恢复

```shell
git checkout xxx
```

##### 5. 保存临时工作Stash

```shell
git stash
git stash pop
```

##### 6. 撤回

```shell
git reset HEAD 文件名 # 从暂存区撤销该文件
git reset --hard [版本号]｜[head]|[HEAD^]|[HEAD^^]|[HEAD~3]	# 回退版本
```

##### 7. 分支

```shell
git branch # 查看分支
git checkout -b 新分支	# 切换分支，如果不存在创建
git branch -d 分支名称	# 如果该分支还没有合并，则不允许删除
git branch -D 分支名称	# 强制删除
```

##### 8. 合并分支

```shell
git merge 分支名称
```

##### 9. 清洗分支历史合并

```shell
git merge --squash 分支名称
```

##### 10. 查看提交日志

```shell
git log	# 查看日志
git log --oneline # 省略部分信息
```

##### 11. 删除

```shell
git rm xxx # 从仓库和工作区中删除该文件
git rm --cached  xxx #只删除仓库区中的文件
# 以上操作需要提交后生效
```

##### 12.比较

```shell
git diff 文件 # 比较工作区和暂存区
```

##### 13.合并记录

```shell
git rebase -i HEAD~1	# 向前合并提交记录
```

##### 14. 标签

```shell
git tag -a v1.1.1 HEAD/提交ID 	# 新建一个标签
git tag		#查看标签
```

##### 15. 提交

```shell
git push origin [本地分支名称]:[远程分支名称] # 提交到远程分支
git push origin --delete [远程分支名称] # 删除远程分支
git branch --set-upstream-to=origin/[远程分支名称] # 设置默认提交分支
```

##### 16.拉取

```shell
git pull orgin [远程分支名称]:[本地分支名称]
```

## 2. git 生命周期

1. untracked
2. unmodified
3. modified
4. staged

## 3. git flow 工作流



## 4. PR



## 5. foke

