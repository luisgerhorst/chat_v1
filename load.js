
socket.on('newMessage', function (message) {
    
    var entry = '<li data-userID="' + message.userID + '"><span class="name">' + message.name + ':</span><div class="content"><span class="message">' + linkURLs(message.message) + ' </span><span class="time" data-time="' + message.time + '"></span></div></li>';
	
	$('#messages').append(entry);
	
    setTime();
    
    window.scrollTo(0,document.body.scrollHeight); // scroll to bottom
    
    // functions:
    
    function linkURLs(text) {
		var url = '', www = '', mail = '';
		url = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim; // URLs starting with http://, https://, or ftp://
		www = /(^|[^\/])(www\.[\S]+(\b|$))/gim; // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		mail = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;  // Change email addresses to mailto:: links.
		return String(text).replace(url, '<a href="$1" target="_blank">$1</a>').replace(www, '$1<a href="http://$2" target="_blank">$2</a>').replace(mail, '<a href="mailto:$1">$1</a>');
	}
    
});


socket.on('updatedUsers', function (users) {
    
    var html='';
	
	for (var userID in users) {
		html += '<li data-userID="' + userID + '">' + users[userID].name + '</li>';
	}
	
	if (html) {
		html = '<p>Online:</p>' + html;
		$('#users').html(html);
	}
	
	else $('#users').html('');
    
});


setInterval(setTime, 10*1000);

function setTime() { // adds relative timestamps to every entry

    $('span.time').each(function(index) { // for each, do
    
    	if ($(this).attr('data-time')) { // if this element has 'data-time' attribute
    
	    	var time;
	    	time = moment('"' + $(this).attr('data-time') + '"', "YYYY-MM-DDTHH:mm:ssZ"); // cretates moment() with the content of the data-time attribute
	    	time = time.from(moment().utc()); // coverts it to realtive timestamps
	    	$(this).html(time); // add's the relative timestamp into the element
      
	    }
	    
    });
    
}