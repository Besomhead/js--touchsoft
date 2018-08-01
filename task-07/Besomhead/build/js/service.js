var CONFIGURATOR_PATH="https://rawgit.com/Besomhead/js--touchsoft/besomhead-task07-build/task-07/Besomhead/build/html/chat_configurator.html",DASHBOARD_PATH="https://rawgit.com/Besomhead/js--touchsoft/besomhead-task07-build/task-07/Besomhead/build/html/dashboard.html",ABOUT_PATH="https://rawgit.com/Besomhead/js--touchsoft/besomhead-task07-build/task-07/Besomhead/build/html/about.html",DM=function(){function e(){}return e.prototype.getDOMElement=function(e){return"string"==typeof e?document.getElementById(e):e},e.prototype.getDOMChildrenByTag=function(e,t){return Array.from(this.getDOMElement(e).getElementsByTagName(t))},e.prototype.getDOMChildrenByClass=function(e,t){return Array.from(DM.getDOMElement(e).getElementsByClassName(t))},e.prototype.createDOMElement=document.createElement.bind(document),e.prototype.appendDOMElement=function(e,t){DM.getDOMElement(e).appendChild(t)},e.prototype.removeDOMElement=function(e,t){DM.getDOMElement(e).removeChild(DM.getDOMElement(t))},e.prototype.addListener=function(e,t,n){DM.getDOMElement(e).addEventListener(t,n)},e.prototype.removeListener=function(e,t,n){DM.getDOMElement(e).removeEventListener(t,n)},e.prototype.addCSSClass=function(t){Array.from(arguments).slice(1).forEach(function(e){DM.getDOMElement(t).classList.add(e)})},e.prototype.removeCSSClass=function(e,t){DM.getDOMElement(e).classList.remove(t)},new e}(),serviceFactory=function(){function e(){}function t(e){DM.getDOMElement("service-selected-content-container").src=e}return e.prototype.appendSelectedContent=function(e){switch(e){case"#configurator":t(CONFIGURATOR_PATH);break;case"#dashboard":t(DASHBOARD_PATH);break;case"#about":t(ABOUT_PATH)}},e.prototype.appendContent=function(e){"BUTTON"===e.target.tagName&&e.target.value!==window.location.hash&&(serviceFactory.appendSelectedContent(e.target.value),window.location.hash=e.target.value)},new e}();window.addEventListener("load",function(){DM.addListener("service-buttons-container","click",serviceFactory.appendContent),serviceFactory.appendSelectedContent(window.location.hash)});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2UuanMiXSwibmFtZXMiOlsiQ09ORklHVVJBVE9SX1BBVEgiLCJEQVNIQk9BUkRfUEFUSCIsIkFCT1VUX1BBVEgiLCJETSIsIkRPTU1hbmFnZXIiLCJwcm90b3R5cGUiLCJnZXRET01FbGVtZW50IiwiaWR0ZiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRET01DaGlsZHJlbkJ5VGFnIiwicm9vdCIsInRhZyIsIkFycmF5IiwiZnJvbSIsInRoaXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImdldERPTUNoaWxkcmVuQnlDbGFzcyIsImNsYXNzTmFtZSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjcmVhdGVET01FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImJpbmQiLCJhcHBlbmRET01FbGVtZW50IiwiZWxlbWVudCIsImFwcGVuZENoaWxkIiwicmVtb3ZlRE9NRWxlbWVudCIsInJlbW92ZUNoaWxkIiwiYWRkTGlzdGVuZXIiLCJldmVudCIsImNhbGxiYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUxpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZENTU0NsYXNzIiwiYXJndW1lbnRzIiwic2xpY2UiLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlQ1NTQ2xhc3MiLCJyZW1vdmUiLCJzZXJ2aWNlRmFjdG9yeSIsIlNlcnZpY2VGYWN0b3J5IiwiYWRkU291cmNlVG9JRnJhbWUiLCJzb3VyY2UiLCJzcmMiLCJhcHBlbmRTZWxlY3RlZENvbnRlbnQiLCJoYXNoIiwiYXBwZW5kQ29udGVudCIsInRhcmdldCIsInRhZ05hbWUiLCJ2YWx1ZSIsIndpbmRvdyIsImxvY2F0aW9uIl0sIm1hcHBpbmdzIjoiQUFJQSxJQUFJQSxrQkFDRix3SEFDRUMsZUFDRixnSEFDRUMsV0FDRiw0R0FJRUMsR0FBSyxXQUNQLFNBQVNDLEtBb0RULE9BbERBQSxFQUFXQyxVQUFVQyxjQUFnQixTQUFvQkMsR0FDdkQsTUFBdUIsaUJBQVRBLEVBQW9CQyxTQUFTQyxlQUFlRixHQUFRQSxHQUVwRUgsRUFBV0MsVUFBVUssb0JBQXNCLFNBQ3pDQyxFQUNBQyxHQUVBLE9BQU9DLE1BQU1DLEtBQUtDLEtBQUtULGNBQWNLLEdBQU1LLHFCQUFxQkosS0FFbEVSLEVBQVdDLFVBQVVZLHNCQUF3QixTQUMzQ04sRUFDQU8sR0FFQSxPQUFPTCxNQUFNQyxLQUFLWCxHQUFHRyxjQUFjSyxHQUFNUSx1QkFBdUJELEtBRWxFZCxFQUFXQyxVQUFVZSxpQkFBbUJaLFNBQVNhLGNBQWNDLEtBQUtkLFVBQ3BFSixFQUFXQyxVQUFVa0IsaUJBQW1CLFNBQWdCWixFQUFNYSxHQUM1RHJCLEdBQUdHLGNBQWNLLEdBQU1jLFlBQVlELElBRXJDcEIsRUFBV0MsVUFBVXFCLGlCQUFtQixTQUFnQmYsRUFBTWEsR0FDNURyQixHQUFHRyxjQUFjSyxHQUFNZ0IsWUFBWXhCLEdBQUdHLGNBQWNrQixLQUV0RHBCLEVBQVdDLFVBQVV1QixZQUFjLFNBQ2pDakIsRUFDQWtCLEVBQ0FDLEdBRUEzQixHQUFHRyxjQUFjSyxHQUFNb0IsaUJBQWlCRixFQUFPQyxJQUVqRDFCLEVBQVdDLFVBQVUyQixlQUFpQixTQUNwQ3JCLEVBQ0FrQixFQUNBQyxHQUVBM0IsR0FBR0csY0FBY0ssR0FBTXNCLG9CQUFvQkosRUFBT0MsSUFFcEQxQixFQUFXQyxVQUFVNkIsWUFBYyxTQUFxQnZCLEdBQ3RERSxNQUFNQyxLQUFLcUIsV0FDUkMsTUFBTSxHQUNOQyxRQUFRLFNBQW9CbkIsR0FDM0JmLEdBQUdHLGNBQWNLLEdBQU0yQixVQUFVQyxJQUFJckIsTUFHM0NkLEVBQVdDLFVBQVVtQyxlQUFpQixTQUNwQzdCLEVBQ0FPLEdBRUFmLEdBQUdHLGNBQWNLLEdBQU0yQixVQUFVRyxPQUFPdkIsSUFHbkMsSUFBSWQsRUFyREosR0EyRExzQyxlQUFpQixXQUNuQixTQUFTQyxLQUVULFNBQVNDLEVBQWtCQyxHQUN6QjFDLEdBQUdHLGNBQWMsc0NBQXNDd0MsSUFBTUQsRUFnQy9ELE9BN0JBRixFQUFldEMsVUFBVTBDLHNCQUF3QixTQUMvQ0MsR0FFQSxPQUFRQSxHQUNOLElBQUssZ0JBQ0hKLEVBQWtCNUMsbUJBQ2xCLE1BQ0YsSUFBSyxhQUNINEMsRUFBa0IzQyxnQkFDbEIsTUFDRixJQUFLLFNBQ0gyQyxFQUFrQjFDLGNBTXhCeUMsRUFBZXRDLFVBQVU0QyxjQUFnQixTQUF1QnBCLEdBQ2pDLFdBQXpCQSxFQUFNcUIsT0FBT0MsU0FHYnRCLEVBQU1xQixPQUFPRSxRQUFVQyxPQUFPQyxTQUFTTixPQUkzQ04sZUFBZUssc0JBQXNCbEIsRUFBTXFCLE9BQU9FLE9BQ2xEQyxPQUFPQyxTQUFTTixLQUFPbkIsRUFBTXFCLE9BQU9FLFFBRy9CLElBQUlULEVBcENRLEdBdUNyQlUsT0FBT3RCLGlCQUFpQixPQUFRLFdBQzlCNUIsR0FBR3lCLFlBQ0QsNEJBQ0EsUUFDQWMsZUFBZU8sZUFFakJQLGVBQWVLLHNCQUFzQk0sT0FBT0MsU0FBU04iLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGV4cG9ydGVkIENPTkZJR1VSQVRPUl9QQVRIIERBU0hCT0FSRF9QQVRIIEFCT1VUX1BBVEggKi9cclxuLyogZ2xvYmFsIHNlcnZpY2VGYWN0b3J5ICovXHJcbi8qIGdsb2JhbCBETSAqL1xyXG5cclxudmFyIENPTkZJR1VSQVRPUl9QQVRIID1cclxuICBcImh0dHBzOi8vcmF3Z2l0LmNvbS9CZXNvbWhlYWQvanMtLXRvdWNoc29mdC9iZXNvbWhlYWQtdGFzazA3LWJ1aWxkL3Rhc2stMDcvQmVzb21oZWFkL2J1aWxkL2h0bWwvY2hhdF9jb25maWd1cmF0b3IuaHRtbFwiO1xyXG52YXIgREFTSEJPQVJEX1BBVEggPVxyXG4gIFwiaHR0cHM6Ly9yYXdnaXQuY29tL0Jlc29taGVhZC9qcy0tdG91Y2hzb2Z0L2Jlc29taGVhZC10YXNrMDctYnVpbGQvdGFzay0wNy9CZXNvbWhlYWQvYnVpbGQvaHRtbC9kYXNoYm9hcmQuaHRtbFwiO1xyXG52YXIgQUJPVVRfUEFUSCA9XHJcbiAgXCJodHRwczovL3Jhd2dpdC5jb20vQmVzb21oZWFkL2pzLS10b3VjaHNvZnQvYmVzb21oZWFkLXRhc2swNy1idWlsZC90YXNrLTA3L0Jlc29taGVhZC9idWlsZC9odG1sL2Fib3V0Lmh0bWxcIjtcclxuXHJcbi8qIGV4cG9ydGVkIERNICovXHJcblxyXG52YXIgRE0gPSAoZnVuY3Rpb24gRE9NTWFuYWdlck1vZHVsZSgpIHtcclxuICBmdW5jdGlvbiBET01NYW5hZ2VyKCkge31cclxuXHJcbiAgRE9NTWFuYWdlci5wcm90b3R5cGUuZ2V0RE9NRWxlbWVudCA9IGZ1bmN0aW9uIGdldEVsZW1lbnQoaWR0Zikge1xyXG4gICAgcmV0dXJuIHR5cGVvZiBpZHRmID09PSBcInN0cmluZ1wiID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWR0ZikgOiBpZHRmO1xyXG4gIH07XHJcbiAgRE9NTWFuYWdlci5wcm90b3R5cGUuZ2V0RE9NQ2hpbGRyZW5CeVRhZyA9IGZ1bmN0aW9uIGdldENoaWxkcmVuQnlUYWdOYW1lKFxyXG4gICAgcm9vdCxcclxuICAgIHRhZ1xyXG4gICkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5nZXRET01FbGVtZW50KHJvb3QpLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZykpO1xyXG4gIH07XHJcbiAgRE9NTWFuYWdlci5wcm90b3R5cGUuZ2V0RE9NQ2hpbGRyZW5CeUNsYXNzID0gZnVuY3Rpb24gZ2V0Q2hpbGRyZW5CeUNsYXNzTmFtZShcclxuICAgIHJvb3QsXHJcbiAgICBjbGFzc05hbWVcclxuICApIHtcclxuICAgIHJldHVybiBBcnJheS5mcm9tKERNLmdldERPTUVsZW1lbnQocm9vdCkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpKTtcclxuICB9O1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLmNyZWF0ZURPTUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpO1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLmFwcGVuZERPTUVsZW1lbnQgPSBmdW5jdGlvbiBhcHBlbmQocm9vdCwgZWxlbWVudCkge1xyXG4gICAgRE0uZ2V0RE9NRWxlbWVudChyb290KS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICB9O1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZURPTUVsZW1lbnQgPSBmdW5jdGlvbiByZW1vdmUocm9vdCwgZWxlbWVudCkge1xyXG4gICAgRE0uZ2V0RE9NRWxlbWVudChyb290KS5yZW1vdmVDaGlsZChETS5nZXRET01FbGVtZW50KGVsZW1lbnQpKTtcclxuICB9O1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgIHJvb3QsXHJcbiAgICBldmVudCxcclxuICAgIGNhbGxiYWNrXHJcbiAgKSB7XHJcbiAgICBETS5nZXRET01FbGVtZW50KHJvb3QpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcclxuICB9O1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgIHJvb3QsXHJcbiAgICBldmVudCxcclxuICAgIGNhbGxiYWNrXHJcbiAgKSB7XHJcbiAgICBETS5nZXRET01FbGVtZW50KHJvb3QpLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcclxuICB9O1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLmFkZENTU0NsYXNzID0gZnVuY3Rpb24gYWRkQ1NTQ2xhc3Mocm9vdCkge1xyXG4gICAgQXJyYXkuZnJvbShhcmd1bWVudHMpXHJcbiAgICAgIC5zbGljZSgxKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiBhZGRDbGFzc2VzKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIERNLmdldERPTUVsZW1lbnQocm9vdCkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG4gIERPTU1hbmFnZXIucHJvdG90eXBlLnJlbW92ZUNTU0NsYXNzID0gZnVuY3Rpb24gcmVtb3ZlQ1NTQ2xhc3MoXHJcbiAgICByb290LFxyXG4gICAgY2xhc3NOYW1lXHJcbiAgKSB7XHJcbiAgICBETS5nZXRET01FbGVtZW50KHJvb3QpLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gbmV3IERPTU1hbmFnZXIoKTtcclxufSkoKTtcclxuLyogZXhwb3J0ZWQgc2VydmljZUZhY3RvcnkgKi9cclxuLyogZ2xvYmFsIERNICovXHJcbi8qIGdsb2JhbCBDT05GSUdVUkFUT1JfUEFUSCBEQVNIQk9BUkRfUEFUSCBBQk9VVF9QQVRIICovXHJcblxyXG52YXIgc2VydmljZUZhY3RvcnkgPSAoZnVuY3Rpb24gc2VydmljZUZhY3RvcnlNb2R1bGUoKSB7XHJcbiAgZnVuY3Rpb24gU2VydmljZUZhY3RvcnkoKSB7fVxyXG5cclxuICBmdW5jdGlvbiBhZGRTb3VyY2VUb0lGcmFtZShzb3VyY2UpIHtcclxuICAgIERNLmdldERPTUVsZW1lbnQoXCJzZXJ2aWNlLXNlbGVjdGVkLWNvbnRlbnQtY29udGFpbmVyXCIpLnNyYyA9IHNvdXJjZTtcclxuICB9XHJcblxyXG4gIFNlcnZpY2VGYWN0b3J5LnByb3RvdHlwZS5hcHBlbmRTZWxlY3RlZENvbnRlbnQgPSBmdW5jdGlvbiBhcHBlbmRTZWxlY3RlZENvbnRlbnQoXHJcbiAgICBoYXNoXHJcbiAgKSB7XHJcbiAgICBzd2l0Y2ggKGhhc2gpIHtcclxuICAgICAgY2FzZSBcIiNjb25maWd1cmF0b3JcIjpcclxuICAgICAgICBhZGRTb3VyY2VUb0lGcmFtZShDT05GSUdVUkFUT1JfUEFUSCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCIjZGFzaGJvYXJkXCI6XHJcbiAgICAgICAgYWRkU291cmNlVG9JRnJhbWUoREFTSEJPQVJEX1BBVEgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiI2Fib3V0XCI6XHJcbiAgICAgICAgYWRkU291cmNlVG9JRnJhbWUoQUJPVVRfUEFUSCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgU2VydmljZUZhY3RvcnkucHJvdG90eXBlLmFwcGVuZENvbnRlbnQgPSBmdW5jdGlvbiBhcHBlbmRDb250ZW50KGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09IFwiQlVUVE9OXCIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZSA9PT0gd2luZG93LmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNlcnZpY2VGYWN0b3J5LmFwcGVuZFNlbGVjdGVkQ29udGVudChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIG5ldyBTZXJ2aWNlRmFjdG9yeSgpO1xyXG59KSgpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgRE0uYWRkTGlzdGVuZXIoXHJcbiAgICBcInNlcnZpY2UtYnV0dG9ucy1jb250YWluZXJcIixcclxuICAgIFwiY2xpY2tcIixcclxuICAgIHNlcnZpY2VGYWN0b3J5LmFwcGVuZENvbnRlbnRcclxuICApO1xyXG4gIHNlcnZpY2VGYWN0b3J5LmFwcGVuZFNlbGVjdGVkQ29udGVudCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XHJcbn0pOyJdfQ==
