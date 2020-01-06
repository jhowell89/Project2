$(document).ready(function() {
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var beerForm = $("#beerform");
    var beerCategory = $("#category")
    var beerRating = $("#rating")
    var authorSelect = $("#author");
    $(beerForm).on("submit", handleFormSubmit); 
    var url = window.location.search;
    var MemberId;
    getAuthors();
  
    function handleFormSubmit(event) {
      event.preventDefault();
      if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
        return;
      }
      var newPost = {
        title: titleInput
          .val()
          .trim(),
        category: beerCategory.val(),
        body: bodyInput
          .val()
          .trim(),
        rating: beerRating.val(),
        MemberId: authorSelect.val()
      };
      console.log("test)")
      submitPost(newPost);
    }
  
    function submitPost(post) {
      $.post("/api/posts", post, function() {
        console.log(post);
        window.location.href = "/feed";
      });
    }
  
    function getAuthors() {
      $.get("/api/members", renderAuthorList);
    }

    function renderAuthorList(data) {
      if (!data.length) {
        alert("Sign in to create a post!")
        window.location.href = "/";
      }
      $(".hidden").removeClass("hidden");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      authorSelect.empty();
      console.log(rowsToAdd);
      console.log(authorSelect);
      authorSelect.append(rowsToAdd);
      authorSelect.val(MemberId);
    }
  
    function createAuthorRow(Member) {
      var listOption = $("<option>");
      listOption.attr("value", Member.id);
      listOption.text(Member.name);
      return listOption;
    }
  });
  