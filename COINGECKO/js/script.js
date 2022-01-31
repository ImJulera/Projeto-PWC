'use strict';
$(document).ready(function() {

	const moedas = 100;
	var cloneCoin = $('.coin').clone();
	var listID = 0;
	var arrayFav = [];
	$('.coinsList').empty(); 
	

	if(localStorage.getItem('FavCoins') == null)
	{
		localStorage.setItem('FavCoins', '[]');
	}
	else
	{
		arrayFav = JSON.parse(localStorage.getItem('FavCoins'));
	}


	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h" 	
	}).done(function(res){
			
			$.each(res, function(index ,result){
				
				var cicloCheckingBox = 0;

				// Criar novo clone
				var liCoin = cloneCoin.clone();

				//Verifica se dentro do arrayFav existe o nome da moeda. Caso exista esse mesmo abilita a checkbox visto que essa moeda já está nos favoritos

				for(cicloCheckingBox ; cicloCheckingBox < arrayFav.length ; cicloCheckingBox++)
				{
					if(arrayFav[cicloCheckingBox] == result.name)
					{
						$('.checkbox-favoritos', liCoin).prop('checked', true);
					}
				}
				

				// Alterar no clone

				$('.checkbox-favoritos', liCoin).attr('id', listID);
				$('.coinRANK', liCoin).text(result.market_cap_rank);
				$('#coinIMG', liCoin).attr('src' ,result.image);
				$('.coinNAME', liCoin).text(result.name);
				$('.coinPRICE', liCoin).text(result.current_price + '$');
				$('.btn-image', liCoin).click(function(){
					localStorage.setItem('detailsCoinName', result.name);
					window.location.href='detalhes.html';
				})


				//Adiciona ou remove a moeda da lista dos favoritos.

				$('.checkbox-favoritos', liCoin).click(function(){
					
					var i = 0;
					var c = 0;

					for(i ; i < 100 ; i++)
					{
						if($('.checkbox-favoritos', liCoin).attr('id') == i)
						{
							if($('.checkbox-favoritos', liCoin).is(':checked'))
							{
								arrayFav.push(result.name);
								console.log(arrayFav);

								localStorage.setItem('FavCoins', JSON.stringify(arrayFav));

							}
							else
							{
								//console.log('unchecked' + i);
								for(c ; c < arrayFav.length ; c++)
								{
									if(arrayFav[c] == result.name)
									{
										arrayFav.splice(c,1);
										console.log(arrayFav);
										localStorage.setItem('FavCoins', JSON.stringify(arrayFav));
									} 
								}
							}
						}
					}
				})
				

				// Adicionar o clone à tabela original
				
				$('.coinsList').append(liCoin);

				listID = listID + 1;

				$('#btnSearch').on('click', function() {

					var valuePesquisa = $('#search').val();
			
					//console.log(valuePesquisa.lenght);
			
					$.ajax({
						method: "GET",
						url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
					}).done(function(res){
			
						$('.coinsList').empty(); // .html('');

						$.each(res, function(index, result){
							
							
							if(valuePesquisa == result.name)
							{
								// Criar novo clone
								var liCoin = cloneCoin.clone();
			
								// Alterar no clone
								$('.coinRANK', liCoin).text(result.market_cap_rank);
								$('#coinIMG', liCoin).attr('src' ,result.image);
								$('.coinNAME', liCoin).text(result.name);
								$('.coinPRICE', liCoin).text(result.current_price + '$');
								$('.btn-image', liCoin).click(function(){
									localStorage.setItem('coinNAME', result.name);
									window.location.href='detalhes.html';
								})
								
								// Adicionar o clone à tabela original
								$('.coinsList').append(liCoin);
							}
						}) 
					})
				})
			})
		})
})