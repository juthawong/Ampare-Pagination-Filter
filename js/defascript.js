jQuery(document).ready(function(){
	let savestudentlist = jQuery('.student-list').html(); //Save Init HTML So that it can later use in search and many stuff without to reload the page. Better UX For User :)
	let numberofpage; //Number of Pagination
	jQuery(".page").html(jQuery(".page").html().replace('&lt;-- dynamically insert search form here (optional) --&gt;','<div class="student-search"><input placeholder="Search for students..."> <button>Search</button> </div>'));
	//Replace all <-- dynamic insert search ... --> to search html from example-exceed provide
	jQuery(".page").html(jQuery(".page").html().replace('&lt;-- dynamically add pagination links here --&gt;','<div class="pagination"><ul></ul></div>'));
	//Replace all <-- dynamic add pagination .. --> to pagination link ^^
	var tmpstudentitem = jQuery('.student-item'); //Create Temporary Student Item Object that can later be use in search , pagination and many stuff
	function isEmpty(str){
		return !(str||str.length > 0); //Check that string is empty
	}
	function calculatepage(){
		numberofpage = Math.ceil((tmpstudentitem.length)/10); //Get Number of page by divide all of student item by 10
		jQuery('.pagination ul li a').unbind(); //Garbage Collection First Because we are going to unload every thing aka break dom
		jQuery('.pagination ul').html("");
		for(let i = 1;i <= numberofpage;i++){
			jQuery('.pagination ul').append('<li><a href="#'+ i +'">'+i+'</a></li>');
		}
		jQuery('.pagination ul li a').click(function(){
			jQuery('.pagination ul li a').removeClass('active');
			jQuery(this).addClass('active');
			amparepagination(jQuery(this).text());

		}); //Bind Click Function again :)
	}
	jQuery('.student-search button').click(function(){ //When Search Button Click
		let searchtext = jQuery('.student-search input').val(); //Search Text Input Value
		if(isEmpty(searchtext)){ // If Empty Search Input value. Reload Everything without reloading the page
			jQuery('.student-list').html(savestudentlist); //Reload The HTML that we save at init :)
			tmpstudentitem = jQuery('.student-item'); // set tmpstudentitem to current student item
		}else{
			jQuery('.student-list').html(savestudentlist); //Reload Everything Ready For The Search
			jQuery('.student-item').each(function(){ //Search in Each Student Item
				if(jQuery(this).text().toLowerCase().indexOf(searchtext.toLowerCase()) == -1){
					//If it doesn't contains the search terms in Search Input . We remove it
					jQuery(this).remove();
				}
			});
			tmpstudentitem = jQuery('.student-item'); //Reset tmpstudent item. Ready for Re-Pagination

		}
		window.location.hash = 1; //Set Hash To 1 Because it going to show the first page. Prevent bug
		calculatepage(); //Calculate Pagination Links
		amparepagination(1); //Show Pagination

	});
	function amparepagination(num){
		if(tmpstudentitem.length > 0){ //If there is student item exist
			num = parseInt(num); //Get only number . Convert to integer
			startwith = (num * 10) - 10; // Math Rules!! Multiply by 10 because we want to show 10 item but number is +1 more than the real index number
			endwith = (num * 10) - 1; // Same Because we want to show 10 items
			if(endwith > tmpstudentitem.length){
				endwith = tmpstudentitem.length;
			//Check that the end of pagination doesn't exceed Student Item to prevent error
			}
			jQuery('.pagination ul li a').removeClass('active');
			jQuery('.pagination ul li a').eq(num - 1).addClass('active');
			jQuery('.student-list').html('');
			for(let i = startwith;i<=endwith;i++){
				jQuery('.student-list').append(tmpstudentitem[i]);
			} //Loop showing the list of item From Start to The End Pagination
		}else{
			jQuery('.student-list').html('No Matches Found For Terms  "' + jQuery('.student-search input').val() +'" . Sorry');
			// If no match found, We said that there is no matches found
		}
	}

	jQuery('.student-search input').keypress(function(e) {

		if(e.which == 13) {
			jQuery('.student-search button').click();
			//If we press enter in search textbox , It automatically trigger click on search button for user experienced
		}
	});
	function getPageFromHash(){
		return parseInt(window.location.hash.substring(1)); //Get Page Number From Hash
	}
	function init(){
		//Initialize Thing
		calculatepage();
		//Calculate Pagination
		if(getPageFromHash() >0 ){
			amparepagination(getPageFromHash()); //If we get hash pagintion more than 0. We start pagination at that page
			jQuery('.pagination ul li a').eq(getPageFromHash() - 1).addClass('active'); //Make that pagination link active
		}else{
			jQuery('.pagination ul li a').first().addClass('active'); //Make the first pagination link active because we start at first page right?
		}
	}
	init(); //Run Init Function

});