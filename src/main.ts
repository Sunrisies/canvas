import './style.css'
class BlackBoard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,

    private app = el.getContext('2d')!,
    private width: number = el.width,
    private height: number = el.height,
    private btns: HTMLDivElement = document.createElement('div'),
    private bgColor: string = 'black',
    private lineColor: string = 'white',
    private lineWidth: number = 2
  ) {
    this.initCanvas()
    this.bindEvent()
  }
  // 添加事件
  private bindEvent() {
    const callback = this.drawLine.bind(this)
    this.el.addEventListener('mousedown', () => {
      this.app.beginPath()
      this.app.strokeStyle = this.lineColor
      this.app.lineWidth = this.lineWidth
      this.el.addEventListener('mousemove', callback)
    })
    document.addEventListener('mouseup', () => {
      this.el.removeEventListener('mousemove', callback)
    })
  }
  // 画线
  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY)
    this.app.stroke()
  }
  // 初始化画布
  private initCanvas() {
    this.app.fillStyle = this.bgColor
    this.app.fillRect(0, 0, this.width, this.height)

    this.el.insertAdjacentElement('afterend', this.btns)
    this.btns.classList.add('btns')
  }

  // 画

  public draw() {
    const el = document.createElement('button')
    el.innerText = '画'
    this.btns.insertAdjacentElement('afterbegin', el)
    el.addEventListener('click', () => {
      console.log('画')
      this.lineColor = 'white'
      this.lineWidth = 2
    })
    return this
  }

  // 橡皮擦
  public eraser() {
    const el = document.createElement('button')
    el.innerText = '橡皮擦'
    this.btns.insertAdjacentElement('afterbegin', el)
    el.addEventListener('click', () => {
      console.log('橡皮擦')
      this.lineColor = this.bgColor
      this.lineWidth = 10
    })
    return this
  }

  // 清除画布
  public clear() {
    const el = document.createElement('button')
    el.innerText = '清除'
    this.btns.insertAdjacentElement('afterbegin', el)
    el.addEventListener('click', () => {
      this.app.fillStyle = 'black'
      this.app.fillRect(0, 0, this.width, this.height)
    })
    return this
  }
  // 查看画布内容
  public show() {
    const el = document.createElement('button')
    el.innerText = '查看'
    this.btns.insertAdjacentElement('afterbegin', el)
    const img = document.createElement('img')

    el.addEventListener('click', () => {
      img.src = this.el.toDataURL('image/png')
      img.classList.add('img-short')
    })
    this.btns.insertAdjacentElement('afterbegin', img)
    return this
  }
  // 保存画布
  public save() {
    const el = document.createElement('button')
    el.innerText = '保存'
    this.btns.insertAdjacentElement('afterbegin', el)
    el.addEventListener('click', () => {
      const link = document.createElement('a')
      link.download = 'canvas.png'
      link.href = this.el.toDataURL()
      link.click()
    })
    return this
  }
}
const instance = new BlackBoard()
instance.clear().save().show().eraser().draw()
