/*! FDS.js @ 2017, yamoo9.net */

// 함수형 프로그래밍 -> 객체형 프로그래밍 (생성자 함수, 프로토타입 객체를 활용한 생성 패턴)

// 캡슐화 <- 모듈(IIFE) 패턴
// 객체 생성 <- 클래스(생성자 함수) 정의
// 객체 능력 확장 <- 프로토타입 확장

// 호환성 여부: IE 9+, ES 5+
var FDS = (function(global){
  'use strict';

  // 감춰진 데이터 또는 지역 내 변수, 함수
  var document = global.document;
  var toString = Object.prototype.toString;
  var from     = Array.prototype.from;
  var slice    = Array.prototype.slice;
  var forEach  = Array.prototype.forEach;

  // 자주 사용되는 유틸리티 함수
  function type(data) {
    return toString.call(data).slice(8,-1).toLowerCase();
  }
  function isType(data, kind) {
    validateError(kind, '!string', '2번째 전달인자는 문자열이어야 합니다');
    return type(data) === kind;
  }
  function validateError(data, kind, error_message) {
    data = type(data);
    if ( kind.indexOf('!') === 0 ) {
      if ( data !== kind.slice(1) ) { throw error_message || '두 값이 다르기에 오류입니다.'; }
    } else {
      if ( data === kind ) { throw error_message || '두 값은 동일하기에 오류입니다.'; }
    }
    return '오류는 발생하지 않았습니다';
  }
  function isNumber(data) {
    return isType(data, 'number') && !Number.isNaN(data);
  }
  function isString(data) {
    return isType(data, 'string');
  }
  function isBoolean(data) {
    return isType(data, 'boolean');
  }
  function isFunction(data) {
    return isType(data, 'function');
  }
  function isArray(data) {
    return isType(data, 'array');
  }
  function isObject(data) {
    return isType(data, 'object');
  }
  function makeArray(o) {
    return slice.call(o);
  }
  var mixin = function() {
    var args = makeArray(arguments);
    for (var i=0, l=args.length; i<l; i++) {
      if ( !isType(args[i], 'object') && !isType(args[i], 'function') ) {
        throw '전달인자로 객체만 허용합니다.';
      }
    }
    var mixin_obj = args.shift();
    var next = args.shift();
    do {
      for ( var prop in next ) {
        if ( next.hasOwnProperty(prop) ) {
          mixin_obj[prop] = next[prop];
        }
      }
      next = args.shift();
    } while ( next );

    return mixin_obj;
  };
  var forEachFn = function() {
    if ( forEach ) {
      return function(o, callback) {
        o.forEach(callback);
      }
    } else {
      return function(o, callback) {
        for ( var i=0, l=o.length; i<l; ++i ) {
          callback(o[i], i, o);
        }
      }
    }
  }();
  function each(o, callback) {
    validateError(callback, '!function');
    if ( !isObject(o) && o.length ) { o = makeArray(o); }
    isArray(o) && forEachFn(o, callback);
    if ( isObject(o) ) {
      for ( var prop in o ) {
        o.hasOwnProperty(prop) && callback(prop, o[prop], o);
      }
    }
    if ( o.nodeType === 1 ) {
      for ( var prop in o ) {
        callback(prop, o[prop], o);
      }
    }
  }

  // --------------------------------------------
  // 생성자 함수(클래스) 정의
  // new를 강제화하지 않는 패턴 활용
  // 팩토리 패턴 활용
  function FDS(arg) {
    // 1.1 사용자가 아무런 값도 전달하지 않았을 경우
    // 1.2 빈 문자열을 전달한 경우

    // 2. 요소노드

    // 3. HTML 코드(문자열)

    // 4.1 노드리스트, HTML콜렉션, 배열
    // 4.2 CSS 선택자(문자열)
  }

  // --------------------------------------------
  // 생성자 함수의 메서드(클래스 메서드, 스태틱 메서드)
  FDS.include = function(o){
    mixin(FDS, o);
  };
  FDS.include({
    isNumber   : isNumber,
    isString   : isString,
    isBoolean  : isBoolean,
    isFunction : isFunction,
    isArray    : isArray,
    isObject   : isObject,
    makeArray  : makeArray,
    each       : each
  });

  // --------------------------------------------
  // 프로토타입 객체 정의 (생성된 모든 객체가 공유하는 멤버)

  // --------------------------------------------
  // 전역에 공개된 별칭(Alias) 설정 여부
  // 생성자 함수 반환(외부 공개)
  return FDS;

})(window);