$(document).ready(function() {
  makeRequest();
  $("#search-form").on("submit", function(e) {
    e.preventDefault();
    var object = $(e.target);
    var queryObject = $("input[name='query']")
    var intitle = queryObject.val()
    queryObject.val("")
    makeRequest({intitle: intitle});
  });
});

function makeRequest(data = {}) {
  $.ajax({
    method: "get",
    url: buildSearchUrl(data)
  }).done(function(r) {
    updateDom(r.items)
  }).fail(function(r) {
    console.log(r);
  });
}

function buildSearchUrl(data) {
  var url = "https://api.stackexchange.com/2.2/search?"
  var defaults = {"order": "desc",
                 "sort": "relevance",
                 "intitle": "ruby",
                 "site": "stackoverflow",
                 "filter": "!.J-EvFw7eWtxYyPGh4gccPvu)8td4"
                }
  data.order = data.order || defaults.order
  data.sort = data.sort || defaults.sort
  data.intitle = data.intitle || defaults.intitle
  data.site = data.site || defaults.site
  data.filter = data.filter || defaults.filter
  for (option in data) {
    var str = option + '=' + data[option] + '&'
    url += str
  }
  url = url.substring(0, url.length-1);
  return url
}

function updateDom(items) {
  $("#results").html("");
  items.forEach(function(item) {
    var question = buildQuestionElement(item)
    appendResult(question)
  });
}

function buildQuestionElement(item) {
  var $div = $("<div>", {"class": "response"});
  var $title = $("<h3>", {"class": "question-title"}).html(item.title);
  var $body = $("<p>", {"class": "question-body"}).html(item.body);
  $div.append($title).append($body)
  return $div
}

function appendResult(element) {
  $("#results").append(element)
}
