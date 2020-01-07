$(document).ready(function () {

  var feedContainer = $(".feed-container");
  var postCategorySelect = $("#category");
  var authorSelect = $("#author");
  var MemberId;
  var currentPost;
  var posts;
  var listOption;
  var comment = $("#message-text");

  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "#commentSubmit", handleComment);
  $(document).on("click", "button.edit", thisTest);

  var url = window.location.search;
  var memberId;
  if (url.indexOf("?member_id=") !== -1) {
    memberId = url.split("=")[1];
    console.log(memberId)
    getPosts(memberId);
  }
  else {
    getPosts();
  }

  function getPosts(member) {
    memberId = member || "";
    if (memberId) {
      memberId = "/?member_id=" + memberId;
    }
    console.log(memberId)
    $.get("/api/posts" + memberId, function (data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(member);
      } else {
        initializeRows();
      }
    });
  }

  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function () {
      getPosts(postCategorySelect.val());
    });
  }

  function updateComment(newComment) {
    $.post("/api/comment", newComment, function () {
      console.log(newComment);
    }).then(function () {
      getPosts(postCategorySelect.val());
    });
  }

  function initializeRows() {
    feedContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    feedContainer.append(postsToAdd);
  }

  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card feed-card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var editBtn = $("<button>");
    editBtn.text("Leave a Comment");
    editBtn.addClass("edit btn btn-primary col-md-6 offset-md-3 btn-secondary");
    editBtn.attr("data-toggle", "modal");
    editBtn.attr("data-target", "#commentModal");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<h6>");
    var newPostAuthor = $("<h5>");
    var newPostImage = $("<img>")
    newPostImage.css({
      float: "right",
      height: "200px",
      width: "160px"
    });
    if (post.category === "IPA") {
      newPostImage.attr("src", "/styles/IPA.jpg")
    }
    if (post.category === "Lager") {
      newPostImage.attr("src", "/styles/Lager.jpg")
    }
    if (post.category === "Sour") {
      newPostImage.attr("src", "/styles/Sour.jpg")
    }
    if (post.category === "Port") {
      newPostImage.attr("src", "/styles/Porter.jpg")
    }
    if (post.category === "Blonde") {
      newPostImage.attr("src", "/styles/Blonde.jpg")
    }
    if (post.category === "Stout") {
      newPostImage.attr("src", "/styles/Stout.jpg")
    }
    if (post.category === "Witbier") {
      newPostImage.attr("src", "/styles/Lambic.jpg")
    }
    if (post.category === "Lambic") {
      newPostImage.attr("src", "/styles/Lambic.jpg")
    }
    if (post.category === "Pilsner") {
      newPostImage.attr("src", "/styles/Pilsner.jpg")
    }
    if (post.category === "Other (Specify in your review!)") {
      newPostImage.attr("src", "/styles/IPA.jpg")
    }

    newPostAuthor.text("Written by: " + post.Member.name);
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body border border-secondary border-top-0");
    var newPostBody = $("<p>");
    var newPostCategory = $("<h5>");
    var newPostRating = $("<h5>")
    var newPostCardComments = $("<div>");
    newPostCardComments.addClass("card scroll");
    var newPostCommentHeading = $("<h5>");
    newPostCommentHeading.addClass("comment-header")
    var newPostComments = $("<div>");
    newPostComments.addClass("card-body");
    var newPostCommentsBody = $("<p>");
    newPostCommentsBody.addClass("comments")
    var newPostFooter = $("<div>");
    newPostFooter.append(editBtn)
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostCategory.text("Category: " + post.category);
    if (post.rating === 5) {
      newPostRating.css({ color: "green" })
    }
    if (post.rating === 4) {
      newPostRating.css({ color: "green" })
    }
    if (post.rating === 3) {
      newPostRating.css({ color: " orange" })
    }
    if (post.rating === 2) {
      newPostRating.css({ color: "orange" })
    }
    if (post.rating === 1) {
      newPostRating.css({ color: "red" })
    }
    newPostRating.text("Rating: " + post.rating + "/5");

    newPostDate.text(formattedDate);
    newPostCardHeading.append(newPostImage);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardHeading.append(newPostCategory);
    newPostCardHeading.append(newPostRating);
    newPostCardHeading.append(newPostDate);
    newPostCardBody.append(newPostBody);
    newPostCommentHeading.text("Comments ");
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.append(newPostCardComments);
    newPostCard.data("post", post);

    if (post.Comments.length === 0) {
      var noComments = $("<h5>")
      noComments.text("No comments yet!")
      newPostCardComments.append(noComments)

    }
    else {
      for (var j = 0; j < post.Comments.length; j++) {
        console.log(post.Comments[j])
        var commentAuthor = $("<h5>")
        commentAuthor.addClass("comment-author")
        var formattedDate = new Date(post.Comments[j].createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm a");
        var commentDate = $("<h6>");
        commentDate.addClass("comment-date")
        commentDate.text(formattedDate);
        commentAuthor.text(post.Comments[j].comment_author + " commented:")
        commentAuthor.css({
          font: "15px",
          color: "light Grey",
        });
        var newPostComments = $("<div>");
        newPostComments.addClass("card text-white bg-secondary mb-3");
        newPostComments.addClass("card-body");
        var newPostCommentsBody = $("<p>");
        newPostCommentsBody.addClass("comment-body")
        var newPostCommentsFooter = $("<div>");
        var newPostCommentsHeading = $("<div>");
        newPostCommentsHeading.addClass("border border-top-0 border-right-0 border-left-0 border-dark comment-heading")
        newPostCommentsHeading.css({ padding: "5px" });
        newPostCommentsBody.text(post.Comments[j].comment);
        newPostCommentsHeading.append(commentAuthor);
        newPostCommentsHeading.append(commentDate);
        newPostComments.append(newPostCommentsHeading);
        newPostComments.append(newPostCommentsBody);
        newPostComments.append(newPostCommentsFooter);
        newPostCardComments.append(newPostComments)
      }
    }
    newPostCard.append(newPostFooter);

    return newPostCard;
  }


  getAuthors();
  function getAuthors() {
    $.get("/api/members", renderAuthorList);
  }

  function renderAuthorList(data) {
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
    listOption = $("<option>");
    listOption.attr("value", Member.name);
    listOption.text(Member.name);
    return listOption;
  }
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    console.log(currentPost);
    deletePost(currentPost.id);
  }

  function handleComment() {
    var newComment = {
      comment: comment.val().trim(),
      comment_author: authorSelect.val(),
      PostId: currentPost
    }
    console.log(newComment);
    updateComment(newComment)
    $(".edit").modal('hide');
  
  }

  function thisTest() {
    currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    currentPost = currentPost.id;
    console.log(currentPost)
  }


  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Member #" + id;
    }
    feedContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px", "color": "white" });
    messageH2.html(
      "No posts yet" +
      partial +
      ", navigate <a href='/post" +
      query +
      "'>here</a> to write a post!."
    );
    feedContainer.append(messageH2);
    console.log(messageH2)
  }
});

