# Auth 2.0


## 1 Bearer token

1. `Authorization: Bearer <token>`



## 2 HttpBasicAuth

1. basic Auth 会用 base64 对用户名和密码加密



## 无感知登录

1. `access_token 和 refresh_token` 双令牌保证无感知登录
2. 二次重发机制实现
3. 客户端保存 `access_token 和 refresh_token`，以便下一次访问能继续


第一次用账号密码登录服务器会返回两个 token :
	- access_token
	- refresh_token，时效长短不一样。
	- 短的access_token 时效过了之后，发送时效长的 refresh_token 重新获取一个短时效token，
	- 如果都过期，就需要重新登录了。

	- refresh_token 就是用来刷新access_token
	- 活跃用户的 access_token 过期了，用refresh_token 获取 新的access_token
	- access_token 实效7天，那么 refresh_token 实效可以给15天,也可以给30天


### access-token

用户访问操作数据能够执行肯定是在access_token有效期内



### refresh_token

1. 时间设置：`2 * access_token`

每次 刷新 access_token 时判断 refresh_token 是否快过期
[ refresh_token 剩余有效时间 <= 2*access_token实效]，如果是，那就连refresh_token 也刷新。
如果希望降低 刷新refresh_token 频率，可以将 refresh_token 实效提高



双令牌
	权限令牌 access token 2小时，每次签发 权限令牌，再重新刷新 refreshtoken 一个月
		jwt 验证用户身份
	刷新令牌 refresh token 1一个月
		避免让用户重新输入用户名和密码
		如果 access token 过期了，
		需要用 refresh token 重新获取一个 access token

		超过一个月没有访问网站，重新输入密码登录
		判断 refresh token合法，发布一个 access token，refresh token自身再刷新一次


base64加密
npm i js-base64

