import service from './index.js';
import { HOST,HOSTSSO } from '../../utils/config.js';

/*****  公共接口 ********* */
export const codeLogin = service.getGetRequest(HOST + '/user/we-chat-users/', {}, {addUrl:'{code}/profile'}); // 通过code检查绑定
export const decrypt = service.getPostRequest(HOST + '/user/we-chat-users/decrypt', {}, { baseData: false,contentType:'application/json'}); //手机号解密
export const sendsmg = service.getPostRequest(HOST + '/user/short-messages/captcha', {}, { baseData: false,contentType:'application/json'}); // 发送短信接口
export const login = service.getPostRequest(HOSTSSO + '/auth/realms/loyalty/protocol/openid-connect/token', {}, { baseData: false,contentType:'application/x-www-form-urlencoded'}); // token接口
/*****  账户接口 ********* */
export const accountCard = service.getGetRequest(HOST + '/user/cards', {}, { baseData: false,contentType:'application/json'}); // 获取用户卡列表--new
export const userCardtype = service.getGetRequest(HOST + '/user/card-types', {}, { baseData: false,contentType:'application/json'}); // 积分卡类型列表--new
export const cadssecretsPut = service.getPutRequest(HOST + '/user/card-secrets/', {},  {baseData: false,contentType:'application/json'}); //卡密充值--new
export const pointorderstransfer = service.getPostRequest(HOST + '/user/point-orders/transfer', {}, {baseData: false,contentType:'application/json'}); // 检查转增卡信息有效性&&转增积分-------news
export const userMsg = service.getGetRequest(HOST + '/user/users/0', {}, {}); // 根据用户ID获取用户信息
export const userPrivilege = service.getGetRequest(HOST + '/user/users/', {}, {}); // 根据用户ID获取用户权限
export const commonCaptcha = service.getPostRequest(HOST + '/user/short-messages/captcha', {},  { baseData: false,contentType:'application/json'}); //短信公共接口--new
export const cadsBind = service.getPostRequest(HOST + '/user/cards', {},  { baseData: false,contentType:'application/json'}); //添加&&绑定卡接口--news
export const deleteCads = service.getDleteRequest(HOST + '/user/cards/', {},  { baseData: false,contentType:'application/json'}); //删除卡--news
export const accOrderList = service.getGetRequest(HOST + '/user/point-orders', {}, {baseData: false,contentType:'application/json'}); // 查询交易记录--new
/*****  直充接口 ********* */
export const mobileRecharge = service.getGetRequest(HOST + '/user/virtual-products', {}, {}); // 充值金额列表
export const virtualordersPost = service.getPostRequest(HOST + '/user/orders', {},  { baseData: false,contentType:'application/json'}); //下单-----news
export const tradeNocaptcha = service.getGetRequest(HOST + '/user/pay/points/', {}, {addUrl:'{tradeNo}/captcha'}); // 积分消费验证码
/*****  消费接口 ********* */
export const pay = service.getPostRequest(HOST + '/user/pay', {},  { baseData: false,contentType:'application/json'}); //纯现金消费
export const payPoint = service.getPostRequest(HOST + '/user/pay/point', {},  { baseData: false,contentType:'application/json'}); //纯积分消费
export const payHybrid = service.getPostRequest(HOST + '/user/pay/hybrid', {},  { baseData: false,contentType:'application/json'}); //现金积分不可调消费
export const payDynamic = service.getPostRequest(HOST + '/user/pay/dynamic', {},  { baseData: false,contentType:'application/json'}); //积分限额范围内，用户可自行调整积分抵扣额度
/*****  订单接口 ********* */
export const storeOrderList = service.getGetRequest(HOST + '/user/orders', {}, {baseData: false,contentType:'application/json'}); // 商品列表
export const storeOrderDetail = service.getGetRequest(HOST + '/user/orders/', {}, {baseData: false,contentType:'application/json'}); // 商品列表
export const deleteOrders = service.getDleteRequest(HOST + '/user/orders/', {},  { baseData: false,contentType:'application/json'}); //删除订单
export const cancelOrders = service.getPutRequest(HOST + '/user/orders/', {},  { baseData: false,contentType:'application/json'}); //取消订单
/*****  权限 ********* */
export const cmbcPrivileges = service.getPostRequest(HOST + '/user/privileges/cmbcecard', {},  { baseData: false,contentType:'multipart/form-data'}); //批量激活民生二类电子卡开卡功能
/*****  首页推荐接口 ********* */
export const indexproductsList = service.getGetRequest(HOST + '/user/product-details', {}, {baseData: false,contentType:'application/json'}); // 订单列表
/*****  cmbc接口 ********* */
export const cmbcAccounts = service.getPostRequest(HOST + '/cmbc/accounts', {},  { baseData: false,contentType:'multipart/form-data'}); //开户申请
export const cmbcMessage = service.getPostRequest(HOST + '/cmbc/short-message-codes', {},  { baseData: false,contentType:'multipart/form-data'}); //获取短信验证码
export const cmbcputAcc = service.getPutRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'multipart/form-data'}); //开户确认
export const cmbcputchangeAccM = service.getPutRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'multipart/form-data'}); //修改绑定手机号
export const cmbcapplychangeAccMasterCard = service.getPutRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'multipart/form-data'}); //变更绑卡申请
export const cmbcputchangeAccMasterCard = service.getPutRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'multipart/form-data'}); //变更绑卡
export const cmbcputchangePassword = service.getPutRequest(HOST + '/cmbc/passwords/', {},  { baseData: false,contentType:'multipart/form-data'}); //修改交易密码
export const cmbcgetapplyresetApprovals = service.getGetRequest(HOST + '/cmbc/approvals/', {},  { baseData: false,contentType:'multipart/form-data'}); //账户余额
export const cmbcputapplyresetPassword = service.getPutRequest(HOST + '/cmbc/passwords/', {},  { baseData: false,contentType:'multipart/form-data'}); //交易密码重置申请
export const cmbcputresetPassword = service.getPutRequest(HOST + '/cmbc/passwords/', {},  { baseData: false,contentType:'multipart/form-data'}); //交易密码重置
export const cmbcputunlockPassword = service.getPutRequest(HOST + '/cmbc/passwords/', {},  { baseData: false,contentType:'multipart/form-data'}); //交易密码解锁
export const cmbcputunlockAccount = service.getPutRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'multipart/form-data'}); //解锁(6个月无交易)
export const cmbcgetAccountbalance = service.getGetRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'multipart/form-data'}); //账户余额
export const cmbcgetAccounttrades = service.getGetRequest(HOST + '/cmbc/trades', {},  { baseData: false,contentType:'multipart/form-data'}); //交易查询
export const cmbcPostaskforrecharge = service.getPostRequest(HOST + '/cmbc/trades/recharge', {},  { baseData: false,contentType:'multipart/form-data'}); //充值申请
export const cmbcputrecharge = service.getPutRequest(HOST + '/cmbc/trades/', {},  { baseData: false,contentType:'multipart/form-data'}); //充值
export const cmbcPostaskforwithdraw = service.getPostRequest(HOST + '/cmbc/trades/withdraw', {},  { baseData: false,contentType:'multipart/form-data'}); //提现申请
export const cmbcputwithdraw = service.getPutRequest(HOST + '/cmbc/trades/', {},  { baseData: false,contentType:'multipart/form-data'}); //提现

export const getaccountsdetail = service.getGetRequest(HOST + '/cmbc/accounts/0', {}, {baseData: false,contentType:'application/json'}); // 账户详情
export const getmasterbanks = service.getGetRequest(HOST + '/cmbc/banks', {}, {baseData: false,contentType:'application/json'}); // 支持银行列表
export const applydeleteaccount = service.getPostRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'application/json'}); //预销户
export const deleteaccount = service.getDleteRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'application/json'}); //销户
export const getaccountSatus = service.getGetRequest(HOST + '/cmbc/accounts/', {},  { baseData: false,contentType:'application/json'}); //开户结果查询
export const getpwdrandomNo = service.getPostRequest(HOST + '/cmbc/password-random-numbers', {},  { baseData: false,contentType:'application/json'}); //获取秘钥
// 详情
export const goodsdetail = service.getGetRequest(HOST + "/user/product-details/", {}, { loading: true}); // 详情


