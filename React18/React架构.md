# React 架构

> React 15之前架构为Stack架构，之后使用`Fiber`架构重构了Stack架构，使其具备能够实现事件切片



## 1. Stack架构

1. 执行大量计算或者设备本身性能不足的时候，页面回出现掉帧**CPU瓶颈**
2. 进行I/O的时候，等待过程中无法快速响应**I/O瓶颈**
3. 