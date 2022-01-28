'use strict';

$('#btnSearch').on('click', function() {

	var valuePesquisa = $('#search').val();
	$('.coinsList').empty(); // .html('');

    console.log(valuePesquisa.lenght);

	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
	}).done(function(res){

		$.each(res, function(index, result){
            
            // Criar novo clone
			var liCoin = cloneCoin.clone();

            if(valuePesquisa == result.name)
            {
                // Alterar no clone
                $('.coinRANK', liCoin).text(result.market_cap_rank);
			    $('#coinIMG', liCoin).attr('src' ,result.image);
			    $('.coinNAME', liCoin).text(result.name);
			    $('.coinPRICE', liCoin).text(result.current_price + '$');

                // Adicionar o clone à tabela original
			    $('.coinsList').append(liCoin);
            }
		}) 
	})
})