window.onscroll = function showHeader(){
    var header = document.querySelector('header');
    if(window.pageYOffset > 850){
        header.classList.add('fixed');}
    else {
        header.classList.remove('fixed');}}

function burgerMenu(selector) {
let menu = $(selector);
let button = menu.find('.burger-menu_button', '.burger-menu_lines');
let links = menu.find('.burger-menu_link');
let overlay = menu.find('.burger-menu_overlay');

button.on('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

links.on('click', () => toggleMenu());
overlay.on('click', () => toggleMenu());

function toggleMenu(){
    menu.toggleClass('burger-menu_active');
    
    if (menu.hasClass('burger-menu_active')) {
    $('body').css('overlow', 'hidden');
    } else {
    $('body').css('overlow', 'visible');
    }
}
}
burgerMenu('.burger-menu');

//Слайдер сравнения изображения
jQuery(document).ready(function($){
    checkPosition($('.perekhodnaya-kartinka'));
    $(window).on('scroll', function(){
    checkPosition($('.perekhodnaya-kartinka'));
    });
    drags($('.handle'), $('.ameneniye-brazheniya'), $('.perekhodnaya-kartinka'), $('.keniyaraza-meraizob[data-type="original"]'), $('.keniyaraza-meraizob[data-type="modified"]'));
    $(window).on('resize', function(){
    updateLabel($('.keniyaraza-meraizob[data-type="modified"]'), $('.ameneniye-brazheniya'), 'left');
    updateLabel($('.keniyaraza-meraizob[data-type="original"]'), $('.ameneniye-brazheniya'), 'right');
    });
});
function checkPosition(container) {
    if( $(window).scrollTop() + $(window).height()*0.5 > container.offset().top) {
    container.addClass('is-visible');
    }
}
function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
    dragElement.on("mousedown vmousedown", function(e) {
    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');
    var dragWidth = dragElement.outerWidth(),
    xPosition = dragElement.offset().left + dragWidth - e.pageX,
    containerOffset = container.offset().left,
    containerWidth = container.outerWidth(),
    minLeft = containerOffset + 10,
    maxLeft = containerOffset + containerWidth - dragWidth - 10;
    dragElement.parents().on("mousemove vmousemove", function(e) {
    leftValue = e.pageX + xPosition - dragWidth;
    if(leftValue < minLeft ) {
    leftValue = minLeft;
    } else if ( leftValue > maxLeft) {
    leftValue = maxLeft;
    }
    widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
    $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
    $(this).removeClass('draggable');
    resizeElement.removeClass('resizable');
    });
    $('.resizable').css('width', widthValue);  
    updateLabel(labelResizeElement, resizeElement, 'left');
    updateLabel(labelContainer, resizeElement, 'right');
    }).on("mouseup vmouseup", function(e){
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
    });
    e.preventDefault();
    }).on("mouseup vmouseup", function(e) {
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
    });
}
function updateLabel(label, resizeElement, position) {
    if(position == 'left') {
    ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
    } else {
    ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
    }
}