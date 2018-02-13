$(() =>{
    console.log("ENTRO EN AJAX")
    $(".back-it").on('click', (e) => {
        console.log("ENTRO EN AJAX------------------->")
        let bt = $(e.currentTarget);
        let person = parseInt($('.event-progress').attr('data-current-people'));
        let increment = parseInt(bt.attr('data-join'));
        e.preventDefault();
        person += increment;
        let id = bt.attr('data-id');
        $.ajax(`/events/${id}/people`).then( r =>{
            let max_val = parseInt($('.event-progress progress').attr('max'));
            if(person > max_val){
                $('.event-total').text('¡El evento ya está lleno!');
            }else{
                $('.event-total').text(`\$${person}`);
                $('.event-progress').attr('data-current-people',person)
                $('.event-progress progress').attr('value',person);
            }
        });
    })
})


//En modelo User: eventosAsistir -- ID´s eventos a los que voy (eventAsist)
//En modelo Event: totalPerson -- ID´s personas que asisten (currentPeople)
//En front, restar del totalPerson =- 