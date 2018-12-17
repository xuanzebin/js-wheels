class Slides{
    constructor(options){
      this.options=options
      this.currentIndex=0
      this.timerID=undefined
      this.buttonSwitch=true
      this.$element=$(this.options.element)
      this.$element.addClass('xuanSlides')
      this.$ol=this.$element.children('ol')
      this.width=this.$ol.children('li').width()
      this.$element.width(this.width)
      this.initHtml()
      if (this.options.autoPlay){
        this.play()
      }
      this.bindEvents()
    }
    initHtml(){
      this.$prev=$('<button class="xuanSlides-prev">上一页</button>')
      this.$next=$('<button class="xuanSlides-next">下一页</button>')
      this.$element.append(this.$prev)
      this.$element.append(this.$next)
    }
    bindEvents(){
      this.$prev.on('click',()=>{
        if (this.buttonSwitch){
          this.currentIndex--
          this.go(this.currentIndex)
        }
      })
      this.$next.on('click',()=>{
        if (this.buttonSwitch){
          this.currentIndex++
          this.go(this.currentIndex)
        }
      })
      this.$element.on('mouseenter',()=>{
        window.clearInterval(this.timerID)
      }).on('mouseleave',()=>{
        this.play()
      })
    }
    go(index){
      this.buttonSwitch=false
      this.$items=this.$ol.children('li')
      if(index>=this.$items.length){
        index=0
      } else if (index<0){
        index=this.$items.length-1
      }
      this.$ol.css({transform:`translateX(${-index*this.width}px)`}).one('transitionend',()=>{
        this.buttonSwitch=true
      })
      this.currentIndex=index
    }
    play(){
      this.timerID=setInterval(()=>{
        this.currentIndex++
        this.go(this.currentIndex)
      },1000)
    }
  }
  
  
  ////////////////////////////////////////////////
  
  var slides=new Slides({
    element:'.slides',
    autoPlay:true,
    controls:false,
    pagers:false
  })
  