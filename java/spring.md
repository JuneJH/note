# Spring

> IOC Inverse of control 对象创建权利由spring框架控制
>
> DI Dependency Injection 依赖注入
>
> AOP Aspect Oriented Programming 面向切面编程

## 1. IOC 控制反转

1. XML 使用方式:配置bean标签
   - id: 对象在容器中唯一标识
   - class 指定类的全限定名，默认调用无参构造函数获取对象
   - init-method: 指定类创建是初始方法
   - destroy-method： 类销毁方法
   - scope：`singleton` 单例 `prototype` 多例 request session global session 

```xml
<bean id="hello" class="com.june.learn.Hello">
  <property name="name" value="spring-ioc"/>
</bean>
```

## 2. DI 依赖注入

> 依赖指的Bean实例中的属性(基本类型，POJO类型，集合数组类型)

1.  构造函数注入

   ```xml
   <bean id="ConstructorArg" class="com.june.learn.ConstructorArg">
     <constructor-arg name="age" value="18"></constructor-arg>
     <constructor-arg name="name" value="June"></constructor-arg>
   </bean>
   ```

2. Set方法注入

## 3. 自动装配

## 4. 注解开发

## 5. JavaConfig

## 6. AOP

### 1. 代理模式



