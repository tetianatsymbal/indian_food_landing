 class Slider{
    constructor(id){
        this.slider = $(id);
        this.sliderBox = this.slider.children(".slider__slides");
        this.slides = this.sliderBox.children(".slides__slide");
        this.navBtnList = this.slider.find(".navigation__nav-circles");
        this.btns = this.navBtnList.children(".nav-circles__circle");
        this.slidesQty = this.slides.length;
        this.sliderWidth = this.slider.width();
        this.slideInterval = 4000;
        this.currentSlide = 1;
        this.isCursorOnSlider = false;
        this.init();
        this.createEvents();
    }
    init(){
        setInterval(this.nextSlide.bind(this), this.slideInterval);
        this.slider.hover(() => {
            this.isCursorOnSlider = true;
        }, () => {
            this.isCursorOnSlider = false;
        });
    }
    nextSlide(){
        if(this.isCursorOnSlider){
            return;
        }

        let translationWidth = 0;
        if(this.currentSlide == this.slidesQty){
            this.currentSlide = 1;
        }
        else {
            translationWidth = -this.sliderWidth * this.currentSlide;
            this.currentSlide++;
        }

        this.sliderBox.animate({left: translationWidth + "px"}, 400);
        this.btns.removeClass("nav-circles__circle_current"); 
        this.navBtnList.find("[data-btn-num='" + this.currentSlide + "'").addClass("nav-circles__circle_current");
    }
    move(event){
        let currentBtn = $(event.currentTarget),
            navBtnNum = currentBtn.data('btn-num')
            ;

        if (navBtnNum != this.currentSlide) {
            let translationWidth = -this.sliderWidth * (navBtnNum - 1);
            this.sliderBox.animate({left: translationWidth + "px"}, 400);
            this.currentSlide = navBtnNum;
            this.btns.removeClass("nav-circles__circle_current");
            currentBtn.addClass("nav-circles__circle_current");      
        }
    }
    createEvents(){
        this.btns.click(this.move.bind(this));
    }
}

$(() => {
    let slider1 = new Slider("#slider");
});