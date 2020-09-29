var commentPlugin =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: getComments, addComment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getComments", function() { return getComments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addComment", function() { return addComment; });
function getComments(apiUrl, siteKey, before, cb) {
  var url = "".concat(apiUrl, "/api_comments.php?site_key=").concat(siteKey);

  if (before) {
    url += '&before=' + before;
  }

  $.ajax(url).done(function (data) {
    cb(data);
  });
}
function addComment(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: "".concat(apiUrl, "/api_add_comments.php"),
    data: data
  }).done(function (data) {
    cb(data);
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/api.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template.js */ "./src/template.js");




function loadComments(container, data) {
  for (var i = 0; i < data.length; i += 1) {
    var comment = data[i];
    Object(_utils__WEBPACK_IMPORTED_MODULE_1__["appendCommentToDOM"])(container, comment);
  }
}

Object(_utils__WEBPACK_IMPORTED_MODULE_1__["appendStyle"])(_template_js__WEBPACK_IMPORTED_MODULE_2__["cssTemplate"]);
function init(options) {
  var siteKey = '';
  var apiUrl = '';
  var commentsDOM = null;
  var lastId = null;
  var isEnd = false;
  var containerElement = null;
  var loadMoreClassName;
  var commentClassName;
  var commentsSelector;
  var formClassName;
  var formSelector;
  siteKey = options.siteKey;
  apiUrl = options.apiUrl;
  containerElement = $(options.container);
  loadMoreClassName = "".concat(siteKey, "-load-more-btn");
  commentClassName = "".concat(siteKey, "-comments");
  commentsSelector = ".".concat(commentClassName);
  formClassName = "".concat(siteKey, "-add-comments-form");
  formSelector = ".".concat(formClassName);
  containerElement.append(Object(_template_js__WEBPACK_IMPORTED_MODULE_2__["getForm"])(formClassName, commentClassName));
  commentsDOM = $(commentsSelector);
  getNewComments();
  $(commentsSelector).on('click', ".".concat(loadMoreClassName), function () {
    $(".".concat(loadMoreClassName)).remove();
    getNewComments();
  });
  $(formSelector).submit(function (e) {
    e.preventDefault();
    var nicknameDOM = $("".concat(formSelector, " input[name=nickname]"));
    var contentDOM = $("".concat(formSelector, " textarea[name=content]"));
    var newCommentData = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    };
    Object(_api_js__WEBPACK_IMPORTED_MODULE_0__["addComment"])(apiUrl, siteKey, newCommentData, function (data) {
      if (!data.ok) {
        alert(data.message);
        return;
      }

      newCommentData = data.discussions;
      Object(_utils__WEBPACK_IMPORTED_MODULE_1__["appendCommentToDOM"])(commentsDOM, newCommentData, true);
      nicknameDOM.val('');
      contentDOM.val('');
    });
  });

  function getNewComments() {
    Object(_api_js__WEBPACK_IMPORTED_MODULE_0__["getComments"])(apiUrl, siteKey, lastId, function (data) {
      if (!data.ok) {
        alert(data.message);
        return;
      }

      var comments = data.discussions;
      loadComments(commentsDOM, comments);
      var length = comments.length; // 假如 comment 少於五則，就直接回傳，不執行下面程式碼

      if (length < 5) {
        return;
      } else {
        lastId = comments[length - 1].id;
        var loadMoreBtn = Object(_template_js__WEBPACK_IMPORTED_MODULE_2__["getLoadMoreBtn"])(loadMoreClassName);
        commentsDOM.append(loadMoreBtn);
      }
    });
  }
}

/***/ }),

/***/ "./src/template.js":
/*!*************************!*\
  !*** ./src/template.js ***!
  \*************************/
