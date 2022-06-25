# restful api 规范



:key: [官网](https://restfulapi.cn/) 的原话解释

- REST 是 Representational State Transfer的缩写，如果一个架构符合REST原则，就称它为RESTful架构

- RESTful 架构可以充分的利用 HTTP 协议的各种功能，是 HTTP 协议的最佳实践

- RESTful API 是一种软件架构风格、设计风格，可以让软件更加清晰，更简洁，更有层次，可维护性更好



## API 请求设计

![image-20220625150330975](E:\杂七杂八的东西\typeorm 图片存储区\image-20220625150330975.png)



一般一个请求 = 动词 + 宾语

- 动词使用五种 HTTP 方法，对应 CRUD 方法(但通常来说其实 Get / Post/ Put / Delete 这四种语义就可以满足实际的使用需求了， Patch 和 Put 只是对资源更新的方式语义上不一致)
- 宾语 URL ：应全部使用名词复数，如果存在一些类似 search 等不可衡量的名词的话可以有例外情况
- 过滤信息：如果记录数量很多，API 应该提供参数过滤返回结果。?limit=10 指定返回记录的数量，?offset=10 指定返回记录的开始记录。



## API 响应设计



:key: 状态码的设置主要是针对客户端的每一次请求，服务器都必须给出回应，回应包括 HTTP 状态码和数据两部分。Rest 规范主要就是根据不同的场景返回不同的状态码给客户端方便客户端问题的 debug。



- 1xx 相关信息
- 2xx 操作成功
- 3xx 重定向
- 4xx 客户端错误
- 5xx 服务器错误



## 服务器回应数据



- 服务器需约定统一的数据返回格式
- 服务器不应返回纯文本
- 如果状态码是 4xx，应向用户返回出错信息，返回的信息中将 error 作为键名 { error: "Invalid API key" }
- 请求需要验证身份凭证(JSON Web Token)