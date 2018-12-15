class Dialog{
    constructor(options){
      this.options=options
      this.init()
    }
    get template(){
      var {text,content}=this.options
      return `
        <div class="xuanDialog">
          <div class="xuanDialog-wrapper">
            <header class="xuanDialog-header">${text}</header>
            <main class="xuanDialog-main">${content}</main>
            <footer class="xuanDialog-footer"></footer>
          </div>
        </div>
  `
    }
    generatorButtons(){
      var {buttons}=this.options
      var $buttons=buttons.map((buttonOptions)=>{
        var $b=$(`<button>${buttonOptions.text}</button>`)
        $b.on('click',buttonOptions.action)
        return $b
      })
      return $buttons
    }
    init(){
      var {className}=this.options
      this.$dialog=$(this.template)
      this.$dialog.addClass(className)
      this.$dialog.find('footer').append(this.generatorButtons())
    }
    open(){
      this.$dialog.appendTo('body')
    }
    close(){
      this.$dialog.detach()
    }
  }
  
  
  
  
  /**---------------------------------------**/
  $('button').on('click',()=>{
    var dialog=new Dialog({
      text:'标题',
      content:'内容',
      className:'userName',
      buttons:[
        {
          text:'确认',
          action:function(){
            alert(1)
            dialog.close()
          }
        },{
          text:'取消',
          action:function(){
            dialog.close()
          }
        }
      ]
    })
    dialog.open()
  })