$(window).on('load', function() {
  //global variables
  const popupDiv = $('[data-id="popup"]');
  const popupCloseButton = $('[data-id="close-button"]');
  const bodyOverlayDiv = $('[data-id="body-overlay"]');
  const agreeButton = $('[data-id="agree-button"]');

  const cookie = {
    setCookie(name, value, days) {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (
      value || "") + expires + "; path=/";
    },

    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    checkIfCookieIsSet(isPopupCookieSet) {
      if (isPopupCookieSet == '') {
        setCookie('popup-privacy', 'true', 30);
        openPrivacyPopup();
      }
    }
  };

  const bodyOverlay = {
    hideOverlay(bodyOverlayDiv) {
      bodyOverlayDiv.removeClass('body-overlay');
    },

    showOverlay(bodyOverlayDiv) {
      bodyOverlayDiv.addClass('body-overlay');
    }
  };

  const popup = {
    openPopup(popupDiv) {
      popupDiv.css('display', 'block');
    },

    closePopup(popupDiv) {
      popupDiv.css('display', 'none');
    }
  };

  const isCookieSet = cookie.getCookie('popup-cookie');

  // app initializtion
  const app = {
    init() {
      if (isCookieSet === '') {
        cookie.setCookie('popup-cookie', 'is-set', 30);
        popup.openPopup(popupDiv);
        bodyOverlay.showOverlay(bodyOverlayDiv);
      } else {
        popup.closePopup(popupDiv);
        bodyOverlay.hideOverlay(bodyOverlayDiv);
      }
    }
  };

  // eventListeners
  popupCloseButton.on('click', function() {
    popup.closePopup(popupDiv);
    bodyOverlay.hideOverlay(bodyOverlayDiv);
  });

  agreeButton.on('click', function() {
    popup.closePopup(popupDiv);
    bodyOverlay.hideOverlay(bodyOverlayDiv);
  });

  app.init();
});


// Algorithm
// 1. Check if cookie is set
// 2. If cookie is not set
//    2.1. Set cookie
//    2.2. Open popup
//    2.3 Open body overlay
// 3. If cookie is set
//    3.1. Close popup
//    3.2 Hide body overlay
