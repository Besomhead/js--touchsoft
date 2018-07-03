/* eslint-disable */

var config = {
    chatTitle: "Чат",
    chatState: "",
    userName: "",
    chatURL: "https://besomhead-chat.firebaseio.com/",
    cssClass: "chat-container",
    position: "right",
    allowMinimize: "true",
    allowDrag: "false",
    requireName: "false",
    showDateTime: "true",
    requests: "fetch",
    messagesLength: "0"
  },
  DM = (function() {
    return (
      (this.getDOMElement = function(e) {
        return "string" == typeof e ? document.getElementById(e) : e;
      }),
      (this.getDOMChildrenByTag = function(e, t) {
        return Array.from(this.getDOMElement(e).getElementsByTagName(t));
      }),
      (this.getDOMChildrenByClass = function(e, t) {
        return Array.from(this.getDOMElement(e).getElementsByClassName(t));
      }),
      (this.createDOMElement = document.createElement.bind(document)),
      (this.appendDOMElement = function(e, t) {
        this.getDOMElement(e).appendChild(t);
      }),
      (this.removeDOMElement = function(e, t) {
        this.getDOMElement(e).removeChild(this.getDOMElement(t));
      }),
      (this.addListener = function(e, t, n) {
        this.getDOMElement(e).addEventListener(t, n);
      }),
      (this.removeListener = function(e, t, n) {
        this.getDOMElement(e).removeEventListener(t, n);
      }),
      (this.addCSSClass = function(t) {
        var n = this;
        Array.from(arguments)
          .slice(1)
          .forEach(function(e) {
            n.getDOMElement(t).classList.add(e);
          });
      }),
      (this.removeCSSClass = function(e, t) {
        this.getDOMElement(e).classList.remove(t);
      }),
      this
    );
  })(),
  messageFactory = (function() {
    function a(e, t, n) {
      var a, s, r;
      (this.day = e.getDate()),
        (this.month = e.getMonth()),
        (this.time = ((s = (a = e).getHours()),
        (r = a.getMinutes()),
        (s < 10 ? "0" : "")
          .concat(s.toString())
          .concat(":")
          .concat(r < 10 ? "0" : "")
          .concat(r.toString()))),
        (this.sender = t),
        (this.body = n);
    }
    return (
      (this.getMessage = function(e, t, n) {
        return new a(e, t, n);
      }),
      this
    );
  })(),
  HTTP_GET = "GET",
  HTTP_POST = "POST",
  HTTP_PUT = "PUT",
  REQUEST_FETCH = "fetch",
  REQUEST_XHR = "xhr",
  storageManager = (function(i) {
    function c(e) {
      return i.chatURL + e + ".json";
    }
    function l(e, t, n) {
      return fetch(
        c(e),
        ((a = t),
        (s = n),
        (r = {
          method: a,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }),
        a !== HTTP_GET && (r.body = JSON.stringify(s)),
        r)
      )
        .then(function(e) {
          return e.json();
        })
        .then(function(e) {
          return e;
        });
      var a, s, r;
    }
    return (
      (this.sendRequestToStorage = function(e, t, n) {
        var a, s, r, o;
        return (
          i.requests === REQUEST_FETCH
            ? (a = l(e, t, n))
            : i.requests === REQUEST_XHR &&
              ((s = e),
              (r = t),
              (o = n),
              (a = new Promise(function(e, t) {
                var n = new XMLHttpRequest();
                n.open(r, c(s), !0),
                  n.setRequestHeader("Accept", "application/json"),
                  n.setRequestHeader("Content-Type", "application/json"),
                  n.addEventListener("load", function() {
                    e(JSON.parse(n.response));
                  }),
                  n.addEventListener("error", function() {
                    t(n.statusText);
                  }),
                  n.send(JSON.stringify(o));
              }))),
          a
        );
      }),
      this
    );
  })(config),
  chatFactory = (function(i) {
    var t = "chat-user-id",
      a = "chat-collapsed",
      r = "chat-expanded",
      d = "chat",
      s = "chat-messages",
      o = "chat-input-box",
      c = "chat-input-txt",
      l = "chat-message-button",
      u = "chat-toggle-button",
      M = "[ ]",
      m = "-",
      D = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ],
      h = 15e3,
      e = "Вы",
      g = "userName",
      n = "chatState",
      p = "messages",
      f = "read",
      E = "chat-username-prompt-container",
      S = "chat-username-prompt-input",
      T = "chat-username-prompt-button",
      O = 1e3;
    function C(e) {
      return localStorage.getItem(t) + "/" + e;
    }
    function v(e) {
      (i.chatState = e), storageManager.sendRequestToStorage(C(n), HTTP_PUT, e);
    }
    function y(e, t) {
      var n = DM.createDOMElement("div");
      (n.innerHTML = t), DM.appendDOMElement(e, n);
    }
    function L(e, t) {
      var n, a, s, r, o;
      (n = d
        .concat("-")
        .concat(t.day)
        .concat("-")
        .concat(t.month)),
        null === DM.getDOMElement(n) &&
          (((a = DM.createDOMElement("div")).id = n),
          DM.addCSSClass(a, "chat-messages-container"),
          "true" === i.showDateTime
            ? (DM.addCSSClass(a, "chat-messages-container-with-time"),
              (s = e),
              (r = t),
              ((o = DM.createDOMElement("legend")).innerHTML = r.day
                .toString()
                .concat(" ")
                .concat(D[+r.month])),
              DM.addCSSClass(o, "chat-day-of-month"),
              DM.appendDOMElement(s, o))
            : "false" === i.showDateTime &&
              DM.addCSSClass(a, "chat-messages-container-no-time"),
          DM.appendDOMElement(e, a)),
        (a = DM.getDOMElement(n)),
        "true" === i.showDateTime && y(a, t.time),
        y(a, t.sender),
        y(a, t.body);
    }
    function b() {
      var a,
        e = DM.createDOMElement("div");
      (e.id = s),
        DM.addCSSClass(e, "chat-messages-external"),
        DM.appendDOMElement(d, e),
        (a = e),
        storageManager
          .sendRequestToStorage(C(p), HTTP_GET, "")
          .then(function(e) {
            var t, n;
            if (e)
              for (
                n = Object.keys(e), i.messagesLength = n.length, t = 0;
                t < n.length;
                t += 1
              )
                L(a, e[n[t]]);
          });
    }
    function H() {
      storageManager.sendRequestToStorage(C(p), HTTP_GET, "").then(function(t) {
        var e = Object.keys(t).slice(1);
        t &&
          (i.messagesLength >= e.length ||
            (e.slice(i.messagesLength).forEach(function(e) {
              L(DM.getDOMElement(s), t[e]);
            }),
            (i.messagesLength = e.length)));
      });
    }
    function w() {
      var e,
        t,
        n = DM.getDOMElement(c);
      "" !== n.value &&
        ((e = messageFactory.getMessage(
          new Date(),
          i.userName.concat(":"),
          n.value
        )),
        (n.value = ""),
        L(DM.getDOMElement(s), e),
        (t = e),
        storageManager.sendRequestToStorage(C(p), HTTP_POST, t),
        storageManager.sendRequestToStorage(C(f), HTTP_PUT, !1),
        setInterval(H, h));
    }
    function R() {
      var e;
      return (
        "left" === i.position
          ? (e = "chat-container-left")
          : "right" === i.position && (e = "chat-container-right"),
        e
      );
    }
    function N(e) {
      (DM.getDOMElement(c).disabled = !e),
        (DM.getDOMElement(l).disabled = !e),
        null !== DM.getDOMElement(u) && (DM.getDOMElement(u).disabled = !e);
    }
    function P() {
      var e, t, n, a;
      (e = DM.createDOMElement("div")),
        (t = DM.createDOMElement("label")),
        (n = DM.createDOMElement("input")),
        (a = DM.createDOMElement("button")),
        (e.id = E),
        DM.addCSSClass(e, "chat-prompt-container", R()),
        (n.id = S),
        DM.addCSSClass(n, "chat-prompt-input"),
        (t.for = n.id),
        (t.innerHTML = "Пожалуйста, представьтесь:"),
        (a.id = T),
        DM.addCSSClass(a, "chat-prompt-button"),
        (a.innerHTML = "Сохранить"),
        DM.appendDOMElement(e, t),
        DM.appendDOMElement(e, n),
        DM.appendDOMElement(e, a),
        DM.appendDOMElement(d, e),
        N(!1),
        DM.addListener(T, "click", function() {
          var e = DM.getDOMElement(S).value;
          e.length < 1 ||
            ((i.userName = e),
            DM.removeDOMElement(d, E),
            N(!0),
            storageManager.sendRequestToStorage(C(g), HTTP_PUT, i.userName));
        });
    }
    function q() {
      storageManager.sendRequestToStorage(C(g), HTTP_GET, "").then(function(e) {
        i.userName = e;
      }),
        setTimeout(function() {
          (null !== i.userName && void 0 !== i.userName && "" !== i.userName) ||
            ("true" === i.requireName
              ? P()
              : ((i.userName = e),
                storageManager.sendRequestToStorage(
                  C(g),
                  HTTP_PUT,
                  i.userName
                )));
        }, O);
    }
    function U() {
      var e, t, n;
      DM.removeCSSClass(d, a),
        DM.addCSSClass(d, r),
        "true" === i.allowMinimize && (DM.getDOMElement(u).innerHTML = m),
        b(),
        (e = DM.createDOMElement("div")),
        (t = DM.createDOMElement("textarea")),
        (n = DM.createDOMElement("button")),
        (e.id = o),
        DM.addCSSClass(e, "chat-input-container"),
        (t.id = c),
        DM.addCSSClass(t, "chat-input-textarea"),
        DM.appendDOMElement(e, t),
        (n.id = l),
        DM.addCSSClass(n, "chat-message-button"),
        (n.innerHTML = "Отправить"),
        DM.addListener(n, "click", w),
        DM.appendDOMElement(e, n),
        DM.appendDOMElement(d, e),
        ("" !== i.userName && null !== i.userName && void 0 !== i.userName) ||
          q(),
        v(r);
    }
    function _() {
      storageManager.sendRequestToStorage(C(n), HTTP_GET, "").then(function(e) {
        i.chatState = e;
      }),
        setTimeout(function() {
          null === i.chatState || void 0 === i.chatState || "" === i.chatState
            ? v(a)
            : i.chatState === r && U(),
            DM.addCSSClass(d, i.chatState);
        }, O);
    }
    function k() {
      switch (i.chatState) {
        case a:
          U();
          break;
        case r:
          DM.removeCSSClass(d, r),
            DM.addCSSClass(d, a),
            (DM.getDOMElement(u).innerHTML = M),
            DM.removeDOMElement(d, s),
            DM.removeDOMElement(d, o),
            v(a);
          break;
        default:
          throw new Error(
            "Unexpected key/value pair: " + d + "/" + i.chatState
          );
      }
    }
    function x(l) {
      DM.addListener(l, "mousedown", function(e) {
        var t,
          n,
          a,
          s = DM.getDOMElement(d),
          r = {
            top: (t = s.getBoundingClientRect()).top + window.pageYOffset,
            left: t.left + window.pageXOffset
          },
          o = e.pageX - r.left,
          i = e.pageY - r.top;
        function c(e) {
          (s.style.left = e.pageX - o + "px"),
            (s.style.top = e.pageY - i + "px");
        }
        "BUTTON" !== e.target.tagName &&
          ((n = function(e) {
            c(e);
          }),
          (a = function() {
            DM.removeListener(document, "mousemove", n),
              DM.removeListener(l, "mouseup", a);
          }),
          c(e),
          DM.addListener(document, "mousemove", n),
          DM.addListener(l, "mouseup", a));
      }),
        DM.addListener(l, "dragstart", function() {
          return !1;
        });
    }
    return (
      (this.appendStylesheet = function() {
        var e = DM.createDOMElement("link");
        (e.rel = "stylesheet"),
          (e.type = "text/css"),
          (e.href =
            "https://rawgit.com/Besomhead/js--touchsoft/besomhead-task05/task-05/Besomhead/build/css/chat_styles.css"),
          DM.appendDOMElement(document.head, e);
      }),
      (this.createChatMarkup = function() {
        var e,
          t,
          n = DM.createDOMElement("fieldset"),
          a = DM.createDOMElement("legend"),
          s = DM.createDOMElement("div");
        (n.id = d),
          DM.addCSSClass(n, "chat-container", R(), i.cssClass),
          (a.innerHTML = i.chatTitle),
          DM.addCSSClass(a, "chat-legend"),
          n.appendChild(a),
          DM.addCSSClass(s, "chat-toggle-button-container"),
          "true" === i.allowDrag &&
            (DM.addCSSClass(s, "chat-toggle-button-container-drag"), x(s)),
          "true" === i.allowMinimize
            ? ((e = s),
              (t = DM.createDOMElement("button")),
              DM.addCSSClass(t, u),
              (t.id = u),
              (t.innerHTML = i.chatState === r ? m : M),
              DM.addListener(t, "click", k),
              DM.appendDOMElement(e, t))
            : "false" === i.allowMinimize && v(r),
          DM.appendDOMElement(n, s),
          DM.appendDOMElement(document.body, n),
          _();
      }),
      (this.setConfig = function() {
        var e,
          t,
          n = (e = document.currentScript.src)
            .substr(e.indexOf("?") + 1)
            .split("&")
            .reduce(function(e, t) {
              var n = t.split("="),
                a = decodeURIComponent(n[1]);
              return (
                (e[decodeURIComponent(n[0])] = a.substr(1, a.length - 2)), e
              );
            }, {});
        Object.keys(n).forEach(function(e) {
          "" !== (t = n[e]) && (i[e] = t);
        });
      }),
      (this.setUniqueUserID = function() {
        null === localStorage.getItem(t) &&
          localStorage.setItem(t, "user".concat(Date.now().toString()));
      }),
      this
    );
  })(config);