/*! exports provided: cssTemplate, getForm, getLoadMoreBtn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cssTemplate", function() { return cssTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getForm", function() { return getForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadMoreBtn", function() { return getLoadMoreBtn; });
var cssTemplate = '.card{ margin-top: 10px; }';
function getForm(className, commentsClassName) {
  return "\n      <form class=\"".concat(className, "\">\n       <div class=\"form-group\">\n        <label >\u66B1\u7A31</label>\n        <input type=\"text\" name=\"nickname\" class=\"form-control\" placeholder=\"\u8ACB\u8F38\u5165\u66B1\u7A31\">\n        </div>\n        <div class=\"form-group\">\n          <label>\u7559\u8A00\u5167\u5BB9</label>\n        <textarea name=\"content\" class=\"form-control\" ></textarea>\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\">\u9001\u51FA</button>\n    </form>\n    <div class=\"").concat(commentsClassName, "\"></div>");
}
function getLoadMoreBtn(className) {
  return "<button class=\"".concat(className, " btn btn-primary more-btn\">More</button>");
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: escape, appendCommentToDOM, appendStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escape", function() { return escape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendCommentToDOM", function() { return appendCommentToDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendStyle", function() { return appendStyle; });
function escape(toOutput) {
  return toOutput.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#x27').replace(/\//g, '&#x2F');
}
function appendCommentToDOM(container, comment, isPrepend) {
  var element = "\n          <div class=\"card\">\n            <div class=\"card-body\">\n            <h5 class=\"card-title\"> ".concat(escape(comment.nickname), "</h5>\n            <p class=\"card-subtitle mb-2 text-muted\">").concat(escape(comment.created_time), "</p>\n            <p class=\"card-text\">").concat(escape(comment.content), "</p>\n          </div>");

  if (isPrepend) {
    container.prepend(element);
  } else {
    container.append(element);
  }
}
function appendStyle(cssTemp) {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemp));
  document.head.appendChild(styleElement);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21tZW50UGx1Z2luL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NvbW1lbnRQbHVnaW4vLi9zcmMvYXBpLmpzIiwid2VicGFjazovL2NvbW1lbnRQbHVnaW4vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vY29tbWVudFBsdWdpbi8uL3NyYy90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly9jb21tZW50UGx1Z2luLy4vc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbImdldENvbW1lbnRzIiwiYXBpVXJsIiwic2l0ZUtleSIsImJlZm9yZSIsImNiIiwidXJsIiwiJCIsImFqYXgiLCJkb25lIiwiZGF0YSIsImFkZENvbW1lbnQiLCJ0eXBlIiwibG9hZENvbW1lbnRzIiwiY29udGFpbmVyIiwiaSIsImxlbmd0aCIsImNvbW1lbnQiLCJhcHBlbmRDb21tZW50VG9ET00iLCJhcHBlbmRTdHlsZSIsImNzc1RlbXBsYXRlIiwiaW5pdCIsIm9wdGlvbnMiLCJjb21tZW50c0RPTSIsImxhc3RJZCIsImlzRW5kIiwiY29udGFpbmVyRWxlbWVudCIsImxvYWRNb3JlQ2xhc3NOYW1lIiwiY29tbWVudENsYXNzTmFtZSIsImNvbW1lbnRzU2VsZWN0b3IiLCJmb3JtQ2xhc3NOYW1lIiwiZm9ybVNlbGVjdG9yIiwiYXBwZW5kIiwiZ2V0Rm9ybSIsImdldE5ld0NvbW1lbnRzIiwib24iLCJyZW1vdmUiLCJzdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJuaWNrbmFtZURPTSIsImNvbnRlbnRET00iLCJuZXdDb21tZW50RGF0YSIsInNpdGVfa2V5Iiwibmlja25hbWUiLCJ2YWwiLCJjb250ZW50Iiwib2siLCJhbGVydCIsIm1lc3NhZ2UiLCJkaXNjdXNzaW9ucyIsImNvbW1lbnRzIiwiaWQiLCJsb2FkTW9yZUJ0biIsImdldExvYWRNb3JlQnRuIiwiY2xhc3NOYW1lIiwiY29tbWVudHNDbGFzc05hbWUiLCJlc2NhcGUiLCJ0b091dHB1dCIsInJlcGxhY2UiLCJpc1ByZXBlbmQiLCJlbGVtZW50IiwiY3JlYXRlZF90aW1lIiwicHJlcGVuZCIsImNzc1RlbXAiLCJzdHlsZUVsZW1lbnQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiaGVhZCJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQU8sU0FBU0EsV0FBVCxDQUFzQkMsTUFBdEIsRUFBOEJDLE9BQTlCLEVBQXVDQyxNQUF2QyxFQUErQ0MsRUFBL0MsRUFBbUQ7QUFDeEQsTUFBSUMsR0FBRyxhQUFNSixNQUFOLHdDQUEwQ0MsT0FBMUMsQ0FBUDs7QUFDQSxNQUFJQyxNQUFKLEVBQVk7QUFDVkUsT0FBRyxJQUFJLGFBQWFGLE1BQXBCO0FBQ0Q7O0FBQ0RHLEdBQUMsQ0FBQ0MsSUFBRixDQUNFRixHQURGLEVBRUVHLElBRkYsQ0FFTyxVQUFDQyxJQUFELEVB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QVksQ0FBQ3JELElBQWIsR0FBb0IsVUFBcEI7QUFDQXFELGNBQVksQ0FBQ0csV0FBYixDQUF5QkYsUUFBUSxDQUFDRyxjQUFULENBQXdCTCxPQUF4QixDQUF6QjtBQUNBRSxVQUFRLENBQUNJLElBQVQsQ0FBY0YsV0FBZCxDQUEwQkgsWUFBMUI7QUFFRCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRDb21tZW50cyAoYXBpVXJsLCBzaXRlS2V5LCBiZWZvcmUsIGNiKSB7XG4gIGxldCB1cmwgPSBgJHthcGlVcmx9L2FwaV9jb21tZW50cy5waHA/c2l0ZV9rZXk9JHtzaXRlS2V5fWBcbiAgaWYgKGJlZm9yZSkge1xuICAgIHVybCArPSAnJmJlZm9yZT0nICsgYmVmb3JlXG4gIH1cbiAgJC5hamF4KFxuICAgIHVybCxcbiAgKS5kb25lKChkYXRhKSA9PiB7XG4gICAgY2IoZGF0YSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENvbW1lbnQgKGFwaVVybCwgc2l0ZUtleSwgZGF0YSwgY2IpIHtcbiAgJC5hamF4KHtcbiAgICB0eXBlOiAnUE9TVCcsXG4gICAgdXJsOiBgJHthcGlVcmx9L2FwaV9hZGRfY29tbWVudHMucGhwYCxcbiAgICBkYXRhXG4gIH0pLmRvbmUoZGF0YSA9PiB7XG4gICAgY2IoZGF0YSlcbiAgfSk7XG59IiwiaW1wb3J0IHsgZ2V0Q29tbWVudHMsIGFkZENvbW1lbnQgfSBmcm9tICcuL2FwaS5qcyc7XG5pbXBvcnQgeyBhcHBlbmRDb21tZW50VG9ET00sIGFwcGVuZFN0eWxlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBjc3NUZW1wbGF0ZSwgZ2V0TG9hZE1vcmVCdG4sIGdldEZvcm0gfSBmcm9tICcuL3RlbXBsYXRlLmpzJ1xuXG5mdW5jdGlvbiBsb2FkQ29tbWVudHMoY29udGFpbmVyLCBkYXRhKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGNvbW1lbnQgPSBkYXRhW2ldO1xuICAgIGFwcGVuZENvbW1lbnRUb0RPTShjb250YWluZXIsIGNvbW1lbnQpO1xuICB9XG59XG5hcHBlbmRTdHlsZShjc3NUZW1wbGF0ZSk7XG5leHBvcnQgZnVuY3Rpb24gaW5pdChvcHRpb25zKSB7XG4gIGxldCBzaXRlS2V5ID0gJyc7XG4gIGxldCBhcGlVcmwgPSAnJztcbiAgbGV0IGNvbW1lbnRzRE9NID0gbnVsbDtcbiAgbGV0IGxhc3RJZCA9IG51bGw7XG4gIGxldCBpc0VuZCA9IGZhbHNlO1xuICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG4gIGxldCBsb2FkTW9yZUNsYXNzTmFtZTtcbiAgbGV0IGNvbW1lbnRDbGFzc05hbWU7XG4gIGxldCBjb21tZW50c1NlbGVjdG9yO1xuICBsZXQgZm9ybUNsYXNzTmFtZTtcbiAgbGV0IGZvcm1TZWxlY3RvcjtcblxuICBzaXRlS2V5ID0gb3B0aW9ucy5zaXRlS2V5O1xuICBhcGlVcmwgPSBvcHRpb25zLmFwaVVybDtcbiAgY29udGFpbmVyRWxlbWVudCA9ICQob3B0aW9ucy5jb250YWluZXIpO1xuICBsb2FkTW9yZUNsYXNzTmFtZSA9IGAke3NpdGVLZXl9LWxvYWQtbW9yZS1idG5gO1xuICBjb21tZW50Q2xhc3NOYW1lID0gYCR7c2l0ZUtleX0tY29tbWVudHNgO1xuICBjb21tZW50c1NlbGVjdG9yID0gYC4ke2NvbW1lbnRDbGFzc05hbWV9YDtcbiAgZm9ybUNsYXNzTmFtZSA9IGAke3NpdGVLZXl9LWFkZC1jb21tZW50cy1mb3JtYDtcbiAgZm9ybVNlbGVjdG9yID0gYC4ke2Zvcm1DbGFzc05hbWV9YDtcblxuICBjb250YWluZXJFbGVtZW50LmFwcGVuZChnZXRGb3JtKGZvcm1DbGFzc05hbWUsY29tbWVudENsYXNzTmFtZSkpO1xuXG5cbiAgY29tbWVudHNET00gPSAkKGNvbW1lbnRzU2VsZWN0b3IpO1xuICBnZXROZXdDb21tZW50cygpO1xuICAkKGNvbW1lbnRzU2VsZWN0b3IpLm9uKCdjbGljaycsIGAuJHtsb2FkTW9yZUNsYXNzTmFtZX1gLCAoKSA9PiB7XG4gICAgJChgLiR7bG9hZE1vcmVDbGFzc05hbWV9YCkucmVtb3ZlKCk7XG4gICAgZ2V0TmV3Q29tbWVudHMoKTtcbiAgfSlcbiAgJChmb3JtU2VsZWN0b3IpLnN1Ym1pdChlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3Qgbmlja25hbWVET00gPSAkKGAke2Zvcm1TZWxlY3Rvcn0gaW5wdXRbbmFtZT1uaWNrbmFtZV1gKTtcbiAgICBjb25zdCBjb250ZW50RE9NID0gJChgJHtmb3JtU2VsZWN0b3J9IHRleHRhcmVhW25hbWU9Y29udGVudF1gKTtcbiAgICBsZXQgbmV3Q29tbWVudERhdGEgPSB7XG4gICAgICBzaXRlX2tleTogc2l0ZUtleSxcbiAgICAgIG5pY2tuYW1lOiBuaWNrbmFtZURPTS52YWwoKSxcbiAgICAgIGNvbnRlbnQ6IGNvbnRlbnRET00udmFsKClcbiAgICB9XG4gICAgYWRkQ29tbWVudChhcGlVcmwsIHNpdGVLZXksIG5ld0NvbW1lbnREYXRhLCBkYXRhID0+IHtcbiAgICAgIGlmICghZGF0YS5vaykge1xuICAgICAgICBhbGVydChkYXRhLm1lc3NhZ2UpO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIG5ld0NvbW1lbnREYXRhID0gZGF0YS5kaXNjdXNzaW9ucztcbiAgICAgIGFwcGVuZENvbW1lbnRUb0RPTShjb21tZW50c0RPTSwgbmV3Q29tbWVudERhdGEsIHRydWUpO1xuICAgICAgbmlja25hbWVET00udmFsKCcnKTtcbiAgICAgIGNvbnRlbnRET00udmFsKCcnKTtcbiAgICB9KTtcbiAgfSlcblxuICBmdW5jdGlvbiBnZXROZXdDb21tZW50cygpIHtcbiAgICBnZXRDb21tZW50cyhhcGlVcmwsIHNpdGVLZXksIGxhc3RJZCwgZGF0YSA9PiB7XG4gICAgICBpZiAoIWRhdGEub2spIHtcbiAgICAgICAgYWxlcnQoZGF0YS5tZXNzYWdlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbW1lbnRzID0gZGF0YS5kaXNjdXNzaW9ucztcbiAgICAgIGxvYWRDb21tZW50cyhjb21tZW50c0RPTSwgY29tbWVudHMpO1xuICAgICAgY29uc3QgbGVuZ3RoID0gY29tbWVudHMubGVuZ3RoO1xuICAgICAgLy8g5YGH5aaCIGNvbW1lbnQg5bCR5pa85LqU5YmH77yM5bCx55u05o6l5Zue5YKz77yM5LiN5Z+36KGM5LiL6Z2i56iL5byP56K8XG4gICAgICBpZiAobGVuZ3RoIDwgNSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3RJZCA9IGNvbW1lbnRzW2xlbmd0aCAtIDFdLmlkO1xuICAgICAgICBjb25zdCBsb2FkTW9yZUJ0biA9IGdldExvYWRNb3JlQnRuKGxvYWRNb3JlQ2xhc3NOYW1lKTtcbiAgICAgICAgY29tbWVudHNET00uYXBwZW5kKGxvYWRNb3JlQnRuKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cblxuIiwiZXhwb3J0IGNvbnN0IGNzc1RlbXBsYXRlID0gJy5jYXJkeyBtYXJnaW4tdG9wOiAxMHB4OyB9J1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZvcm0oY2xhc3NOYW1lLCBjb21tZW50c0NsYXNzTmFtZSl7XG5yZXR1cm5gXG4gICAgICA8Zm9ybSBjbGFzcz1cIiR7Y2xhc3NOYW1lfVwiPlxuICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxsYWJlbCA+5pqx56ixPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5pY2tuYW1lXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIuiri+i8uOWFpeaaseeosVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICA8bGFiZWw+55WZ6KiA5YWn5a65PC9sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIG5hbWU9XCJjb250ZW50XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiA+PC90ZXh0YXJlYT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj7pgIHlh7o8L2J1dHRvbj5cbiAgICA8L2Zvcm0+XG4gICAgPGRpdiBjbGFzcz1cIiR7Y29tbWVudHNDbGFzc05hbWV9XCI+PC9kaXY+YDtcbn0gXG4gIGV4cG9ydCBmdW5jdGlvbiBnZXRMb2FkTW9yZUJ0bihjbGFzc05hbWUpe1xuICAgIHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cIiR7Y2xhc3NOYW1lfSBidG4gYnRuLXByaW1hcnkgbW9yZS1idG5cIj5Nb3JlPC9idXR0b24+YFxuICB9IiwiZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZSAodG9PdXRwdXQpIHtcbiAgcmV0dXJuIHRvT3V0cHV0LnJlcGxhY2UoL1xcJi9nLCAnJmFtcDsnKVxuICAgIC5yZXBsYWNlKC9cXDwvZywgJyZsdDsnKVxuICAgIC5yZXBsYWNlKC9cXD4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cXFwiL2csICcmcXVvdDsnKVxuICAgIC5yZXBsYWNlKC9cXCcvZywgJyYjeDI3JylcbiAgICAucmVwbGFjZSgvXFwvL2csICcmI3gyRicpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZENvbW1lbnRUb0RPTSAoY29udGFpbmVyLCBjb21tZW50LCBpc1ByZXBlbmQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxuICAgICAgICAgICAgPGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPiAke2VzY2FwZShjb21tZW50Lm5pY2tuYW1lKX08L2g1PlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjYXJkLXN1YnRpdGxlIG1iLTIgdGV4dC1tdXRlZFwiPiR7ZXNjYXBlKGNvbW1lbnQuY3JlYXRlZF90aW1lKX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPiR7ZXNjYXBlKGNvbW1lbnQuY29udGVudCl9PC9wPlxuICAgICAgICAgIDwvZGl2PmA7XG4gIGlmIChpc1ByZXBlbmQpIHtcbiAgICBjb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIuYXBwZW5kKGVsZW1lbnQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRTdHlsZShjc3NUZW1wKXtcbiAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnO1xuICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzVGVtcCkpO1xuICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcblxufSJdLCJzb3VyY2VSb290IjoiIn0=