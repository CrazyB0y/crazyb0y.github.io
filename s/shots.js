$( document ).ready(function() {
  $(".imageContainer").on("error", function() { 
    $(this).off("load"); 
    showErrorDesc(); 
  });
  if (correctionURL())
  {
    let imageName = window.location.search.substring(1);
    if (imageName != null && imageName.length < 10)
    {
      showErrorDesc("Wrong image link :C");
    }
    else
    {
      let imageURL = getImageURL(imageName);
      $(".imageContainer").attr("src", imageURL)
      .on("load", function() {
        showImageDesc(imageName);
      });
    }
  }
});

function showImageDesc(imageName)
{
  $(".errorDesc").hide();
  $(".imageContainer").hide();
  $(".imageContainer").fadeIn(500);
  $(".imageDesc").text(imageName);
  $(".imageDesc").show();
  window.history.replaceState("", 'Cr1zyB0y Shots - ' + imageName, window.location.href);
  copyToClipboard(window.location.href);
}

function showErrorDesc(errorText = "This image is not exists :C")
{
  $(".imageDesc").hide();
  $(".imageContainer").attr("src","error.png");
  $(".errorDesc").show();
  $(".errorText").text(errorText);
}

function getImageURL(imageName)
{
  let URLDirect = "https://getfile.dokpub.com/yandex/get/";
  let URLPublicFolder = "https://yadi.sk/d/kfF2S0r0W3zFKw/";
  let combinedURL = URLDirect.concat(URLPublicFolder, imageName);
  return combinedURL;
}

function correctionURL()
{
  let fstSymbols = window.location.search.substring(1,2);
  if (fstSymbols != "/") return true;
  let newURL = window.location.origin.concat(window.location.pathname,"?",window.location.search.substring(2));
  window.location.href = newURL;
  return false;      
}

function copyToClipboard(text)
{
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.hide();
  $temp.remove();
}