window.addEventListener("load", function() {
  chatFactory.appendStylesheet(),
    chatFactory.setUniqueUserID(),
    chatFactory.createChatMarkup();
}),
  chatFactory.setConfig();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiY29uZmlnIiwiY2hhdFRpdGxlIiwiY2hhdFN0YXRlIiwidXNlck5hbWUiLCJjaGF0VVJMIiwiY3NzQ2xhc3MiLCJwb3NpdGlvbiIsImFsbG93TWluaW1pemUiLCJhbGxvd0RyYWciLCJyZXF1aXJlTmFtZSIsInNob3dEYXRlVGltZSIsInJlcXVlc3RzIiwibWVzc2FnZXNMZW5ndGgiLCJETSIsInRoaXMiLCJnZXRET01FbGVtZW50IiwiaWR0ZiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRET01DaGlsZHJlbkJ5VGFnIiwicm9vdCIsInRhZyIsIkFycmF5IiwiZnJvbSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiZ2V0RE9NQ2hpbGRyZW5CeUNsYXNzIiwiY2xhc3NOYW1lIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNyZWF0ZURPTUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYmluZCIsImFwcGVuZERPTUVsZW1lbnQiLCJlbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVET01FbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJhZGRMaXN0ZW5lciIsImV2ZW50IiwiY2FsbGJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkQ1NTQ2xhc3MiLCJzZWxmIiwiYXJndW1lbnRzIiwic2xpY2UiLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlQ1NTQ2xhc3MiLCJyZW1vdmUiLCJtZXNzYWdlRmFjdG9yeSIsIk1lc3NhZ2UiLCJkYXRlIiwic2VuZGVyIiwiYm9keSIsImhvdXJzIiwibWludXRlcyIsImRheSIsImdldERhdGUiLCJtb250aCIsImdldE1vbnRoIiwidGltZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImNvbmNhdCIsInRvU3RyaW5nIiwiZ2V0TWVzc2FnZSIsIkhUVFBfR0VUIiwiSFRUUF9QT1NUIiwiSFRUUF9QVVQiLCJSRVFVRVNUX0ZFVENIIiwiUkVRVUVTVF9YSFIiLCJzdG9yYWdlTWFuYWdlciIsImdldFN0b3JhZ2VQYXRoIiwiZXh0cmFQYXRoIiwic2VuZFJlcXVlc3RUb1N0b3JhZ2VCeUZldGNoIiwicmVxdWVzdE1ldGhvZCIsImRhdGEiLCJmZXRjaCIsImNvbmZpZ09iaiIsIm1ldGhvZCIsImhlYWRlcnMiLCJBY2NlcHQiLCJDb250ZW50LVR5cGUiLCJKU09OIiwic3RyaW5naWZ5IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3BvbnNlRGF0YSIsInNlbmRSZXF1ZXN0VG9TdG9yYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwicGFyc2UiLCJzdGF0dXNUZXh0Iiwic2VuZCIsImNoYXRGYWN0b3J5IiwiVVNFUl9JRCIsIkNPTExBUFNFRCIsIkVYUEFOREVEIiwiQ0hBVF9JVEVNIiwiTUVTU0FHRVNfTElTVCIsIklOUFVUX0JPWCIsIklOUFVUX1RFWFQiLCJDSEFUX01FU1NBR0VfQlVUVE9OX0lEIiwiVE9HR0xFX0JVVFRPTiIsIkVYUEFORF9NQVJLIiwiQ09MTEFQU0VfTUFSSyIsIm1vbnRocyIsIlJFUExZX1RJTUVPVVQiLCJERUZBVUxUX1VTRVJfTkFNRSIsIlVTRVJfTkFNRV9GSUVMRCIsIkNIQVRfU1RBVEVfRklFTEQiLCJNRVNTQUdFU19GSUVMRCIsIlJFQURfRklFTEQiLCJVU0VSX05BTUVfUFJPTVBUX0lEIiwiUFJPTVBUX0lOUFVUX0lEIiwiUFJPTVBUX0NPTkZJUk1fQlVUVE9OX0lEIiwiUkVRVUVTVF9USU1FT1VUIiwiZ2V0RXh0cmFQYXRoIiwicGF0aCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzYXZlQ2hhdFN0YXRlVG9TdG9yYWdlIiwic3RhdGUiLCJhcHBlbmRNZXNzYWdlUGFydCIsImNvbnRhaW5lciIsImlubmVySFRNTCIsImVsIiwiYXBwZW5kU2luZ2xlTWVzc2FnZSIsIm1lc3NhZ2UiLCJjb250YWluZXJJZCIsIm1lc3NhZ2VzQ29udGFpbmVyIiwiZGF5T2ZNb250aCIsImlkIiwiYXBwZW5kTWVzc2FnZXNMaXN0IiwibWVzc2FnZXNMaXN0Q29udGFpbmVyIiwia2V5SW5kZXgiLCJtZXNzYWdlc0tleXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwidXBkYXRlTWVzc2FnZXNMaXN0Iiwia2V5Iiwic2VuZE1lc3NhZ2UiLCJpbnB1dFRleHRBcmVhIiwidmFsdWUiLCJEYXRlIiwic2V0SW50ZXJ2YWwiLCJnZXRQb3NpdGlvbkNsYXNzIiwicG9zaXRpb25DbGFzcyIsInNldE90aGVyQ29tcG9uZW50c0F2YWlsYWJpbGl0eSIsImlzQXZhaWxhYmxlIiwiZGlzYWJsZWQiLCJhc2tVc2VyTmFtZSIsInByb21wdENvbnRhaW5lciIsInByb21wdExhYmVsIiwicHJvbXB0SW5wdXQiLCJwcm9tcHRDb25maXJtQnV0dG9uIiwiZm9yIiwic2V0VXNlck5hbWUiLCJzZXRUaW1lb3V0IiwidW5kZWZpbmVkIiwiZXhwYW5kQ2hhdCIsImlucHV0TWVzc2FnZUNvbnRhaW5lciIsIm1lc3NhZ2VCdXR0b24iLCJpbml0Q2hhdFN0YXRlIiwiY2hhbmdlQ2hhdFN0YXRlIiwiRXJyb3IiLCJzZXREcmFnSGFuZGxlciIsImJveCIsIm1vdXNlTW92ZUhhbmRsZXIiLCJtb3VzZVVwSGFuZGxlciIsImNoYXQiLCJjb29yZGluYXRlcyIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpbmRvdyIsInBhZ2VZT2Zmc2V0IiwibGVmdCIsInBhZ2VYT2Zmc2V0Iiwic2hpZnRYIiwicGFnZVgiLCJzaGlmdFkiLCJwYWdlWSIsIm1vdmVBdCIsImUiLCJzdHlsZSIsInRhcmdldCIsInRhZ05hbWUiLCJhcHBlbmRTdHlsZXNoZWV0Iiwic3R5bGVFbGVtZW50IiwicmVsIiwidHlwZSIsImhyZWYiLCJoZWFkIiwiY3JlYXRlQ2hhdE1hcmt1cCIsInRvZ2dsZUJ1dHRvbiIsImxlZ2VuZCIsInRvZ2dsZUJ1dHRvbkNvbnRhaW5lciIsInNldENvbmZpZyIsInNjcmlwdCIsInByb3BlcnR5VmFsdWUiLCJyZXF1ZXN0Q29uZmlnIiwiY3VycmVudFNjcmlwdCIsInNyYyIsInN1YnN0ciIsImluZGV4T2YiLCJzcGxpdCIsInJlZHVjZSIsInBhcmFtIiwicGFydHMiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzZXRVbmlxdWVVc2VySUQiLCJzZXRJdGVtIiwibm93Il0sIm1hcHBpbmdzIjoiQUFHQSxJQUFJQSxPQUFTLENBQ1hDLFVBQVcsTUFDWEMsVUFBVyxHQUNYQyxTQUFVLEdBQ1ZDLFFBQVMseUNBQ1RDLFNBQVUsaUJBQ1ZDLFNBQVUsUUFDVkMsY0FBZSxPQUNmQyxVQUFXLFFBQ1hDLFlBQWEsUUFDYkMsYUFBYyxPQUNkQyxTQUFVLFFBQ1ZDLGVBQWdCLEtBS2RDLEdBQUssV0F3Q1AsT0F2Q0FDLEtBQUtDLGNBQWdCLFNBQW9CQyxHQUN2QyxNQUF1QixpQkFBVEEsRUFBb0JDLFNBQVNDLGVBQWVGLEdBQVFBLEdBRXBFRixLQUFLSyxvQkFBc0IsU0FBOEJDLEVBQU1DLEdBQzdELE9BQU9DLE1BQU1DLEtBQUtULEtBQUtDLGNBQWNLLEdBQU1JLHFCQUFxQkgsS0FFbEVQLEtBQUtXLHNCQUF3QixTQUMzQkwsRUFDQU0sR0FFQSxPQUFPSixNQUFNQyxLQUNYVCxLQUFLQyxjQUFjSyxHQUFNTyx1QkFBdUJELEtBR3BEWixLQUFLYyxpQkFBbUJYLFNBQVNZLGNBQWNDLEtBQUtiLFVBQ3BESCxLQUFLaUIsaUJBQW1CLFNBQWdCWCxFQUFNWSxHQUM1Q2xCLEtBQUtDLGNBQWNLLEdBQU1hLFlBQVlELElBRXZDbEIsS0FBS29CLGlCQUFtQixTQUFnQmQsRUFBTVksR0FDNUNsQixLQUFLQyxjQUFjSyxHQUFNZSxZQUFZckIsS0FBS0MsY0FBY2lCLEtBRTFEbEIsS0FBS3NCLFlBQWMsU0FBMEJoQixFQUFNaUIsRUFBT0MsR0FDeER4QixLQUFLQyxjQUFjSyxHQUFNbUIsaUJBQWlCRixFQUFPQyxJQUVuRHhCLEtBQUsw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QVEsU0FBeUJ1RyxHQUVwQyxNQUR0QjJELEVBQWdCQyxFQUFjNUQsTUFFNUJySixFQUFPcUosR0FBTzJELE1BS3BCbE0sS0FBSzZNLGdCQUFrQixXQUNpQixPQUFsQzVGLGFBQWFDLFFBQVF6QixJQUN2QndCLGFBQWE2RixRQUFRckgsRUFBUyxPQUFPdEMsT0FBT3dGLEtBQUtvRSxNQUFNM0osY0FJcERwRCxLQWhlUyxDQWllZmQsUUFFSHVMLE9BQU9oSixpQkFBaUIsT0FBUSxXQUM5QitELFlBQVk4RixtQkFDWjlGLFlBQVlxSCxrQkFDWnJILFlBQVlvRyxxQkFHZHBHLFlBQVl3RyIsImZpbGUiOiJjaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXhwb3J0ZWQgY29uZmlnICovXHJcbi8qIGdsb2JhbCBjaGF0RmFjdG9yeSAqL1xyXG5cclxudmFyIGNvbmZpZyA9IHtcclxuICBjaGF0VGl0bGU6IFwi0KfQsNGCXCIsXHJcbiAgY2hhdFN0YXRlOiBcIlwiLFxyXG4gIHVzZXJOYW1lOiBcIlwiLFxyXG4gIGNoYXRVUkw6IFwiaHR0cHM6Ly9iZXNvbWhlYWQtY2hhdC5maXJlYmFzZWlvLmNvbS9cIixcclxuICBjc3NDbGFzczogXCJjaGF0LWNvbnRhaW5lclwiLFxyXG4gIHBvc2l0aW9uOiBcInJpZ2h0XCIsXHJcbiAgYWxsb3dNaW5pbWl6ZTogXCJ0cnVlXCIsXHJcbiAgYWxsb3dEcmFnOiBcImZhbHNlXCIsXHJcbiAgcmVxdWlyZU5hbWU6IFwiZmFsc2VcIixcclxuICBzaG93RGF0ZVRpbWU6IFwidHJ1ZVwiLFxyXG4gIHJlcXVlc3RzOiBcImZldGNoXCIsXHJcbiAgbWVzc2FnZXNMZW5ndGg6IFwiMFwiXHJcbn07XHJcblxyXG4vKiBleHBvcnRlZCBETSAqL1xyXG5cclxudmFyIERNID0gKGZ1bmN0aW9uIERPTU1hbmFnZXIoKSB7XHJcbiAgdGhpcy5nZXRET01FbGVtZW50ID0gZnVuY3Rpb24gZ2V0RWxlbWVudChpZHRmKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIGlkdGYgPT09IFwic3RyaW5nXCIgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHRmKSA6IGlkdGY7XHJcbiAgfTtcclxuICB0aGlzLmdldERPTUNoaWxkcmVuQnlUYWcgPSBmdW5jdGlvbiBnZXRDaGlsZHJlbkJ5VGFnTmFtZShyb290LCB0YWcpIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZ2V0RE9NRWxlbWVudChyb290KS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpKTtcclxuICB9O1xyXG4gIHRoaXMuZ2V0RE9NQ2hpbGRyZW5CeUNsYXNzID0gZnVuY3Rpb24gZ2V0Q2hpbGRyZW5CeUNsYXNzTmFtZShcclxuICAgIHJvb3QsXHJcbiAgICBjbGFzc05hbWVcclxuICApIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKFxyXG4gICAgICB0aGlzLmdldERPTUVsZW1lbnQocm9vdCkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpXHJcbiAgICApO1xyXG4gIH07XHJcbiAgdGhpcy5jcmVhdGVET01FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcclxuICB0aGlzLmFwcGVuZERPTUVsZW1lbnQgPSBmdW5jdGlvbiBhcHBlbmQocm9vdCwgZWxlbWVudCkge1xyXG4gICAgdGhpcy5nZXRET01FbGVtZW50KHJvb3QpLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH07XHJcbiAgdGhpcy5yZW1vdmVET01FbGVtZW50ID0gZnVuY3Rpb24gcmVtb3ZlKHJvb3QsIGVsZW1lbnQpIHtcclxuICAgIHRoaXMuZ2V0RE9NRWxlbWVudChyb290KS5yZW1vdmVDaGlsZCh0aGlzLmdldERPTUVsZW1lbnQoZWxlbWVudCkpO1xyXG4gIH07XHJcbiAgdGhpcy5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIocm9vdCwgZXZlbnQsIGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmdldERPTUVsZW1lbnQocm9vdCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xyXG4gIH07XHJcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIocm9vdCwgZXZlbnQsIGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmdldERPTUVsZW1lbnQocm9vdCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xyXG4gIH07XHJcbiAgdGhpcy5hZGRDU1NDbGFzcyA9IGZ1bmN0aW9uIGFkZENTU0NsYXNzKHJvb3QpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIEFycmF5LmZyb20oYXJndW1lbnRzKVxyXG4gICAgICAuc2xpY2UoMSlcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gYWRkQ2xhc3NlcyhjbGFzc05hbWUpIHtcclxuICAgICAgICBzZWxmLmdldERPTUVsZW1lbnQocm9vdCkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG4gIHRoaXMucmVtb3ZlQ1NTQ2xhc3MgPSBmdW5jdGlvbiByZW1vdmVDU1NDbGFzcyhyb290LCBjbGFzc05hbWUpIHtcclxuICAgIHRoaXMuZ2V0RE9NRWxlbWVudChyb290KS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcbi8qIGV4cG9ydGVkIG1lc3NhZ2VGYWN0b3J5ICovXHJcblxyXG52YXIgbWVzc2FnZUZhY3RvcnkgPSAoZnVuY3Rpb24gTWVzc2FnZUZhY3RvcnkoKSB7XHJcbiAgZnVuY3Rpb24gZ2V0Q3VycmVudFRpbWUoZGF0ZSkge1xyXG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgdmFyIG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICByZXR1cm4gKGhvdXJzIDwgMTAgPyBcIjBcIiA6IFwiXCIpXHJcbiAgICAgIC5jb25jYXQoaG91cnMudG9TdHJpbmcoKSlcclxuICAgICAgLmNvbmNhdChcIjpcIilcclxuICAgICAgLmNvbmNhdChtaW51dGVzIDwgMTAgPyBcIjBcIiA6IFwiXCIpXHJcbiAgICAgIC5jb25jYXQobWludXRlcy50b1N0cmluZygpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIE1lc3NhZ2UoZGF0ZSwgc2VuZGVyLCBib2R5KSB7XHJcbiAgICB0aGlzLmRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdGhpcy5tb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcclxuICAgIHRoaXMudGltZSA9IGdldEN1cnJlbnRUaW1lKGRhdGUpO1xyXG4gICAgdGhpcy5zZW5kZXIgPSBzZW5kZXI7XHJcbiAgICB0aGlzLmJvZHkgPSBib2R5O1xyXG4gIH1cclxuXHJcbiAgdGhpcy5nZXRNZXNzYWdlID0gZnVuY3Rpb24gZ2V0TWVzc2FnZShkYXRlLCBzZW5kZXIsIGJvZHkpIHtcclxuICAgIHJldHVybiBuZXcgTWVzc2FnZShkYXRlLCBzZW5kZXIsIGJvZHkpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG4vKiBleHBvcnRlZCBzdG9yYWdlTWFuYWdlciAqL1xyXG4vKiBleHBvcnRlZCBIVFRQX0dFVCBIVFRQX1BPU1QgSFRUUF9QVVQgKi9cclxuLyogZ2xvYmFsIGNvbmZpZyAqL1xyXG5cclxudmFyIEhUVFBfR0VUID0gXCJHRVRcIjtcclxudmFyIEhUVFBfUE9TVCA9IFwiUE9TVFwiO1xyXG52YXIgSFRUUF9QVVQgPSBcIlBVVFwiO1xyXG52YXIgUkVRVUVTVF9GRVRDSCA9IFwiZmV0Y2hcIjtcclxudmFyIFJFUVVFU1RfWEhSID0gXCJ4aHJcIjtcclxuXHJcbnZhciBzdG9yYWdlTWFuYWdlciA9IChmdW5jdGlvbiBTdG9yYWdlTWFuYWdlcihjb25maWcpIHtcclxuICBmdW5jdGlvbiBnZXRTdG9yYWdlUGF0aChleHRyYVBhdGgpIHtcclxuICAgIHJldHVybiBjb25maWcuY2hhdFVSTCArIGV4dHJhUGF0aCArIFwiLmpzb25cIjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJlcXVlc3RDb25maWdPYmoocmVxdWVzdE1ldGhvZCwgZGF0YSkge1xyXG4gICAgdmFyIGNvbmZpZ09iaiA9IHtcclxuICAgICAgbWV0aG9kOiByZXF1ZXN0TWV0aG9kLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChyZXF1ZXN0TWV0aG9kICE9PSBIVFRQX0dFVCkge1xyXG4gICAgICBjb25maWdPYmouYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb25maWdPYmo7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZW5kUmVxdWVzdFRvU3RvcmFnZUJ5RmV0Y2goZXh0cmFQYXRoLCByZXF1ZXN0TWV0aG9kLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXHJcbiAgICAgIGdldFN0b3JhZ2VQYXRoKGV4dHJhUGF0aCksXHJcbiAgICAgIGdldFJlcXVlc3RDb25maWdPYmoocmVxdWVzdE1ldGhvZCwgZGF0YSlcclxuICAgIClcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gZ2V0UmVzcG9uc2UocmVzcG9uc2UpIHtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihmdW5jdGlvbiBnZXRSZXNwb25zZURhdGEocmVzcG9uc2VEYXRhKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlRGF0YTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZW5kUmVxdWVzdFRvU3RvcmFnZUJ5WEhSKGV4dHJhUGF0aCwgbWV0aG9kLCBkYXRhKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gc2VuZFhIUlJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgZ2V0U3RvcmFnZVBhdGgoZXh0cmFQYXRoKSwgdHJ1ZSk7XHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xyXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gb25Mb2FkKCkge1xyXG4gICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gb25FcnJvcigpIHtcclxuICAgICAgICByZWplY3QoeGhyLnN0YXR1c1RleHQpO1xyXG4gICAgICB9KTtcclxuICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0aGlzLnNlbmRSZXF1ZXN0VG9TdG9yYWdlID0gZnVuY3Rpb24gc2VuZFJlcXVlc3RUb1N0b3JhZ2UoXHJcbiAgICBleHRyYVBhdGgsXHJcbiAgICBtZXRob2QsXHJcbiAgICBkYXRhXHJcbiAgKSB7XHJcbiAgICB2YXIgcmVzcG9uc2U7XHJcblxyXG4gICAgaWYgKGNvbmZpZy5yZXF1ZXN0cyA9PT0gUkVRVUVTVF9GRVRDSCkge1xyXG4gICAgICByZXNwb25zZSA9IHNlbmRSZXF1ZXN0VG9TdG9yYWdlQnlGZXRjaChleHRyYVBhdGgsIG1ldGhvZCwgZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5yZXF1ZXN0cyA9PT0gUkVRVUVTVF9YSFIpIHtcclxuICAgICAgcmVzcG9uc2UgPSBzZW5kUmVxdWVzdFRvU3RvcmFnZUJ5WEhSKGV4dHJhUGF0aCwgbWV0aG9kLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn0pKGNvbmZpZyk7XHJcbi8qIGV4cG9ydGVkIGNoYXRGYWN0b3J5ICovXHJcbi8qIGdsb2JhbCBjb25maWcgKi9cclxuLyogZ2xvYmFsIERNICovXHJcbi8qIGdsb2JhbCBtZXNzYWdlRmFjdG9yeSAqL1xyXG4vKiBnbG9iYWwgc3RvcmFnZU1hbmFnZXIgSFRUUF9HRVQgSFRUUF9QT1NUIEhUVFBfUFVUICovXHJcblxyXG52YXIgY2hhdEZhY3RvcnkgPSAoZnVuY3Rpb24gQ2hhdEZhY3RvcnkoY29uZmlnKSB7XHJcbiAgdmFyIFVTRVJfSUQgPSBcImNoYXQtdXNlci1pZFwiO1xyXG4gIHZhciBDT0xMQVBTRUQgPSBcImNoYXQtY29sbGFwc2VkXCI7XHJcbiAgdmFyIEVYUEFOREVEID0gXCJjaGF0LWV4cGFuZGVkXCI7XHJcbiAgdmFyIENIQVRfSVRFTSA9IFwiY2hhdFwiO1xyXG4gIHZhciBNRVNTQUdFU19MSVNUID0gXCJjaGF0LW1lc3NhZ2VzXCI7XHJcbiAgdmFyIElOUFVUX0JPWCA9IFwiY2hhdC1pbnB1dC1ib3hcIjtcclxuICB2YXIgSU5QVVRfVEVYVCA9IFwiY2hhdC1pbnB1dC10eHRcIjtcclxuICB2YXIgQ0hBVF9NRVNTQUdFX0JVVFRPTl9JRCA9IFwiY2hhdC1tZXNzYWdlLWJ1dHRvblwiO1xyXG4gIHZhciBUT0dHTEVfQlVUVE9OID0gXCJjaGF0LXRvZ2dsZS1idXR0b25cIjtcclxuICB2YXIgRVhQQU5EX01BUksgPSBcIlsgXVwiO1xyXG4gIHZhciBDT0xMQVBTRV9NQVJLID0gXCItXCI7XHJcbiAgdmFyIG1vbnRocyA9IFtcclxuICAgIFwi0Y/QvdCy0LDRgNGPXCIsXHJcbiAgICBcItGE0LXQstGA0LDQu9GPXCIsXHJcbiAgICBcItC80LDRgNGC0LBcIixcclxuICAgIFwi0LDQv9GA0LXQu9GPXCIsXHJcbiAgICBcItC80LDRj1wiLFxyXG4gICAgXCLQuNGO0L3Rj1wiLFxyXG4gICAgXCLQuNGO0LvRj1wiLFxyXG4gICAgXCLQsNCy0LPRg9GB0YLQsFwiLFxyXG4gICAgXCLRgdC10L3RgtGP0LHRgNGPXCIsXHJcbiAgICBcItC+0LrRgtGP0LHRgNGPXCIsXHJcbiAgICBcItC90L7Rj9Cx0YDRj1wiLFxyXG4gICAgXCLQtNC10LrQsNCx0YDRj1wiXHJcbiAgXTtcclxuICB2YXIgUkVQTFlfVElNRU9VVCA9IDE1MDAwO1xyXG4gIHZhciBQQVRIX1RPX1NUWUxFU0hFRVQgPVxyXG4gICAgXCJodHRwczovL3Jhd2dpdC5jb20vQmVzb21oZWFkL2pzLS10b3VjaHNvZnQvYmVzb21oZWFkLXRhc2swNS90YXNrLTA1L0Jlc29taGVhZC9idWlsZC9jc3MvY2hhdF9zdHlsZXMuY3NzXCI7XHJcbiAgdmFyIERFRkFVTFRfVVNFUl9OQU1FID0gXCLQktGLXCI7XHJcbiAgdmFyIFVTRVJfTkFNRV9GSUVMRCA9IFwidXNlck5hbWVcIjtcclxuICB2YXIgQ0hBVF9TVEFURV9GSUVMRCA9IFwiY2hhdFN0YXRlXCI7XHJcbiAgdmFyIE1FU1NBR0VTX0ZJRUxEID0gXCJtZXNzYWdlc1wiO1xyXG4gIHZhciBSRUFEX0ZJRUxEID0gXCJyZWFkXCI7XHJcbiAgdmFyIFVTRVJfTkFNRV9QUk9NUFRfSUQgPSBcImNoYXQtdXNlcm5hbWUtcHJvbXB0LWNvbnRhaW5lclwiO1xyXG4gIHZhciBQUk9NUFRfSU5QVVRfSUQgPSBcImNoYXQtdXNlcm5hbWUtcHJvbXB0LWlucHV0XCI7XHJcbiAgdmFyIFBST01QVF9DT05GSVJNX0JVVFRPTl9JRCA9IFwiY2hhdC11c2VybmFtZS1wcm9tcHQtYnV0dG9uXCI7XHJcbiAgdmFyIFJFUVVFU1RfVElNRU9VVCA9IDEwMDA7XHJcblxyXG4gIGZ1bmN0aW9uIGdldEV4dHJhUGF0aChwYXRoKSB7XHJcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oVVNFUl9JRCkgKyBcIi9cIiArIHBhdGg7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlQ2hhdFN0YXRlVG9TdG9yYWdlKHN0YXRlKSB7XHJcbiAgICBjb25maWcuY2hhdFN0YXRlID0gc3RhdGU7XHJcbiAgICBzdG9yYWdlTWFuYWdlci5zZW5kUmVxdWVzdFRvU3RvcmFnZShcclxuICAgICAgZ2V0RXh0cmFQYXRoKENIQVRfU1RBVEVfRklFTEQpLFxyXG4gICAgICBIVFRQX1BVVCxcclxuICAgICAgc3RhdGVcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjb2xsYXBzZUNoYXQoKSB7XHJcbiAgICBETS5yZW1vdmVDU1NDbGFzcyhDSEFUX0lURU0sIEVYUEFOREVEKTtcclxuICAgIERNLmFkZENTU0NsYXNzKENIQVRfSVRFTSwgQ09MTEFQU0VEKTtcclxuICAgIERNLmdldERPTUVsZW1lbnQoVE9HR0xFX0JVVFRPTikuaW5uZXJIVE1MID0gRVhQQU5EX01BUks7XHJcbiAgICBETS5yZW1vdmVET01FbGVtZW50KENIQVRfSVRFTSwgTUVTU0FHRVNfTElTVCk7XHJcbiAgICBETS5yZW1vdmVET01FbGVtZW50KENIQVRfSVRFTSwgSU5QVVRfQk9YKTtcclxuICAgIHNhdmVDaGF0U3RhdGVUb1N0b3JhZ2UoQ09MTEFQU0VEKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFwcGVuZE1lc3NhZ2VQYXJ0KGNvbnRhaW5lciwgaW5uZXJIVE1MKSB7XHJcbiAgICB2YXIgZWwgPSBETS5jcmVhdGVET01FbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGVsLmlubmVySFRNTCA9IGlubmVySFRNTDtcclxuICAgIERNLmFwcGVuZERPTUVsZW1lbnQoY29udGFpbmVyLCBlbCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhcHBlbmREYXRlTGVnZW5kKGNvbnRhaW5lciwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGRheU9mTW9udGggPSBETS5jcmVhdGVET01FbGVtZW50KFwibGVnZW5kXCIpO1xyXG5cclxuICAgIGRheU9mTW9udGguaW5uZXJIVE1MID0gbWVzc2FnZS5kYXlcclxuICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgLmNvbmNhdChcIiBcIilcclxuICAgICAgLmNvbmNhdChtb250aHNbK21lc3NhZ2UubW9udGhdKTtcclxuICAgIERNLmFkZENTU0NsYXNzKGRheU9mTW9udGgsIFwiY2hhdC1kYXktb2YtbW9udGhcIik7XHJcbiAgICBETS5hcHBlbmRET01FbGVtZW50KGNvbnRhaW5lciwgZGF5T2ZNb250aCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhcHBlbmRTaW5nbGVNZXNzYWdlKGNvbnRhaW5lciwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGNvbnRhaW5lcklkO1xyXG4gICAgdmFyIG1lc3NhZ2VzQ29udGFpbmVyO1xyXG5cclxuICAgIGNvbnRhaW5lcklkID0gQ0hBVF9JVEVNLmNvbmNhdChcIi1cIilcclxuICAgICAgLmNvbmNhdChtZXNzYWdlLmRheSlcclxuICAgICAgLmNvbmNhdChcIi1cIilcclxuICAgICAgLmNvbmNhdChtZXNzYWdlLm1vbnRoKTtcclxuICAgIGlmIChETS5nZXRET01FbGVtZW50KGNvbnRhaW5lcklkKSA9PT0gbnVsbCkge1xyXG4gICAgICBtZXNzYWdlc0NvbnRhaW5lciA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIG1lc3NhZ2VzQ29udGFpbmVyLmlkID0gY29udGFpbmVySWQ7XHJcbiAgICAgIERNLmFkZENTU0NsYXNzKG1lc3NhZ2VzQ29udGFpbmVyLCBcImNoYXQtbWVzc2FnZXMtY29udGFpbmVyXCIpO1xyXG4gICAgICBpZiAoY29uZmlnLnNob3dEYXRlVGltZSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICBETS5hZGRDU1NDbGFzcyhtZXNzYWdlc0NvbnRhaW5lciwgXCJjaGF0LW1lc3NhZ2VzLWNvbnRhaW5lci13aXRoLXRpbWVcIik7XHJcbiAgICAgICAgYXBwZW5kRGF0ZUxlZ2VuZChjb250YWluZXIsIG1lc3NhZ2UpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNvbmZpZy5zaG93RGF0ZVRpbWUgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgIERNLmFkZENTU0NsYXNzKG1lc3NhZ2VzQ29udGFpbmVyLCBcImNoYXQtbWVzc2FnZXMtY29udGFpbmVyLW5vLXRpbWVcIik7XHJcbiAgICAgIH1cclxuICAgICAgRE0uYXBwZW5kRE9NRWxlbWVudChjb250YWluZXIsIG1lc3NhZ2VzQ29udGFpbmVyKTtcclxuICAgIH1cclxuICAgIG1lc3NhZ2VzQ29udGFpbmVyID0gRE0uZ2V0RE9NRWxlbWVudChjb250YWluZXJJZCk7XHJcbiAgICBpZiAoY29uZmlnLnNob3dEYXRlVGltZSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgYXBwZW5kTWVzc2FnZVBhcnQobWVzc2FnZXNDb250YWluZXIsIG1lc3NhZ2UudGltZSk7XHJcbiAgICB9XHJcbiAgICBhcHBlbmRNZXNzYWdlUGFydChtZXNzYWdlc0NvbnRhaW5lciwgbWVzc2FnZS5zZW5kZXIpO1xyXG4gICAgYXBwZW5kTWVzc2FnZVBhcnQobWVzc2FnZXNDb250YWluZXIsIG1lc3NhZ2UuYm9keSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhcHBlbmRNZXNzYWdlcyhjb250YWluZXIpIHtcclxuICAgIHN0b3JhZ2VNYW5hZ2VyXHJcbiAgICAgIC5zZW5kUmVxdWVzdFRvU3RvcmFnZShnZXRFeHRyYVBhdGgoTUVTU0FHRVNfRklFTEQpLCBIVFRQX0dFVCwgXCJcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gc2hvd01lc3NhZ2VzSW5DaGF0KGRhdGEpIHtcclxuICAgICAgICB2YXIga2V5SW5kZXg7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2VzS2V5cztcclxuICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZXNLZXlzID0gT2JqZWN0LmtleXMoZGF0YSk7XHJcbiAgICAgICAgY29uZmlnLm1lc3NhZ2VzTGVuZ3RoID0gbWVzc2FnZXNLZXlzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGtleUluZGV4ID0gMDsga2V5SW5kZXggPCBtZXNzYWdlc0tleXMubGVuZ3RoOyBrZXlJbmRleCArPSAxKSB7XHJcbiAgICAgICAgICBhcHBlbmRTaW5nbGVNZXNzYWdlKGNvbnRhaW5lciwgZGF0YVttZXNzYWdlc0tleXNba2V5SW5kZXhdXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFwcGVuZE1lc3NhZ2VzTGlzdCgpIHtcclxuICAgIHZhciBtZXNzYWdlc0xpc3RDb250YWluZXIgPSBETS5jcmVhdGVET01FbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIG1lc3NhZ2VzTGlzdENvbnRhaW5lci5pZCA9IE1FU1NBR0VTX0xJU1Q7XHJcbiAgICBETS5hZGRDU1NDbGFzcyhtZXNzYWdlc0xpc3RDb250YWluZXIsIFwiY2hhdC1tZXNzYWdlcy1leHRlcm5hbFwiKTtcclxuICAgIERNLmFwcGVuZERPTUVsZW1lbnQoQ0hBVF9JVEVNLCBtZXNzYWdlc0xpc3RDb250YWluZXIpO1xyXG4gICAgYXBwZW5kTWVzc2FnZXMobWVzc2FnZXNMaXN0Q29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHVwZGF0ZU1lc3NhZ2VzTGlzdCgpIHtcclxuICAgIHN0b3JhZ2VNYW5hZ2VyXHJcbiAgICAgIC5zZW5kUmVxdWVzdFRvU3RvcmFnZShnZXRFeHRyYVBhdGgoTUVTU0FHRVNfRklFTEQpLCBIVFRQX0dFVCwgXCJcIilcclxuICAgICAgLnRoZW4oZnVuY3Rpb24gb25NZXNzYWdlc1JlY2VpdmVkKGRhdGEpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZXNLZXlzID0gT2JqZWN0LmtleXMoZGF0YSkuc2xpY2UoMSk7XHJcblxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLm1lc3NhZ2VzTGVuZ3RoID49IG1lc3NhZ2VzS2V5cy5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZXNLZXlzXHJcbiAgICAgICAgICAuc2xpY2UoY29uZmlnLm1lc3NhZ2VzTGVuZ3RoKVxyXG4gICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gYXBwZW5kTWVzc2FnZShrZXkpIHtcclxuICAgICAgICAgICAgYXBwZW5kU2luZ2xlTWVzc2FnZShETS5nZXRET01FbGVtZW50KE1FU1NBR0VTX0xJU1QpLCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgY29uZmlnLm1lc3NhZ2VzTGVuZ3RoID0gbWVzc2FnZXNLZXlzLmxlbmd0aDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICBzdG9yYWdlTWFuYWdlci5zZW5kUmVxdWVzdFRvU3RvcmFnZShcclxuICAgICAgZ2V0RXh0cmFQYXRoKE1FU1NBR0VTX0ZJRUxEKSxcclxuICAgICAgSFRUUF9QT1NULFxyXG4gICAgICBtZXNzYWdlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICB2YXIgaW5wdXRUZXh0QXJlYSA9IERNLmdldERPTUVsZW1lbnQoSU5QVVRfVEVYVCk7XHJcbiAgICB2YXIgbWVzc2FnZTtcclxuXHJcbiAgICBpZiAoaW5wdXRUZXh0QXJlYS52YWx1ZSAhPT0gXCJcIikge1xyXG4gICAgICBtZXNzYWdlID0gbWVzc2FnZUZhY3RvcnkuZ2V0TWVzc2FnZShcclxuICAgICAgICBuZXcgRGF0ZSgpLFxyXG4gICAgICAgIGNvbmZpZy51c2VyTmFtZS5jb25jYXQoXCI6XCIpLFxyXG4gICAgICAgIGlucHV0VGV4dEFyZWEudmFsdWVcclxuICAgICAgKTtcclxuICAgICAgaW5wdXRUZXh0QXJlYS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIGFwcGVuZFNpbmdsZU1lc3NhZ2UoRE0uZ2V0RE9NRWxlbWVudChNRVNTQUdFU19MSVNUKSwgbWVzc2FnZSk7XHJcbiAgICAgIHNhdmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICBzdG9yYWdlTWFuYWdlci5zZW5kUmVxdWVzdFRvU3RvcmFnZShcclxuICAgICAgICBnZXRFeHRyYVBhdGgoUkVBRF9GSUVMRCksXHJcbiAgICAgICAgSFRUUF9QVVQsXHJcbiAgICAgICAgZmFsc2VcclxuICAgICAgKTtcclxuICAgICAgc2V0SW50ZXJ2YWwodXBkYXRlTWVzc2FnZXNMaXN0LCBSRVBMWV9USU1FT1VUKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFwcGVuZElucHV0Qm94KCkge1xyXG4gICAgdmFyIGlucHV0TWVzc2FnZUNvbnRhaW5lciA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB2YXIgaW5wdXRUZXh0QXJlYSA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcclxuICAgIHZhciBtZXNzYWdlQnV0dG9uID0gRE0uY3JlYXRlRE9NRWxlbWVudChcImJ1dHRvblwiKTtcclxuXHJcbiAgICBpbnB1dE1lc3NhZ2VDb250YWluZXIuaWQgPSBJTlBVVF9CT1g7XHJcbiAgICBETS5hZGRDU1NDbGFzcyhpbnB1dE1lc3NhZ2VDb250YWluZXIsIFwiY2hhdC1pbnB1dC1jb250YWluZXJcIik7XHJcbiAgICBpbnB1dFRleHRBcmVhLmlkID0gSU5QVVRfVEVYVDtcclxuICAgIERNLmFkZENTU0NsYXNzKGlucHV0VGV4dEFyZWEsIFwiY2hhdC1pbnB1dC10ZXh0YXJlYVwiKTtcclxuICAgIERNLmFwcGVuZERPTUVsZW1lbnQoaW5wdXRNZXNzYWdlQ29udGFpbmVyLCBpbnB1dFRleHRBcmVhKTtcclxuICAgIG1lc3NhZ2VCdXR0b24uaWQgPSBDSEFUX01FU1NBR0VfQlVUVE9OX0lEO1xyXG4gICAgRE0uYWRkQ1NTQ2xhc3MobWVzc2FnZUJ1dHRvbiwgXCJjaGF0LW1lc3NhZ2UtYnV0dG9uXCIpO1xyXG4gICAgbWVzc2FnZUJ1dHRvbi5pbm5lckhUTUwgPSBcItCe0YLQv9GA0LDQstC40YLRjFwiO1xyXG4gICAgRE0uYWRkTGlzdGVuZXIobWVzc2FnZUJ1dHRvbiwgXCJjbGlja1wiLCBzZW5kTWVzc2FnZSk7XHJcbiAgICBETS5hcHBlbmRET01FbGVtZW50KGlucHV0TWVzc2FnZUNvbnRhaW5lciwgbWVzc2FnZUJ1dHRvbik7XHJcbiAgICBETS5hcHBlbmRET01FbGVtZW50KENIQVRfSVRFTSwgaW5wdXRNZXNzYWdlQ29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFBvc2l0aW9uQ2xhc3MoKSB7XHJcbiAgICB2YXIgcG9zaXRpb25DbGFzcztcclxuXHJcbiAgICBpZiAoY29uZmlnLnBvc2l0aW9uID09PSBcImxlZnRcIikge1xyXG4gICAgICBwb3NpdGlvbkNsYXNzID0gXCJjaGF0LWNvbnRhaW5lci1sZWZ0XCI7XHJcbiAgICB9IGVsc2UgaWYgKGNvbmZpZy5wb3NpdGlvbiA9PT0gXCJyaWdodFwiKSB7XHJcbiAgICAgIHBvc2l0aW9uQ2xhc3MgPSBcImNoYXQtY29udGFpbmVyLXJpZ2h0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBvc2l0aW9uQ2xhc3M7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjcmVhdGVVc2VyTmFtZVByb21wdE1hcmt1cCgpIHtcclxuICAgIHZhciBwcm9tcHRDb250YWluZXIgPSBETS5jcmVhdGVET01FbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdmFyIHByb21wdExhYmVsID0gRE0uY3JlYXRlRE9NRWxlbWVudChcImxhYmVsXCIpO1xyXG4gICAgdmFyIHByb21wdElucHV0ID0gRE0uY3JlYXRlRE9NRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgdmFyIHByb21wdENvbmZpcm1CdXR0b24gPSBETS5jcmVhdGVET01FbGVtZW50KFwiYnV0dG9uXCIpO1xyXG5cclxuICAgIHByb21wdENvbnRhaW5lci5pZCA9IFVTRVJfTkFNRV9QUk9NUFRfSUQ7XHJcbiAgICBETS5hZGRDU1NDbGFzcyhcclxuICAgICAgcHJvbXB0Q29udGFpbmVyLFxyXG4gICAgICBcImNoYXQtcHJvbXB0LWNvbnRhaW5lclwiLFxyXG4gICAgICBnZXRQb3NpdGlvbkNsYXNzKClcclxuICAgICk7XHJcbiAgICBwcm9tcHRJbnB1dC5pZCA9IFBST01QVF9JTlBVVF9JRDtcclxuICAgIERNLmFkZENTU0NsYXNzKHByb21wdElucHV0LCBcImNoYXQtcHJvbXB0LWlucHV0XCIpO1xyXG4gICAgcHJvbXB0TGFiZWwuZm9yID0gcHJvbXB0SW5wdXQuaWQ7XHJcbiAgICBwcm9tcHRMYWJlbC5pbm5lckhUTUwgPSBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQv9GA0LXQtNGB0YLQsNCy0YzRgtC10YHRjDpcIjtcclxuICAgIHByb21wdENvbmZpcm1CdXR0b24uaWQgPSBQUk9NUFRfQ09ORklSTV9CVVRUT05fSUQ7XHJcbiAgICBETS5hZGRDU1NDbGFzcyhwcm9tcHRDb25maXJtQnV0dG9uLCBcImNoYXQtcHJvbXB0LWJ1dHRvblwiKTtcclxuICAgIHByb21wdENvbmZpcm1CdXR0b24uaW5uZXJIVE1MID0gXCLQodC+0YXRgNCw0L3QuNGC0YxcIjtcclxuICAgIERNLmFwcGVuZERPTUVsZW1lbnQocHJvbXB0Q29udGFpbmVyLCBwcm9tcHRMYWJlbCk7XHJcbiAgICBETS5hcHBlbmRET01FbGVtZW50KHByb21wdENvbnRhaW5lciwgcHJvbXB0SW5wdXQpO1xyXG4gICAgRE0uYXBwZW5kRE9NRWxlbWVudChwcm9tcHRDb250YWluZXIsIHByb21wdENvbmZpcm1CdXR0b24pO1xyXG4gICAgRE0uYXBwZW5kRE9NRWxlbWVudChDSEFUX0lURU0sIHByb21wdENvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRPdGhlckNvbXBvbmVudHNBdmFpbGFiaWxpdHkoaXNBdmFpbGFibGUpIHtcclxuICAgIERNLmdldERPTUVsZW1lbnQoSU5QVVRfVEVYVCkuZGlzYWJsZWQgPSAhaXNBdmFpbGFibGU7XHJcbiAgICBETS5nZXRET01FbGVtZW50KENIQVRfTUVTU0FHRV9CVVRUT05fSUQpLmRpc2FibGVkID0gIWlzQXZhaWxhYmxlO1xyXG4gICAgaWYgKERNLmdldERPTUVsZW1lbnQoVE9HR0xFX0JVVFRPTikgIT09IG51bGwpIHtcclxuICAgICAgRE0uZ2V0RE9NRWxlbWVudChUT0dHTEVfQlVUVE9OKS5kaXNhYmxlZCA9ICFpc0F2YWlsYWJsZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFza1VzZXJOYW1lKCkge1xyXG4gICAgY3JlYXRlVXNlck5hbWVQcm9tcHRNYXJrdXAoKTtcclxuICAgIHNldE90aGVyQ29tcG9uZW50c0F2YWlsYWJpbGl0eShmYWxzZSk7XHJcbiAgICBETS5hZGRMaXN0ZW5lcihQUk9NUFRfQ09ORklSTV9CVVRUT05fSUQsIFwiY2xpY2tcIiwgZnVuY3Rpb24gc2F2ZVVzZXJOYW1lKCkge1xyXG4gICAgICB2YXIgdXNlck5hbWUgPSBETS5nZXRET01FbGVtZW50KFBST01QVF9JTlBVVF9JRCkudmFsdWU7XHJcbiAgICAgIGlmICh1c2VyTmFtZS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbmZpZy51c2VyTmFtZSA9IHVzZXJOYW1lO1xyXG4gICAgICBETS5yZW1vdmVET01FbGVtZW50KENIQVRfSVRFTSwgVVNFUl9OQU1FX1BST01QVF9JRCk7XHJcbiAgICAgIHNldE90aGVyQ29tcG9uZW50c0F2YWlsYWJpbGl0eSh0cnVlKTtcclxuICAgICAgc3RvcmFnZU1hbmFnZXIuc2VuZFJlcXVlc3RUb1N0b3JhZ2UoXHJcbiAgICAgICAgZ2V0RXh0cmFQYXRoKFVTRVJfTkFNRV9GSUVMRCksXHJcbiAgICAgICAgSFRUUF9QVVQsXHJcbiAgICAgICAgY29uZmlnLnVzZXJOYW1lXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFVzZXJOYW1lRnJvbVN0b3JhZ2UoKSB7XHJcbiAgICBzdG9yYWdlTWFuYWdlclxyXG4gICAgICAuc2VuZFJlcXVlc3RUb1N0b3JhZ2UoZ2V0RXh0cmFQYXRoKFVTRVJfTkFNRV9GSUVMRCksIEhUVFBfR0VULCBcIlwiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiBzYXZlVXNlck5hbWUoZGF0YSkge1xyXG4gICAgICAgIGNvbmZpZy51c2VyTmFtZSA9IGRhdGE7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2V0VXNlck5hbWUoKSB7XHJcbiAgICBnZXRVc2VyTmFtZUZyb21TdG9yYWdlKCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uIGlmTm90QXNzaWduKCkge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgY29uZmlnLnVzZXJOYW1lICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLnVzZXJOYW1lICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICBjb25maWcudXNlck5hbWUgIT09IFwiXCJcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcucmVxdWlyZU5hbWUgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgYXNrVXNlck5hbWUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25maWcudXNlck5hbWUgPSBERUZBVUxUX1VTRVJfTkFNRTtcclxuICAgICAgICBzdG9yYWdlTWFuYWdlci5zZW5kUmVxdWVzdFRvU3RvcmFnZShcclxuICAgICAgICAgIGdldEV4dHJhUGF0aChVU0VSX05BTUVfRklFTEQpLFxyXG4gICAgICAgICAgSFRUUF9QVVQsXHJcbiAgICAgICAgICBjb25maWcudXNlck5hbWVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9LCBSRVFVRVNUX1RJTUVPVVQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZXhwYW5kQ2hhdCgpIHtcclxuICAgIERNLnJlbW92ZUNTU0NsYXNzKENIQVRfSVRFTSwgQ09MTEFQU0VEKTtcclxuICAgIERNLmFkZENTU0NsYXNzKENIQVRfSVRFTSwgRVhQQU5ERUQpO1xyXG4gICAgaWYgKGNvbmZpZy5hbGxvd01pbmltaXplID09PSBcInRydWVcIikge1xyXG4gICAgICBETS5nZXRET01FbGVtZW50KFRPR0dMRV9CVVRUT04pLmlubmVySFRNTCA9IENPTExBUFNFX01BUks7XHJcbiAgICB9XHJcbiAgICBhcHBlbmRNZXNzYWdlc0xpc3QoKTtcclxuICAgIGFwcGVuZElucHV0Qm94KCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGNvbmZpZy51c2VyTmFtZSA9PT0gXCJcIiB8fFxyXG4gICAgICBjb25maWcudXNlck5hbWUgPT09IG51bGwgfHxcclxuICAgICAgY29uZmlnLnVzZXJOYW1lID09PSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICBzZXRVc2VyTmFtZSgpO1xyXG4gICAgfVxyXG4gICAgc2F2ZUNoYXRTdGF0ZVRvU3RvcmFnZShFWFBBTkRFRCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRDaGF0U3RhdGVGcm9tU3RvcmFnZSgpIHtcclxuICAgIHN0b3JhZ2VNYW5hZ2VyXHJcbiAgICAgIC5zZW5kUmVxdWVzdFRvU3RvcmFnZShnZXRFeHRyYVBhdGgoQ0hBVF9TVEFURV9GSUVMRCksIEhUVFBfR0VULCBcIlwiKVxyXG4gICAgICAudGhlbihmdW5jdGlvbiBzYXZlQ2hhdFN0YXRlKGRhdGEpIHtcclxuICAgICAgICBjb25maWcuY2hhdFN0YXRlID0gZGF0YTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpbml0Q2hhdFN0YXRlKCkge1xyXG4gICAgZ2V0Q2hhdFN0YXRlRnJvbVN0b3JhZ2UoKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gcmVzb2x2ZUNoYXRTdGF0ZSgpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGNvbmZpZy5jaGF0U3RhdGUgPT09IG51bGwgfHxcclxuICAgICAgICBjb25maWcuY2hhdFN0YXRlID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICBjb25maWcuY2hhdFN0YXRlID09PSBcIlwiXHJcbiAgICAgICkge1xyXG4gICAgICAgIHNhdmVDaGF0U3RhdGVUb1N0b3JhZ2UoQ09MTEFQU0VEKTtcclxuICAgICAgfSBlbHNlIGlmIChjb25maWcuY2hhdFN0YXRlID09PSBFWFBBTkRFRCkge1xyXG4gICAgICAgIGV4cGFuZENoYXQoKTtcclxuICAgICAgfVxyXG4gICAgICBETS5hZGRDU1NDbGFzcyhDSEFUX0lURU0sIGNvbmZpZy5jaGF0U3RhdGUpO1xyXG4gICAgfSwgUkVRVUVTVF9USU1FT1VUKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZUNoYXRTdGF0ZSgpIHtcclxuICAgIHN3aXRjaCAoY29uZmlnLmNoYXRTdGF0ZSkge1xyXG4gICAgICBjYXNlIENPTExBUFNFRDpcclxuICAgICAgICBleHBhbmRDaGF0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRVhQQU5ERUQ6XHJcbiAgICAgICAgY29sbGFwc2VDaGF0KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgXCJVbmV4cGVjdGVkIGtleS92YWx1ZSBwYWlyOiBcIiArIENIQVRfSVRFTSArIFwiL1wiICsgY29uZmlnLmNoYXRTdGF0ZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLmFwcGVuZFN0eWxlc2hlZXQgPSBmdW5jdGlvbiBhcHBlbmRTdHlsZXNoZWV0KCkge1xyXG4gICAgdmFyIHN0eWxlRWxlbWVudCA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cclxuICAgIHN0eWxlRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuICAgIHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG4gICAgc3R5bGVFbGVtZW50LmhyZWYgPSBQQVRIX1RPX1NUWUxFU0hFRVQ7XHJcbiAgICBETS5hcHBlbmRET01FbGVtZW50KGRvY3VtZW50LmhlYWQsIHN0eWxlRWxlbWVudCk7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gYXBwZW5kVG9nZ2xlQnV0dG9uKGNvbnRhaW5lcikge1xyXG4gICAgdmFyIHRvZ2dsZUJ1dHRvbiA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBETS5hZGRDU1NDbGFzcyh0b2dnbGVCdXR0b24sIFRPR0dMRV9CVVRUT04pO1xyXG4gICAgdG9nZ2xlQnV0dG9uLmlkID0gVE9HR0xFX0JVVFRPTjtcclxuICAgIHRvZ2dsZUJ1dHRvbi5pbm5lckhUTUwgPVxyXG4gICAgICBjb25maWcuY2hhdFN0YXRlID09PSBFWFBBTkRFRCA/IENPTExBUFNFX01BUksgOiBFWFBBTkRfTUFSSztcclxuICAgIERNLmFkZExpc3RlbmVyKHRvZ2dsZUJ1dHRvbiwgXCJjbGlja1wiLCBjaGFuZ2VDaGF0U3RhdGUpO1xyXG4gICAgRE0uYXBwZW5kRE9NRWxlbWVudChjb250YWluZXIsIHRvZ2dsZUJ1dHRvbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXREcmFnSGFuZGxlcihjb250YWluZXIpIHtcclxuICAgIGZ1bmN0aW9uIGdldENvb3JkaW5hdGVzKGVsZW0pIHtcclxuICAgICAgdmFyIGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxyXG4gICAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgRE0uYWRkTGlzdGVuZXIoY29udGFpbmVyLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbiBvbk1vdXNlRG93bihldmVudCkge1xyXG4gICAgICB2YXIgY2hhdCA9IERNLmdldERPTUVsZW1lbnQoQ0hBVF9JVEVNKTtcclxuICAgICAgdmFyIGNvb3JkaW5hdGVzID0gZ2V0Q29vcmRpbmF0ZXMoY2hhdCk7XHJcbiAgICAgIHZhciBzaGlmdFggPSBldmVudC5wYWdlWCAtIGNvb3JkaW5hdGVzLmxlZnQ7XHJcbiAgICAgIHZhciBzaGlmdFkgPSBldmVudC5wYWdlWSAtIGNvb3JkaW5hdGVzLnRvcDtcclxuICAgICAgdmFyIG1vdXNlTW92ZUhhbmRsZXI7XHJcbiAgICAgIHZhciBtb3VzZVVwSGFuZGxlcjtcclxuXHJcbiAgICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJCVVRUT05cIikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbW92ZUF0KGUpIHtcclxuICAgICAgICBjaGF0LnN0eWxlLmxlZnQgPSBlLnBhZ2VYIC0gc2hpZnRYICsgXCJweFwiO1xyXG4gICAgICAgIGNoYXQuc3R5bGUudG9wID0gZS5wYWdlWSAtIHNoaWZ0WSArIFwicHhcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbW91c2VNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIG9uTW91c2VNb3ZlKGUpIHtcclxuICAgICAgICBtb3ZlQXQoZSk7XHJcbiAgICAgIH07XHJcbiAgICAgIG1vdXNlVXBIYW5kbGVyID0gZnVuY3Rpb24gb25Nb3VzZVVwKCkge1xyXG4gICAgICAgIERNLnJlbW92ZUxpc3RlbmVyKGRvY3VtZW50LCBcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmVIYW5kbGVyKTtcclxuICAgICAgICBETS5yZW1vdmVMaXN0ZW5lcihjb250YWluZXIsIFwibW91c2V1cFwiLCBtb3VzZVVwSGFuZGxlcik7XHJcbiAgICAgIH07XHJcbiAgICAgIG1vdmVBdChldmVudCk7XHJcbiAgICAgIERNLmFkZExpc3RlbmVyKGRvY3VtZW50LCBcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmVIYW5kbGVyKTtcclxuICAgICAgRE0uYWRkTGlzdGVuZXIoY29udGFpbmVyLCBcIm1vdXNldXBcIiwgbW91c2VVcEhhbmRsZXIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgRE0uYWRkTGlzdGVuZXIoY29udGFpbmVyLCBcImRyYWdzdGFydFwiLCBmdW5jdGlvbiBvbkRyYWdTdGFydCgpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0aGlzLmNyZWF0ZUNoYXRNYXJrdXAgPSBmdW5jdGlvbiBjcmVhdGVDaGF0TWFya3VwKCkge1xyXG4gICAgdmFyIGNvbnRhaW5lciA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcclxuICAgIHZhciBsZWdlbmQgPSBETS5jcmVhdGVET01FbGVtZW50KFwibGVnZW5kXCIpO1xyXG4gICAgdmFyIHRvZ2dsZUJ1dHRvbkNvbnRhaW5lciA9IERNLmNyZWF0ZURPTUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgY29udGFpbmVyLmlkID0gQ0hBVF9JVEVNO1xyXG4gICAgRE0uYWRkQ1NTQ2xhc3MoXHJcbiAgICAgIGNvbnRhaW5lcixcclxuICAgICAgXCJjaGF0LWNvbnRhaW5lclwiLFxyXG4gICAgICBnZXRQb3NpdGlvbkNsYXNzKCksXHJcbiAgICAgIGNvbmZpZy5jc3NDbGFzc1xyXG4gICAgKTtcclxuICAgIGxlZ2VuZC5pbm5lckhUTUwgPSBjb25maWcuY2hhdFRpdGxlO1xyXG4gICAgRE0uYWRkQ1NTQ2xhc3MobGVnZW5kLCBcImNoYXQtbGVnZW5kXCIpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxlZ2VuZCk7XHJcbiAgICBETS5hZGRDU1NDbGFzcyh0b2dnbGVCdXR0b25Db250YWluZXIsIFwiY2hhdC10b2dnbGUtYnV0dG9uLWNvbnRhaW5lclwiKTtcclxuICAgIGlmIChjb25maWcuYWxsb3dEcmFnID09PSBcInRydWVcIikge1xyXG4gICAgICBETS5hZGRDU1NDbGFzcyhcclxuICAgICAgICB0b2dnbGVCdXR0b25Db250YWluZXIsXHJcbiAgICAgICAgXCJjaGF0LXRvZ2dsZS1idXR0b24tY29udGFpbmVyLWRyYWdcIlxyXG4gICAgICApO1xyXG4gICAgICBzZXREcmFnSGFuZGxlcih0b2dnbGVCdXR0b25Db250YWluZXIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbmZpZy5hbGxvd01pbmltaXplID09PSBcInRydWVcIikge1xyXG4gICAgICBhcHBlbmRUb2dnbGVCdXR0b24odG9nZ2xlQnV0dG9uQ29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29uZmlnLmFsbG93TWluaW1pemUgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICBzYXZlQ2hhdFN0YXRlVG9TdG9yYWdlKEVYUEFOREVEKTtcclxuICAgIH1cclxuICAgIERNLmFwcGVuZERPTUVsZW1lbnQoY29udGFpbmVyLCB0b2dnbGVCdXR0b25Db250YWluZXIpO1xyXG4gICAgRE0uYXBwZW5kRE9NRWxlbWVudChkb2N1bWVudC5ib2R5LCBjb250YWluZXIpO1xyXG4gICAgaW5pdENoYXRTdGF0ZSgpO1xyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGdldFBhcmFtc0Zyb21SZXF1ZXN0KCkge1xyXG4gICAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xyXG4gICAgcmV0dXJuIHNjcmlwdFxyXG4gICAgICAuc3Vic3RyKHNjcmlwdC5pbmRleE9mKFwiP1wiKSArIDEpXHJcbiAgICAgIC5zcGxpdChcIiZcIilcclxuICAgICAgLnJlZHVjZShmdW5jdGlvbiByZWR1Y2VyKHBhcmFtLCBlbCkge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IGVsLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICB2YXIgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pO1xyXG4gICAgICAgIHBhcmFtW2RlY29kZVVSSUNvbXBvbmVudChwYXJ0c1swXSldID0gdmFsdWUuc3Vic3RyKDEsIHZhbHVlLmxlbmd0aCAtIDIpO1xyXG4gICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgfSwge30pO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5zZXRDb25maWcgPSBmdW5jdGlvbiBzZXRDb25maWcoKSB7XHJcbiAgICB2YXIgcmVxdWVzdENvbmZpZyA9IGdldFBhcmFtc0Zyb21SZXF1ZXN0KCk7XHJcbiAgICB2YXIgcHJvcGVydHlWYWx1ZTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhyZXF1ZXN0Q29uZmlnKS5mb3JFYWNoKGZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhrZXkpIHtcclxuICAgICAgcHJvcGVydHlWYWx1ZSA9IHJlcXVlc3RDb25maWdba2V5XTtcclxuICAgICAgaWYgKHByb3BlcnR5VmFsdWUgIT09IFwiXCIpIHtcclxuICAgICAgICBjb25maWdba2V5XSA9IHByb3BlcnR5VmFsdWU7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHRoaXMuc2V0VW5pcXVlVXNlcklEID0gZnVuY3Rpb24gc2V0VW5pcXVlVXNlcklEKCkge1xyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFVTRVJfSUQpID09PSBudWxsKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFVTRVJfSUQsIFwidXNlclwiLmNvbmNhdChEYXRlLm5vdygpLnRvU3RyaW5nKCkpKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4gdGhpcztcclxufSkoY29uZmlnKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiBpbml0UGFnZSgpIHtcclxuICBjaGF0RmFjdG9yeS5hcHBlbmRTdHlsZXNoZWV0KCk7XHJcbiAgY2hhdEZhY3Rvcnkuc2V0VW5pcXVlVXNlcklEKCk7XHJcbiAgY2hhdEZhY3RvcnkuY3JlYXRlQ2hhdE1hcmt1cCgpO1xyXG59KTtcclxuXHJcbmNoYXRGYWN0b3J5LnNldENvbmZpZygpOyJdfQ==
