# 2. JSX

1. 由Facebook起草的JS扩展语法，现处于草案阶段需要babel

### 1. JSX是什么

1. 是```React.createElement```的语法糖，该函数最终生成一个JS对象-React元素
   
2. 一个JSX表达式必须有一个根节点，如果父级为空可写为```<></>```它是```React.Fragment```的语法糖
3. JSX元素遵循(XML规范)
   
4. 使用JSX必须在导入React前提下

### 2. 使用JSX

1. 使用```{}```中填写JS表达式
2. 使用小驼峰命名属性，其中样式类由于是Javascript的关键字由```className```替代
3. ```null\undefined\false```不会输出任何内容，可用与判断是否显示一个元素，否定条件下将其赋值为null
4. 普通对象无法通过```{}```进行显示，react对象除外，基本数据类型组成的数组会自动展开显示
5. 防止注入攻击，在插入HTML片段时，需要配置```dangerouslySetInnerHTML```
6. 一个JSX产生的对象是不可变的，只读
