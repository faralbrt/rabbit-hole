$(document).ready(function() {
  $.ajax({
    method: "get",
    url: "https://api.stackexchange.com//2.2/search?order=desc&sort=relevance&intitle=Shortest%20way%20to%20write%20ternary%20in%20Ruby%20that%20returns%20other%20value%20for%20nil?&site=stackoverflow&filter=!.J-EvFw7eWtxYyPGh4gccPvu)8td4"
  }).done(function(r) {
    updateDom(r.items)
  }).fail(function(r) {
    console.log(r);
  });
});

function buildSearchUrl(data) {
  var url = "https://api.stackexchange.com/2.2/search?"
  var defaults = {"order": "desc",
                 "sort": "relevance",
                 "intitle": "ruby on rails generate controller",
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
