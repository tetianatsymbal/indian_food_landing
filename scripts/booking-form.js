class BookingForm{
    constructor(id){
        this.form = $(id);
        this.createEvents();
    }
    submit(e){
        e.preventDefault();
        this.validate($(e.target).serializeArray());
    }
    validate(inputList){
        let emailRegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        this.form.find('input').removeClass('error');

        inputList.forEach(function(input){
            let element = $('[name="' + input['name'] + '"]');
            let inputType = element.attr('type');
            if(element.attr('required') && input['value'] == ''){
                element.addClass('error');
            }
            if(inputType == 'email' && input['value'] != '' && !emailRegExp.test(input['value'])){
                element.addClass('error');
            }
        });
    }
    createEvents(){
        this.form.submit(this.submit.bind(this));
    }
}

let bookingForm = new BookingForm("#booking-form");