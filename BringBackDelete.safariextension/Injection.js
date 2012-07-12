//
//  Injection.js
//  BringBackDelete
//
//  Created by Richard Heard on 10/03/12.
//  Copyright (c) 2012 Richard Heard. All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions
//  are met:
//  1. Redistributions of source code must retain the above copyright
//  notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//  notice, this list of conditions and the following disclaimer in the
//  documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//  derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
//  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
//  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
//  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
//  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
//  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
//  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


//init
function _init() {
	// Only add if topWindow... not iframe
	if (window.top === window) {
		document.addEventListener('keydown', keyEvent, true);
	}
}


/* -------------------------------------------------------------------------- */
//handle key events
function keyEvent(event) {

	//handle delete key if not currently focused in an editable field or embedded element.
	if (isDelete(event) && !isEditableElement(event.target) && !isEmbeddedElement(event.target)){
		event.stopPropagation();
		event.preventDefault();
		history.back();
	}
	
	//if in an editable field hook up esc to blur
	if (isEscape(event) && isEditableElement(event.target)){
		event.stopPropagation();
		event.preventDefault();
		event.target.blur();
	
	}
}


/* -------------------------------------------------------------------------- */
//editable elements (ie. things that take focus)
function isEditableElement(element) {
  if (element.getAttribute("contentEditable") == "true") return true;
  var focusableElements = ["input", "textarea", "select", "button"];
  return focusableElements.indexOf(element.tagName.toLowerCase()) >= 0;
}

// Embedded elements like Flash and quicktime can obtain focus. We dont want to steal focus from one of these elements incase they contain a form etc.
function isEmbeddedElement(element) {
  var embeddedElements = ["embed", "object"];
	return embeddedElements.indexOf(element.tagName.toLowerCase) >= 0; 
}


/* -------------------------------------------------------------------------- */
//keyboard misc
var keyCodes = { ESC: 27, backspace: 8, delete: 46, enter: 13, space: 32, shiftKey: 16, f1: 112, f12: 123, left: 37, up: 38, right: 39, down: 40};

function isEscape(event) {
	return event.keyCode == keyCodes.ESC;
}

function isDelete(event) {
	return event.keyCode == keyCodes.delete || event.keyCode == keyCodes.backspace
}


/* -------------------------------------------------------------------------- */
//perform our page init
_init();

