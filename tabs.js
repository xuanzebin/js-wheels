class Tabs{
  constructor(selector){
    this.element=$(selector)
    this.init()
    this.bindEvents()
  }
  init(){
    this.element.each(function(index,element){
      $(element).find('.tabs-bar>li').eq(0).addClass('active')
      $(element).find('.tabs-content>li').eq(0).addClass('active')
    })  
  }
  bindEvents(){
    this.element.on('click','.tabs-bar>li',(e)=>{
      var $li=$(e.currentTarget)
      $li.addClass('active').siblings().removeClass('active')
      var index=$li.index()
      $li.closest('.tabs').find('.tabs-content>li').eq(index).addClass('active').siblings().removeClass('active')
    })
  }
}

var tabs=new Tabs('.tabs')