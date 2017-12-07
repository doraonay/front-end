$(function () {

  $("#navbarToggle").blur(function (event) { //herhangi bir yere basınca kapanması fonksiyonu
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // Firefox ve Safari focus'u buttonda tutmaya devam etmedigi
  // icin blur event handler'i cagirmiyor. Force focus uygulayarak
  // focusun buttonda kalmasi saglaniyor
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });

});


(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";

var egitimJSON = "data/egitim.json";
var egitimTitleHtml = "snippets/egitim-title-snippet.html";
var egitimHTML = "snippets/egitim-snippet.html";

var semesterJSON = "data/semester.json";
var semesterTitleHtml = "snippets/semester-title-snippet.html";
var semesterHTML = "snippets/semester-snippet.html";

var personelJSON = "data/personel.json";
var personelTitleHtml = "snippets/personel-category-title-snippet.html";
var personelHTML = "snippets/personel-category-snippet.html";

var personelIcerikJSON = "data/"; //tek farklı olan bu
var personelIcerikTitleHtml = "snippets/personel-icerik-title.html";
var personelIcerikHTML = "snippets/personel-icerik.html";


// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html); //selector ekrana basılcak şey yeni htmli gönder
};

var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);
});

// Load the menu categories view
dc.loadMenuCategories = function () { //eğitim kutucukları lisans yüksek lisans
  showLoading("#main-content"); //yavaş yüklenirse loading kutucuğunu söylersin
  $ajaxUtils.sendGetRequest(
    egitimJSON, //bilgileri burdan cekiyorum
    buildAndShowCategoriesHTML);
};

// Load the personel icerik view
dc.loadPersonelIcerik = function (category) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    personelIcerikJSON + category + ".json",// data + ogretim uyesi+json
    buildAndShowPersonelIcerikHTML);
};

// Builds HTML for the single category page based on the data
// from the server
function buildAndShowPersonelIcerikHTML (categoryPersonelIcerik) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    personelIcerikTitleHtml, //ilk requestte başlık
    function (personelIcerikTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        personelIcerikHTML, //ikinci requestte icerik
        function (personelIcerikHTML) {
          var personelIcerikViewHtml =
            buildPersonelIcerikViewHtml(categoryPersonelIcerik,
                                   personelIcerikTitleHtml,
                                   personelIcerikHTML);
          insertHtml("#main-content", personelIcerikViewHtml);
        },
        false);
    },
    false);
}

// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildPersonelIcerikViewHtml(categoryPersonelIcerik,
                                personelIcerikTitleHtml,
                                personelIcerikHTML) {

  

  var finalHtml = personelIcerikTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over personel icerik

  for (var i = 0; i < categoryPersonelIcerik.length; i++) {
    // Insert personel icerik values
    var html = personelIcerikHTML;

    html =
      insertProperty(html,
                     "ad",
                     categoryPersonelIcerik[i].ad); //okudugun elemanın adını al

      html =
      insertProperty(html,
                     "mail",
                     categoryPersonelIcerik[i].mail); //okudugun elemanın mailini al

    // Add clearfix after every second menu item (discription icin?)
    if (i % 2 != 0) {
      html +=
        "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) { //json dosyasından okuduğum bilgiler categories
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    egitimTitleHtml,
    function (egitimTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        egitimHTML,
        function (egitimHTML) { //egitim-snippet
          var categoriesViewHtml = //168de main contente basıyor ***return final html buraya geliyor
            buildCategoriesViewHtml(categories,
                                    egitimTitleHtml,
                                    egitimHTML);
          insertHtml("#main-content", categoriesViewHtml); //donen final htmli ekrana bastık
        },
        false);
    },
    false);
}

// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 egitimTitleHtml,
                                 egitimHTML) {

  var finalHtml = egitimTitleHtml; //header
  finalHtml += "<section class='row'>"; 

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values jsondan olusturduk diziye atar gibi bilileri tutuyoruz
    var html = egitimHTML; //egitimhtmli bozmamak için
    var program = "" + categories[i].program; //egitim.json dosyasındaki programlar Lisans Yüksek Lisans
    html =
      insertProperty(html, "program", program);
      
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

// Load the semester categories view
dc.loadSemesterCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    semesterJSON,
    buildAndShowSemestersHTML);
};

// Builds HTML for the semester page based on the data
// from the server
function buildAndShowSemestersHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    semesterTitleHtml,
    function (semesterTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        semesterHTML,
        function (semesterHTML) {
          var semestersViewHtml =
            buildSemestersViewHtml(categories,
                                    semesterTitleHtml,
                                    semesterHTML);
          insertHtml("#main-content", semestersViewHtml);
        },
        false);
    },
    false);
}

// Using semesters data and snippets html
// build semesters view HTML to be inserted into page
function buildSemestersViewHtml(categories,
                                 semesterTitleHtml,
                                 semesterHTML) {

  var finalHtml = semesterTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = semesterHTML;
    var semester = "" + categories[i].semester;
    html =
      insertProperty(html, "semester", semester);
      
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

// Load the personel categories view
dc.loadPersonelCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    personelJSON,
    buildAndShowPersonelHTML);
};

// Builds HTML for the semester page based on the data
// from the server
function buildAndShowPersonelHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    personelTitleHtml,
    function (personelTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        personelHTML,
        function (personelHTML) {
          var personelViewHtml =
            buildPersonelViewHtml(categories,
                                    personelTitleHtml,
                                    personelHTML);
          insertHtml("#main-content", personelViewHtml);
        },
        false);
    },
    false);
}

// Using semesters data and snippets html
// build semesters view HTML to be inserted into page
function buildPersonelViewHtml(categories,
                                 personelTitleHtml,
                                 personelHTML) {

  var finalHtml = personelTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = personelHTML;
    var personel = "" + categories[i].personel;
    html =
      insertProperty(html, "personel", personel);
      
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}



global.$dc = dc;

})(window);