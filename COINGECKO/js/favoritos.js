'use strict'

$(document).ready(function(){

	var cloneCoin = $('.coin').clone();
    const moedas = 100;
	var listID = 0;
	var arrayFav = [];
    var cicloListarFav = 0;
	$('.coinsList').empty(); // .html('');


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

            if(arrayFav.length > 0)
            {
                $('.emptyFavoritos').hide();
            }
            else
            {
                $('.coinsHead').hide();
            }

			$.each(res, function(index ,result){

                var cicloCheckingBox = 0;
                var cicloListarFav = 0;

                // Criar novo clone
				var liCoin = cloneCoin.clone();

                for(cicloListarFav ; cicloListarFav < arrayFav.length ; cicloListarFav++)
                {
                    if(arrayFav[cicloListarFav] == result.name)
                    {
                        for(cicloCheckingBox ; cicloCheckingBox < arrayFav.length ; cicloCheckingBox++)
                        {
                            if(arrayFav[cicloCheckingBox] == result.name)
                            {
                                $('.checkbox-favoritos', liCoin).prop('checked', true);
                            }
                        }

                        $('.checkbox-favoritos', liCoin).attr('id', listID);
                        $('.coinRANK', liCoin).text(result.market_cap_rank);
                        $('#coinIMG', liCoin).attr('src' ,result.image);
                        $('.coinNAME', liCoin).text(result.name);
                        $('.coinSYMBOL', liCoin).text('(' + (result.symbol).toUpperCase() + ')');
                        $('.coinPRICE', liCoin).text(result.current_price + '$');
                        $('.coinMARKETCAP', liCoin).text(result.market_cap_change_percentage_24h + '%');
                        $('.coinCURRENTSUPPLY', liCoin).text(result.circulating_supply); 
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


                        $('.coinsList').append(liCoin);

                        listID = listID + 1;
                        
                    }
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
						
						if(valuePesquisa == result.name)
						{
                            var cicloCheckingBox = 0;
                            var cicloListarFav = 0;
            
                            // Criar novo clone
                            var liCoin = cloneCoin.clone();
            
                            for(cicloListarFav ; cicloListarFav < arrayFav.length ; cicloListarFav++)
                            {
                                if(arrayFav[cicloListarFav] == result.name)
                                {
                                    for(cicloCheckingBox ; cicloCheckingBox < arrayFav.length ; cicloCheckingBox++)
                                    {
                                        if(arrayFav[cicloCheckingBox] == result.name)
                                        {
                                            $('.checkbox-favoritos', liCoin).prop('checked', true);
                                        }
                                    }
            
                                    $('.checkbox-favoritos', liCoin).attr('id', listID);
                                    $('.coinRANK', liCoin).text(result.market_cap_rank);
                                    $('#coinIMG', liCoin).attr('src' ,result.image);
                                    $('.coinNAME', liCoin).text(result.name);
                                    $('.coinSYMBOL', liCoin).text('(' + (result.symbol).toUpperCase() + ')');
                                    $('.coinPRICE', liCoin).text(result.current_price + '$');
                                    $('.coinMARKETCAP', liCoin).text(result.market_cap_change_percentage_24h + '%');
                                    $('.coinCURRENTSUPPLY', liCoin).text(result.circulating_supply); 
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
            
            
                                    $('.coinsList').append(liCoin);
            
                                    listID = listID + 1;
                                    
                                }
                            }
						}
                        else
                        {

                        }
					})  
				})
			})
		})
})
