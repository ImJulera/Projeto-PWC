'use strict';

$(document).ready(function() {

	const searchBar = document.querySelector('.searchInput');
	const inputBox = searchBar.querySelector('input');
	const suggBox = searchBar.querySelector('.searchSuggestions');
	let suggestions = [];

	$.ajax({
		method: "GET",
		url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
	}).done(function(res){
		
		$.each(res, function(index, result){

			suggestions.push(result.name);
		})
	})

	inputBox.onkeyup = (e)=>{
		let usarData = e.target.value;
		let emptyArray = [];
		if(usarData)
		{
			emptyArray = suggestions.filter((data)=>{
				return data.toLocaleLowerCase().startsWith(usarData.toLocaleLowerCase());
			});
			emptyArray = emptyArray.map((data)=>{
				return data = '<li>' + data + '</li>';
			});
			searchBar.classList.add('active');
			showSuggestions(emptyArray);
			let allList = suggBox.querySelectorAll('li');
			for(let i = 0 ; i < allList.length ; i++)
			{
				allList[i].setAttribute('onclick', 'select(this)');
			}
		}else{
			searchBar.classList.remove('active');
		}
	}

	function select(element)
	{
		let selectUserData = element.textContent;
		console.log(selectUserData);
	}

	function showSuggestions(list)
	{
		let listData;
		let userValue;
		if(!list.length)
		{
			userValue = inputBox.value;
			listData = '<li>' + userValue + '</li>';
		}
		else
		{
			listData = list.join('');
		}
		suggBox.innerHTML = listData;
	}
})