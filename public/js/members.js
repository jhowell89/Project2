$(document).ready(function() {

    var nameInput = $("#member_name");
    $(document).on("submit", "#members", handleMemberFormSubmit);


    function handleMemberFormSubmit(event) {
      event.preventDefault();
      if (!nameInput.val().trim()) {
        alert("Please sign in with your name.")
        return;
      }
      upsertMember({
        name: nameInput
          .val()
          .trim()
      });
      window.location.href = "/post";
    }

    function upsertMember(memberData) {
      $.post("/api/members", memberData)
    }

  });
