$(document).ready(function() {

    var nameInput = $("#member_name");
    var membersList = $("tbody");
    var memberContainer = $(".member-container");
    $(document).on("submit", "#members", handleMemberFormSubmit);
    // $(document).on("click", ".delete-member", handleDeleteButtonPress);

    // getMembers();

    function handleMemberFormSubmit(event) {
      event.preventDefault();
      // if (!nameInput.val().trim().trim()) {
      //   return;
      // }

      upsertMember({
        name: nameInput
          .val()
          .trim()
      });
      
    }

    function upsertMember(memberData) {
      $.post("/api/members", memberData)
        // .then(getMembers);
    }

    // function createMemberRow(memberData) {
    //   var newTr = $("<tr>");
    //   newTr.data("member", memberData);
    //   newTr.append("<td>" + memberData.name + "</td>");
    //   if (memberData.Posts) {
    //     newTr.append("<td> " + memberData.Posts.length + "</td>");
    //   } else {
    //     newTr.append("<td>0</td>");
    //   }
    //   newTr.append("<td><a href='/feed?member_id=" + memberData.id + "'>Go to Posts</a></td>");
    //   newTr.append("<td><a href='/post?member_id=" + memberData.id + "'>Create a Post</a></td>");
    //   newTr.append("<td><a style='cursor:pointer;color:red' class='delete-member'>Delete Member</a></td>");
    //   return newTr;
    // }

    // function getMembers() {
    //   $.get("/api/members", function(data) {
    //     var rowsToAdd = [];
    //     for (var i = 0; i < data.length; i++) {
    //       rowsToAdd.push(createMemberRow(data[i]));
    //     }
    //     renderMemberList(rowsToAdd);
    //     nameInput.val("");
    //   });
    // }

    // function renderMemberList(rows) {
    //   memberList.children().not(":last").remove();
    //   memberContainer.children(".alert").remove();
    //   if (rows.length) {
    //     console.log(rows);
    //     memberList.prepend(rows);
    //   }
    //   else {
    //     renderEmpty();
    //   }
    // }

    // function renderEmpty() {
    //   var alertDiv = $("<div>");
    //   alertDiv.addClass("alert alert-danger");
    //   alertDiv.text("You must create an Member before you can create a Post.");
    //   memberContainer.append(alertDiv);
    // }


    // function handleDeleteButtonPress() {
    //   var listItemData = $(this).parent("td").parent("tr").data("member");
    //   var id = listItemData.id;
    //   $.ajax({
    //     method: "DELETE",
    //     url: "/api/members/" + id
    //   })
    //     .then(getMembers);
    // }
  });
