$.getJSON("/games", function (data) {
  for (var i = 0; i < data.length; i++) {
    var game = `
    <div class="row">
      <img class="gameImg" src=${data[i].imgUrl} alt="game img">
      <p class="gameTitle" data-id=${data[i]._id}><b>${data[i].title}</b><br />${data[i].catagory}</p>
    </div>`;
    if (data[i].imgUrl !== "//cache.armorgames.com/images/transparent.gif") {
      $("#games").append(game);
    }
  }
});


$(document).on("click", "p", function () {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/games/" + thisId
  })
    .then(function (data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='ratinginput' name='rating' placeholder='your rating'>");
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='your review'></textarea>");
      $("#notes").append("<a data-id='" + data._id + "' id='savenote'>Save Note</a>");

      if (data.note) {
        $("#ratinginput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function () {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/games/" + thisId,
    data: {
      rating: $("#ratinginput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function (data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#ratinginput").val("");
  $("#bodyinput").val("");
});
