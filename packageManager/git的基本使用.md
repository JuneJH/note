# git 的基本使用

> 版本管理
>
> 工作区 => 缓存区 => 仓库区 => 远程仓库
>
> 仓库区 => 工作区

## 1. 初始化仓库

```shell
git init
```

## 2. 加入追踪

```shell
git add . [文件名]
```

## 3. 提交

```shell
git commit -am ""
```

## 4. 从缓存区恢复

```shell
git checkout xxx
```

## 5. 保存临时工作Stash

```shell
git stash
git stash pop
```

## 6. 回到上次提交

```shell
git restore .
```

