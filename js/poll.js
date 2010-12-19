function pollSetup()
{
  // Hide polls in which we've already voted
  elements = document.getElementsByClassName("FormPoll");
  for (var i = 0; i<elements.length; i++) {
    pollID = $(elements[i]).id;
    if (pollReadCookie(pollID)) {
      pollHide(pollID);
    }
  }

  // Hide submit buttons
  elements = document.getElementsByClassName("submitButton");
  for (var i = 0; i<elements.length; i++) {
    elements[i].parentNode.remove(elements[i]);
  }
  
  // Show submit links
  elements = document.getElementsByClassName("submitLink");
  for (var i = 0; i<elements.length; i++) {
    elements[i].style.display="block";
  }
}

function pollVote(pollID)
{
  var selected = null;
  rows = $(pollID).getElements();
  for (var i=0;i<rows.length;i++) {
    if (rows[i].name == pollID && rows[i].checked) {
      selected = rows[i].value;
      break;
    }
  }
  
  new Ajax.Request("rpc/poll.php", { parameters:
    {
      poll:pollID,
      vote:selected
    },
    onSuccess:function(trans) { alert("OK"); },
    onFailure:function(trans) { alert("FAIL"); }
  });
  
  pollSetCookie(pollID,selected);
  
  pollHide(pollID);
}

function pollHide(pollID) {
  $(pollID).innerHTML = "<p class='Thanks'>Huzzah! Much appreciated.</p>";
}

function pollSetCookie(name,value)
{
  var days = 183;
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
  } 
  document.cookie = "POLL"+name+"POLL="+value+expires+"; path=/";
}

function pollReadCookie(name)
{
  var cookies = " "+document.cookie;
  if (cookies.indexOf("POLL"+name+"POLL=")>0)
    return true;
  return false;
}