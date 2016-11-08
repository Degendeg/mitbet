$(document).ready(function() {
	
	// Öppna denna från start
	$('#users-link').click();
	
	// Home - get
	$.get(
	  'http://localhost:3000/points/',
	  function(data) {
		var cList = $('ul.res-list')
		$.each(data, function(k, v) {
			var li = $('<li/>')
			.addClass('list-group-item')
			.text('Användare: ' + v._source.firstname)
			.appendTo(cList);
			$('<li/>')
			.addClass('list-group-item')
			.text('Poäng: ' + v._source.points)
			.appendTo(li);
		});
	  }
	);
	
	// Admin - get
	$.get(
	  'http://localhost:3000/points/',
	  function(data) {
		var aList = $('ul.res-admin')
		$.each(data, function(k, v) {
			var li = $('<li/>')
			.addClass('list-group-item')
			.text('firstname: ' + v._source.firstname + ' | ' + 'surname: ' + v._source.surname + ' | ' + 'email: ' + v._source.email + ' | ' + 'points: ' + v._source.points + ' | ' + 'id: ' + v._id)
			.appendTo(aList);
		});
	  }
	);
	
	// Lägg till användare
	$(".add-user").click(function() {
		if( !$('.add-input').val() ) {
			alert('Fyll i rutorna!');
			return false;
		}
		else {
			var fname = $('#fname2').val();
			var sname = $('#sname2').val();
			var _email = $('#email2').val();
			var _points = $('#pts2').val();
			
			$.post("/admin/add",
			{
				firstname: fname,
				surname: sname,
				email: _email,
				points: _points
			})
			.done(function() {
				$('form').find("input[type=text], input[type=number] ,input[type=email]").val("");
				alert("Success!");
			})
			.fail(function() {
				alert("Error!");
			});
		}
	});
	
	// Ändra en användare
	$(".edit-user").click(function() {
		if( !$('.edit-input').val() ) {
			alert('Fyll i rutorna!');
			return false;
		}
		else {
			var fname = $('#fname1').val();
			var sname = $('#sname1').val();
			var _email = $('#email1').val();
			var _points = $('#pts1').val();
				
			$.post("/admin/edit",
			{
				firstname: fname,
				surname: sname,
				email: _email,
				points: _points
			})
			.done(function() {
				$('form').find("input[type=text], input[type=number] ,input[type=email]").val("");
				alert("Success!");
			})
			.fail(function() {
				alert("Error!");
			});
		}
	});
	
	// Ta bort en användare
	$(".del-user").click(function() {
		if( !$('.del-input').val() ) {
			alert('Fyll i rutorna!');
			return false;
		}
		else {
			var _id = $('#id-del').val();
			
			$.post("/admin/delete",
			{
				id: _id
			})
			.done(function() {
				$('form').find("input[type=text], input[type=number] ,input[type=email]").val("");
				alert("Success!");
			})
			.fail(function() {
				alert("Error!");
			});
		}
	});
});