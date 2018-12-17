class Suggestion{
    constructor(options){
      this.options=options
      this.$input=$(this.options.input)
      this.$input.wrap('<div class="xuanSuggestion"></div>')
      this.$wrapper=this.$input.parent()
      this.$ol=$('<ol class="xuanSuggestion-list"></ol>')
      this.$loading=$('<div class="xuanSuggestion-loading"></div>')
      this.$empty=$('<div class="xuanSuggestion-empty"></div>')
      this.$loading.html(this.options.loadingTemplate)
      this.$empty.html(this.options.emptyTemplate)
      this.$input.after(this.$loading)
      this.$input.after(this.$empty)
      this.$input.after(this.$ol)
      this.bindEvents()
    }
    bindEvents(){
      var timerId
      this.$input.on('input',(e)=>{
        let searchContent=e.currentTarget.value
        this.search(searchContent,timerId)
      })
    }
    search(searchContent,timerId){
      this.$ol.empty()
      this.$wrapper.addClass('loading')
      this.$wrapper.removeClass('empty')
      if (searchContent===''){
        this.$wrapper.removeClass('loading')
        return 
      }
      if(timerId){
        window.clearTimeout(timerId)
      }
      timerId=setTimeout(()=>{
        this.options.search(searchContent,(array)=>{
          if (!array || array.length===0){
            this.$wrapper.addClass('empty')
            this.$wrapper.removeClass('loading')
            return
          }
          this.$ol.empty()
          array.forEach((value)=>{
            var $li=$('<li></li>')
            $li.text(value)
            this.$ol.append($li)
            this.$wrapper.removeClass('loading')
          })
          $('li').on('click',(e)=>{
              this.$input.val($(e.currentTarget).text())
          })
        })
        timerId=undefined
      },300)
    }
  }
  
  
  
  //////////////////////////////////
  
  var s=new Suggestion({
    input:'input',
    search:function(text,callback){
      let array=[]
      if (text==='0') {
        setTimeout(()=>callback(array),500)
        return
      }
      for (let i=0;i<5;i++){
        let n=parseInt(Math.random()*100)
        array.push(text+n)
      }
      setTimeout(()=>callback(array),500)
    },
    loadingTemplate:'加载中',
    emptyTemplate:'找不到相关内容'
  })