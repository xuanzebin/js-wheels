class Sticky{
    constructor(selector,n){
        this.elements=$(selector)
        this.offset=n || 0
        this.offsets=[]
        this.cacheOffset()
        this.addPlaceholder()
        this.listenToScroll()
    }
    cacheOffset(){
        $(this.elements).each((index,element)=>{
        this.offsets[index]=$(element).offset().top
        })
    }
    addPlaceholder(){
        $(this.elements).each((index,element)=>{
        var $element=$(element)
        $(element).wrap('<div class="stickyPlaceholder"></div>')
        $(element).parent('.stickyPlaceholder').height($element.height())
        })
    }
    listenToScroll(){
        $(window).on('scroll',()=>{
        $(this.elements).each((index,element)=>{
            var $element=$(element)
            if (window.scrollY + this.offset>this.offsets[index]){
            $element.addClass('sticky')
            .css({top:this.offset})
            } else {
            $element.removeClass('sticky')
            }
        })
        })
    }
}
new Sticky('#topbar')
new Sticky('button',100)
  
  
  