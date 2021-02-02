class Popup{
    constructor(id){
        this.gallery = $(id);
        this.readMoreBtn = this.gallery.find(".read-more-link")
        this.popupBlock = this.gallery.children(".popup-block");
        this.popupCloseBtn = this.popupBlock.children(".popup-close")
        this.imgPopup = this.popupBlock.find(".popup__img");
        this.namePopup =this.popupBlock.find(".popup__name");
        this.headingPopup =this.popupBlock.find(".popup__heading");
        this.textPopup = this.popupBlock.find(".popup__text");
        this.popupBg = $("#popup-overlay");
        this.createEvents();
    }
    showPopupBlock(event){
        event.preventDefault();
        let currentPost = $(event.currentTarget).closest(".post-section");
        this.display(currentPost);
        this.popupBlock.addClass("popup-block__opened");
        this.popupBg.addClass("popup__overlay_visible");
    }
    display(currentPost){
        let currentName = currentPost.find(".post__name").html(),
            currentHeading =currentPost.find(".post-disc__heading").text(),
            currentText = currentPost.find(".post-disc__text").html(),
            currentPostNum = currentPost.data("post-num");
        this.imgPopup.attr("src", `./images/gallery/${currentPostNum}.jpg`);
        this.namePopup.html(currentName);
        this.headingPopup.text(currentHeading);
        this.textPopup.html(currentText);
    }
    closePopup(event){
        if($(event.target).closest(".popup-block__opened").length || $(event.target).hasClass('popup__overlay_visible')){
            event.preventDefault();
            this.hide();
        }
    }
    hide(){
        this.popupBlock.removeClass("popup-block__opened");
        this.popupBg.removeClass("popup__overlay_visible");
    }
    setHotkeys(event){
        if(event.which == 27){
            this.hide();
        }
    }
    createEvents(){
        this.gallery.keyup(this.setHotkeys.bind(this));
        this.readMoreBtn.click(this.showPopupBlock.bind(this));
        this.popupCloseBtn.click(this.closePopup.bind(this));
        this.popupBg.click(this.closePopup.bind(this));
    }
}
let popup = new Popup("#gallery-block");