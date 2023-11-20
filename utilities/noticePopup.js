var popupOverlay;

$(document).ready(function() {
    // CSS styles
    const styles = `
      #popupNoticeoverlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        text-align: center;
        z-index: 1000;
      }
  
      #popupNoticepopup {
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        width: 20%;
        margin: 0 auto;
        margin-top: 30vh
      }
  
      #popupNoticecloseBtn {
        background-color: #4caf50;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
      .popupNoticepopupContent{
        font-size: 20px;
        position: relative;
        bottom: 4vh
      }
    `;
  
    // Create a style element and append it to the head
    const styleElement = $('<style></style>').text(styles);
    $('head').append(styleElement);
  
    // Create and append the overlay and popup elements
    popupOverlay = $('<div id="popupNoticeoverlay"></div>').hide();
    const popup = $('<div id="popupNoticepopup"></div>').appendTo(popupOverlay);
  
    // Add content to the popup
    popup.append('<h2 class = "popupNoticepopupTitle">Popup Title</h2>');
    popup.append('<p class = "popupNoticepopupContent">Popup Content goes here.</p>');
    popup.append('<button id="popupNoticecloseBtn">OK</button>');
  
    // Append the overlay to the body
    popupOverlay.appendTo('body');
  
    // Show the popup when the "Show Popup" button is clicked
    // $(document).on('click', '#showPopupBtn', function() {
    //   overlay.fadeIn();
    // });
  
    // Close the popup when the "Close Popup" button is clicked
    $(document).on('click', '#popupNoticecloseBtn', function() {
        popupOverlay.fadeOut();
    });
  });
  
  function showPopup(title, content){
    $('.popupNoticepopupTitle').text(title);
    $('.popupNoticepopupContent').text(content);
    popupOverlay.fadeIn();
  }

