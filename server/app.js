const Koa = require('koa') // 引入 koa
const Router = require('koa-router')
const next = require('next') // nextjs 作爲中間件

const dev = process.env.NODE_ENV !== 'production' // 判斷是否處於開發者狀態
const app = next({ dev }) // 初始化 nextjs，判斷它是否處於 dev：開發者狀態，還是production: 正式服務狀態
const handle = app.getRequestHandler() // 拿到 http 請求的響應

// app.prepare：編譯 pages 文件夾下面的頁面文件，then 是保證 pages 下頁面全部編譯完了之後，我們才能真正的啓動服務來響應請求。
// 如果這些內容我們沒有編譯完成，那麼啓動服務響應請求的時候可能會報錯。
app.prepare().then(() => {
  const server = new Koa() // 聲明一個 server
  const router = new Router()

  /** 這是 Koa 的核心用法：中間件。通常給 use 裏面寫一個函數，這個函數就是中間件。
   * params:
   *  ctx: Koa Context 將 node 的 request 和 response 對象封裝到單個對象中，爲請求上下文對象
   *  next: 調用後將執行流程轉入下一個中間件，如果當前中間件中沒有調用 next，整個中間件的執行流程則會在這裏終止，後續中間件不會得到執行
   */
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.response = false
  })

  server.use(router.routes())

  router.get(`/about`, async ctx => {
    console.log(ctx.req);
    console.log(ctx.res);
    console.log(ctx.params);

    ctx.status = 200
    /* ctx.status = 200
    const loginInfo = await loginControllers.checkAuth(ctx)
    if (loginInfo && loginInfo.checkRole) {
      const query = Object.assign({}, ctx.query, { loginInfo })
      await app.render(ctx.req, ctx.res, '/profile', query)
    } else {
      ctx.status = 302
      ctx.redirect('/')
      return
    } */
    const {
      field
    } = ctx.params
    const query = Object.assign({}, ctx.query, {
      isNginx: false,
      field
    })
    await app.render(ctx.req, ctx.res, '/about', query)
    ctx.respond = false
  })
  
  server.use(router.routes())
  server.listen(3123)
})