$(() =>{
    $(".back-it").on('click', (e) => {
        let bt = $(e.currentTarget);
        let price = parseInt($('.event-progress').attr('data-current-pledge'));
        let increment = parseInt(bt.attr('data-pledge'));
        e.preventDefault();
        price += increment;
        let id = bt.attr('data-id');
        $.ajax(`/event/${id}/pledge/${increment}`).then( r =>{
            let max_val = parseInt($('.event-progress progress').attr('max'));
            if(price > max_val){
                $('.event-total').text('Ya tienes tu Pony!!');
            }else{
                $('.event-total').text(`\$${price}`);
                $('.event-progress').attr('data-current-pledge',price)
                $('.event-progress progress').attr('value',price);
            }
        });
    })
})