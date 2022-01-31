'use strict'

$(document).ready(function(){

    var detalhesCOIN = localStorage.getItem('detailsCoinName');
    var arrayFav = [];

	if(localStorage.getItem('FavCoins') == null)
	{
		localStorage.setItem('FavCoins', '[]');
	}
	else
	{
		arrayFav = JSON.parse(localStorage.getItem('FavCoins'));
		console.log(arrayFav);
	}



	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h" 	
	}).done(function(res){
		
			
			$.each(res, function(index ,result){

                if(detalhesCOIN == result.name)
                {

                    $('#coinLOGO').attr('src' ,result.image);
					$('.coin-Name').text(result.name);
					$('.coin-Rank').text(result.market_cap_rank);
					$('.coin-ValorAtual').text(result.current_price + "€");
					$('.coin-TotalUnidades').text(result.total_volume);
					$('.coin-MarketChangePercentage24h').text(result.price_change_percentage_24h + "%"); 
					$('.coin-Preco24h').text(result.price_change_24h + "€");
					$('.coin-High24h').text(result.high_24h + "€");
					$('.coin-Low24h').text(result.low_24h + "€");
					$('.coin-TotalCoins').text(result.circulating_supply);
                    $('.coin-UpdateData').text(result.last_updated);
                }

				
			})

			$('.icon').on('click', function() {

				var valuePesquisa = $('#search').val();
		
				//console.log(valuePesquisa.lenght);
		
				$.ajax({
					method: "GET",
					url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
				}).done(function(res){
		
					$('.coinsList').empty(); // .html('');

					$.each(res, function(index, result){
						var cicloCheckingBox = 0;

						if(valuePesquisa == result.name)
						{

							$('#coinLOGO').attr('src' ,result.image);
							$('.coin-Name').text(result.name);
							$('.coin-Rank').text(result.market_cap_rank);
							$('.coin-ValorAtual').text(result.current_price + "€");
							$('.coin-TotalUnidades').text(result.total_volume);
							$('.coin-MarketChangePercentage24h').text(result.price_change_percentage_24h + "%"); 
							$('.coin-Preco24h').text(result.price_change_24h + "€");
							$('.coin-High24h').text(result.high_24h + "€");
							$('.coin-Low24h').text(result.low_24h + "€");
							$('.coin-TotalCoins').text(result.circulating_supply);
							$('.coin-UpdateData').text(result.last_updated);
							
							localStorage.setItem('detailsCoinName', valuePesquisa);
							detalhesCOIN = result.name;
							console.log(detalhesCOIN);
						}

					}) 
				})
			})
		})
})