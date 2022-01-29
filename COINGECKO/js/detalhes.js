'use strict'

$(document).ready(function(){

    var detalhesCOIN = localStorage.getItem('coinNAME');
    

	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h" 	
	}).done(function(res){
			console.log('entrou no done');
			
			$.each(res, function(index ,result){

                if(detalhesCOIN == result.name)
                {
                    $('#coinLOGO').attr('src' ,result.image);
					$('.coin-Name').text(result.name);
					$('.coin-Rank').text(result.market_cap_rank);
					$('.coin-ValorAtual').text(result.current_price + "€"); 
					$('.coin-Preco24h').text(result.price_change_24h + "€");
					$('.coin-High24h').text(result.high_24h + "€");
					$('.coin-Low24h').text(result.low_24h + "€");
                    $('.coin-UpdateData').text(result.last_updated);
                }

			})
		})
})