function Tabs(selector){
    this.element=$(selector)
    this.init()
    this.bindEvents()
  }
  Tabs.prototype.init=function(){
    this.element.each(function(index,element){
      $(element).find('.tabs-bar>li').eq(0).addClass('active')
      $(element).find('.tabs-content>li').eq(0).addClass('active')
    })
  }
  Tabs.prototype.bindEvents=function(){
    this.element.on('click','.tabs-bar>li',(e)=>{
      var $li=$(e.currentTarget)
      $li.addClass('active').siblings().removeClass('active')
      var index=$li.index()
      $li.closest('.tabs').find('.tabs-content>li').eq(index).addClass('active').siblings().removeClass('active')
    })
  }
  
  var tabs=new Tabs('.tabs')