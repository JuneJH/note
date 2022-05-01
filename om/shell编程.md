# Shell编程

> `sh` `csh` `ksh` `tcsh` `bash`

## 1. 一个简单的shell

```shell
#! /bin/bash
ls
```

## 2. 使用变量

#### 1. 变量置换

> `$()`和反引号可以置换,即内部变量会读取
>
> `$(())`可执行运算符

1. 基本使用

```shell
params=123
echo ${params:-缺省默认值} # 缺省默认值
echo ${params:=默认值}
echo ${params:?错误信息}
echo ${params:+有值置换}
```

#### 2. 位置变量

1. 通过`$1`获取参数,
1. 通过`$# $? $*`获取参数
1. 通过`read`读取输入

#### 3. 数组

```shell
array=(1,2,3,4,5)
```

#### 4. 定义函数

```shell
myfunction(){
	echo “This is my first shell function”
}
# 取消函数
unset myfunction
```

1. 使用流程控制

```shell
if list1
then
list2
elif list3
then
list4
else
list5
fi
```

## 3. 使用参数

