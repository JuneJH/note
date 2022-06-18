

# 正则表达式

> 正则表达式用于校验格式,拆分和替换,查找

### 1. 表示 字符集

- [abc]=>表示`abc`三个字符中的一个
- [^abc]=>表示不是`abc`三个字符中的 
- `/d` === [0-9]
- `/w`===[0-9A-Za-z]



### 2. 表示 出现次数

- ?  出现0-1次
- `*` 出现0-n次
- `+` 出现1-n次
- `{n}` 指定出现n次
- `{n,}` 至少n次包含n次以上
- `{n,m}` 出现次数在[n-m]的区间内 

### 3. Java中查找

1. 利用`Pattern`创建正则规则
2. 利用`Matcher`对象进行匹配

```java
Pattern pattern = Pattern.compile("[gp][eo][ts][t]?");

String methods = "getsdlfjpostsklfj;lgetasdfjl;postsdl;kfjl;get";

Matcher matcher = pattern.matcher(methods);

while (matcher.find()){
  System.out.println(matcher.group());
}
```



