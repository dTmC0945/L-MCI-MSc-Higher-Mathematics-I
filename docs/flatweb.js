// 
// #INFO: A Simple JS for WebBook Interface
// 
// -----------------------------------------------------------------------------
// 
// Author: DTMc
// 
// This file is part of lms.
// 
// lms is free software: you can redistribute it and/or modify it under the
// terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version.
// 
// lms is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
// A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
// 
// -----------------------------------------------------------------------------
//
// Define any relevant constants and variables here.
//
// Variable to store all the keyboard navigation available

var keyboardHelpMenu = {
    'h' : 'Enable/Disable Help Menu',
    'l' : 'Visit Lecture Structure',
    'q' : 'Kill Pop-up Window',
    'n' : 'Next Chapter',
    'p' : 'Previous Chapter',
    'b' : 'Bottom of Page',
    'u' : 'Top of Page',
    'i' : 'Go to Entry Point',
    't' : 'Enable/Disable Table of Contents',
    'Ctrl + k' : 'Search within the website'
};

// Defines the sizes of the three display categories.
var const_viewScreenGuide = {
    "Max-Computer" : "1420",
    "Computer"     : "1200", 
    "Tablet"       : "1000",
    "Phone"        : "600" ,
}

var moodMenu = {
    "Visit" : [{
        
        "Central GitHub" : [{
            "key"         : "Link",
            "command"     : "window.location.href = $('.toc-links').find('a').eq(0).attr('href')"
        }],
        "Google Scholar" : [{
            "key"         : "Link",
            "command"     : "window.location.href = $('.toc-links').find('a').eq(1).attr('href')"
        }],
        "ResearchGate" : [{
            "key"         : "Link",
            "command"     : "window.location.href = $('.toc-links').find('a').eq(2).attr('href')"
        }],

        "Sep-i" : [],
       
        "Proposed Thesis Topics" : [{
            "key"         : "Link",
            "command"     : "window.location.href = $('.toc-links').find('a').eq(3).attr('href')"
        }],
        "mciDoc LaTeX Documentation" : [{
            "key"         : "Link",
            "command"     : "window.location.href = $('.toc-links').find('a').eq(4).attr('href')"
        }],
        
    }],
    
    "Overview" : [
        {
            "Help Menu" : [
                {
                    "key"         : "h",
                    "command"     : "toggleHelp()"
                }
            ],

            "Reset Page" : [
                {
                    "key"         : "r",
                    "command"     : "menu__refreshPage()"
                }
            ],

            "View Lecture Information" : [{

                 "key"         : "l",
                "command"      : "menu__showLectureStructure()"
                
            }],


            "Sep-iii" : [],

            "Enable/Disable Main TOC" : [{
                "key"         : "t",
                "command"     : "menu__toggleTOC()"
            }],

            "Toggle CurrentPage TOC" : [{
                "key"         : ".",
                "command"     : "menu__toggleCurrentPageTOC()"
            }],

            "View Detailed TOC" : [{
                "key"         : ",",
                "command"     : "menu__toggleDetailTOC()"
            }],

            "Sep-ii" : [],

            "Reader View" : [{
                "key"         : "w",
                "command"     : "view__reader()"
            }],

            "About WebBook" : [{
                "key"         : "h",
                "command"     : "toggleHelp()"
            }],
            
            "Quit WebBook" : [{
                "key"         : "Ctrl + q",
                "command"     : "menu__killCurrentTab()"
                }]
        }
    ],
    "Navigate" : [{
        
        "Top of Current Page" : [{
            "key"         : "u",
            "command"     : "navigate__gotoTopOfPage()"
        }],
        
        "Bottom of Current Page" : [{
            "key"         : "b",
            "command"     : "navigate__toBottomOfPage()"
        }],
  
        "Sep-i" : [],

        "To Next Topic" : [{
            "key"         : "n",
            "command"     : "navigate__gotoNextChapter()"
        }],

        "To Previous Topic" : [{
            "key"         : "p",
            "command"     : "navigate__gotoPrevChapter()"
        }],

        "Sep-ii" : [],
        
         "To Chapter Page" : [{
            "key"         : "d",
            "command"     : "navigate__gotoChapterPage()"
         }],

         "To Index Page" : [{
             "key"         : "i",
             "command"     : "navigate__gotoIndexPage()"
         }],

        
        }]
};

//
// A List of all relevant documentation sites for possible querying
var DocumentationSites = {
    'pytorch-2.13'                : 'https://docs.pytorch.org/docs/2.13/generated/',
    'pytorch-2.13.torch'          : 'https://docs.pytorch.org/docs/2.13/generated/torch.',
    'pytorch-2.13.torch.nn'       : 'https://docs.pytorch.org/docs/2.13/generated/torch.nn.',
    'pytorch-2.13.torch.nn.utils' : 'https://docs.pytorch.org/docs/2.13/generated/torch.nn.utils.',
    'sklearn.preprocessing'       : 'https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.',
}
//
// Here we write a simple switch-case statement to automatically choose the
// correct color scheme for the lecture materials.
//
var electroScience     = ['Drive Technology',
                          'Drive Systems',
                          'Non-Linear Electronics'];

var fundamentalScience = ['Higher Mathematics I',
                          'Higher Mathematics II',
                          'Electrodynamics'];

var aiScience          = ['Data Science I',
                          'Data Science II'];

var roboticScience     = ['Mobile Robotics',
                          'Autonomous Mobile Robotics'];

var computerScience    = ['Academic Writing'];

// Store the entry point to the website. This value needs to be kept as
// index.html.
var entryPoint = 'index.html'


// Control how the margin images are checked. Start with false and make sure
// it is checked only once as it hangs the web-browser. 
var bool_marginImageCheck = false;


// Used in representing what icons/links do and then can be relayed to modeline.
var ModeLineSelector = {
}

// FUNCTIONS -------------------------------------------------------------------

/**
 * Detects if two elements are colliding
 *
 * Credit goes to BC on Stack Overflow, cleaned up a little bit
 *
 * @link http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery
 * @param $div1
 * @param $div2
 * @returns {boolean}
 */
function util__isColliding ( $div1, $div2 ) {
	// Div 1 data
	var d1_offset             = $div1.offset();
	var d1_height             = $div1.outerHeight( true );
	var d1_width              = $div1.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = $div2.offset();
	var d2_height             = $div2.outerHeight( true );
	var d2_width              = $div2.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = (
        d1_distance_from_top < d2_offset.top ||
            d1_offset.top > d2_distance_from_top ||
            d1_distance_from_left < d2_offset.left ||
            d1_offset.left > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
};


/** 
 * Short-hand IF/ELSE to give a BOOLEAN if it is in given VIEW.
 *
 * @param view The view action is to be done, defined in `const_viewScreenGuide'
 * @return boolean value of the given VIEW.
 */
function util__describeViewState (view) {

    switch (view) {


    case "Max-Computer":
        
        if (window.matchMedia('screen and (min-width: ' +
                              const_viewScreenGuide["Max-Computer"] +  'px)')
            .matches) {
            return true;
            
        } else {
            
            return false;
        }
        
        break;

        
    case "Computer":
        
        if (window.matchMedia('screen and (min-width: ' +
                              const_viewScreenGuide["Computer"] +  'px)')
            .matches) {
            return true;
            
        } else {
            
            return false;
        }
        
        break;

    case "Tablet":
        
        if (window.matchMedia('screen and (min-width: ' +
                              const_viewScreenGuide['Phone'] +  'px)')
            .matches
            &&
            window.matchMedia('screen and (max-width: ' +
                              const_viewScreenGuide['Computer'] +  'px)')
            .matches) {
            return true;
            
        } else {
            
            return false;
            
        }

        break;

    case "Phone":
        
        if (window.matchMedia('screen and (max-width: ' +
                              const_viewScreenGuide['Phone'] +  'px)')
            .matches) {
            
            return true;
            
        } else {
            
            return false;
        }
        
        break;
    }
    
}


/** 
 * Allows insertion of text to the modeline.
 *
 * @param text Text to be shown in modeline
 *
 * @return 
 */
function util__updateModeline (text) {

    $('.supp-line').text('')

    var newText = text;

    $('.supp-line').html('<p>' + newText + '</p>');

}

/** 
 * Present the user the current view of WebBook.
 * The views supported are `Computer', `Tablet', and `Phone'.
 *
 * @return 
 */
function menu__describeState() {

    
    // Here we do a small check-up and remove an unnecessary link from the menu
    if( $('.crosslinks-bottom').find('a').last().text().length == 0) {
       // $('.crosslinks-bottom').find('a').last().remove()
    }
    
    $('.crosslinks-bottom').find('.display-state').remove();

    if (util__describeViewState("Computer")) {
        
        $('.crosslinks-bottom')
            .append('<div class=display-state>[Computer-View]</div>')
        
    } else if(util__describeViewState("Tablet")) {

        $('.crosslinks-bottom')
            .append('<div class=display-state>[Tablet-View]</div>')

    } 
}

/** 
 * Control whether the TOC is displayed or not.
 *
 *
 * @return 
 */
function menu__toggleTOC() {

    // First determine the current state of the primary TOC.
    const tocState = $('nav.wide').css('display');

    $('.chapter').attr('id', 'blur-transition');

    if (tocState == 'none') {
        $("nav.wide")
            .stop()
            .animate({width: 'toggle', opacity: 'toggle' }, 'slow');
        $('.crosslinks-bottom').css('width', '100%')


        // Show screen size specific actions
        if (util__describeViewState("Computer")) {
          
            
        } else if (util__describeViewState("Tablet")) {
            // add blur to the background when the table of contents is shown.
            $('.crosslinks-bottom').hide();
            $('.chapter-contents').hide();
            $('.chapter').addClass("blur");
        };
        
    } else {
        $("nav.wide")
            .stop()
            .animate({width: 'toggle', opacity: 'toggle' }, 'slow');
        $('.crosslinks-bottom').animate({width : '100%'});
       
         if (util__describeViewState("Computer")) {
        
        } else if (util__describeViewState("Tablet")) {
            // add blur to the background when the table of contents is shown.
            $('.crosslinks-bottom')
                .animate({height: 'toggle', opacity: 'toggle' }, 'slow');
            
            $('.chapter').removeClass("blur");
        };
    } 
}

function menu__getEqRef () {
   
    $('a').hover(function(){
        $('.eqref-block').remove();
        var $div = $("<div>", {class: "eqref-block"});
        $("article").append($div)
        link = $(this).attr('href').replace(/#/g, '')
        console.log(link)
        $div.append($('[id="' + link + '"]').parent().clone())
        MathJax.typeset()
    },  function(){
        $('.eqref-block').remove();
    });
}

/** 
 * Kills current tab. As we can not close it until unless, the tab was opened by
 * code we need to circumvent it by creating a faux tab.
 *
 *
 * @return 
 */
function menu__killCurrentTab() {

    var win = window.open("about:blank", "_self");

    win.close();
}

function util__wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

function menu__makeCurrentPageTOC() {
    // Start by parsing the entire Chapter to get the content.

    $('.chapter-contents').remove();
    
    const headings = document.querySelectorAll('page h3, page h4, page h5, page h6');

    const post     = document.querySelector('.core-line');
    
    const details = document.createElement('div');
    
    details.setAttribute('class', 'chapter-contents');
    
    const content = document.createElement('div');    
    content.setAttribute('class', 'content');
    
    const summary = document.createElement('h3');
    summary.setAttribute('class', 'header');
    summary.innerHTML = 'Page Table of Contents';

    details.append(content);    
    content.append(summary);
    
    headings.forEach((el) => {

        const a     = document.createElement('a');
        const title = document.createElement('span');
        title.setAttribute('class', 'title');
        
        const number = document.createElement('span');
        number.setAttribute('class', 'number');
        
        const header = document.createElement('span');
        
        // Remove any newlines from the string prior to parsing
        pre_header   = el.textContent.replace(/[\r\n]+/gm, " ");
        
        if (el.tagName == 'H3')
        {
            header.setAttribute('class', 'sectionToc');
            
            a.textContent      = pre_header.replace(/^\s*[0-9]+\.[0-9]\s*(.*)/g, '$1');

            if (/^\s*([0-9]+\.[0-9]).*/.test(pre_header))
            {           
                number.textContent = pre_header.replace(/^\s*([0-9]+\.[0-9]).*/g, '$1');
            }
            else
            {
                number.textContent = ''
            }
        }
        else if (el.tagName == 'H4')
        {
            header.setAttribute('class', 'subsectionToc');
            a.textContent = pre_header.replace(/^\s*[0-9]+\.[0-9]+\.[0-9]+\s*(.*)/g, '$1');

            if (/^\s*([0-9]+\.[0-9]+\.[0-9]).*/.test(pre_header))
            { 
                number.textContent = pre_header.replace(/^\s*([0-9]+\.[0-9]+\.[0-9]).*/g, '$1');
            }
            else
            {
                number.textContent = ''
            }
                
        }
        else if (el.tagName == 'H5')
        {
            header.setAttribute('class', 'subsubsectionToc');
            a.textContent = pre_header;
            a.textContent = pre_header;
            number.textContent = '';            
        }
        
       
        title.append(a);
        pp = el.textContent.replace(/^\s*([0-9]\.[0-9]\.[0-9])\s.*/g, '$1');
        a.href = '#' + el.id;
        header.append(number);
        header.append(title);
        content.append(header);
    });
    
    
    post.prepend(details);

    if ($('.def-block').length > 0) {

        $('.chapter-contents')
            .find('.content')
            .append('<div class="toc-command-contents">' +
                    '<div class="section-header">' +
                    '<h3 class="header">' +
                    'Code Definitions' +
                    '</h3>'  +
                    '</div>' + 
                    '</div>');

        $('.def-block').each(function() {

            // First determine the title of the block
            var _commandType = $(this)
                .find('.category-def')
                .text().replace(/[\r\n]+/gm, " ");

            var _commandName = $(this)
                .find('.def-name')
                .text().replace(/[\r\n]+/gm, " ");

            var _commandHeader = '<span class="title"><b>' + _commandType + '</b><span class="def-name">' + _commandName + '</span></span><span class="number"></span>'
           ;

            var _commandIDlink = $(this).find('a').attr('href');

            console.log(_commandIDlink)

            $('.chapter-contents')
                .find('.toc-command-contents')
                .append(
                    '<span class="generic-command-header">' +
                        '<a href="' + _commandIDlink + '">' +
                        _commandHeader +
                        '</a>' +
                        '</span>');

        });
    }

    if ($('.exer-block').length > 0) {
        
        $('.chapter-contents')
            .find('.content')
            .append('<div class="toc-exer-contents">' +
                    '<div class="section-header">' +
                    '<h3 class="header">' +
                    'Exercise Blocks' +
                    '</h3>'  +
                    '</div>' + 
                    '</div>');
        
        $('.exer-block').each(function() {

            // First determine the title of the block
            var _infoHeader = $(this)
                .find('.exer-upper')
                .text()
                .replace(/^\s*Example\s(.*?)\s*:\s*(.*)\s*$/g, '<span class="title">$2</span><span class="number">$1</span>');

            // Generate the ID Link
            var _infoIDlink = $(this)
                .find('.exer-upper')
                .text()
                .replace(/^\s*Example\s(.*?)\s*:\s*(.*)\s*$/g, 'exer-block $1')
                .replace(/ /g, '-')
                .replace(/\s*$/g, '');

            // Next add the ID attribute so it can be later directed.
            $(this).attr('id',_infoIDlink);

            $('.chapter-contents')
                .find('.toc-exer-contents')
                .append(
                    '<p class="generic-info-header">' +
                        '<a href="#' + _infoIDlink + '">' +
                        _infoHeader +
                        '</a>' +
                        '</p>');
        });

    }

    if ($('.theo-block').length > 0) {
        
        $('.chapter-contents')
            .find('.content')
            .append('<div class="toc-theo-contents">' +
                    '<div class="section-header">' +
                    '<h3 class="header">' +
                    'Theory Blocks' +
                    '</h3>'  +
                    '</div>' + 
                    '</div>');
        
        $('.theo-block').each(function() {

            // First determine the title of the block
            var _infoHeader = $(this)
                .find('.theo-upper')
                .text()
                .replace(/^\s*Theory\s(.*?)\s*:\s*(.*)\s*$/g, '<span class="title">$2</span><span class="number">$1</span>');

            // Generate the ID Link
            var _infoIDlink = $(this)
                .find('.theo-upper')
                .text()
                .replace(/^\s*Theory\s(.*?)\s*:\s*(.*)\s*$/g, 'theo-block $1')
                .replace(/ /g, '-')
                .replace(/\s*$/g, '');

            // Next add the ID attribute so it can be later directed.
            $(this).attr('id',_infoIDlink);

            $('.chapter-contents')
                .find('.toc-theo-contents')
                .append(
                    '<p class="generic-info-header">' +
                        '<a href="#' + _infoIDlink + '">' +
                        _infoHeader +
                        '</a>' +
                        '</p>');
        });

    }

    if ($('.info-block').length > 0) {
        
        $('.chapter-contents')
            .find('.content')
            .append('<div class="toc-info-contents">' +
                    '<div class="section-header">' +
                    '<h3 class="header">' +
                    'Information Blocks' +
                    '</h3>'  +
                    '</div>' + 
                    '</div>');
        
        $('.info-block').each(function() {

            // First determine the title of the block
            var _infoHeader = $(this)
                .find('.info-upper')
                .text()
                .replace(/^\s*Information\s(.*?)\s*:\s*(.*)\s*$/g, '<span class="title">$2</span><span class="number">$1</span>');

            // Generate the ID Link
            var _infoIDlink = $(this)
                .find('.info-upper')
                .text()
                .replace(/^\s*Information\s(.*?)\s*:\s*(.*)\s*$/g, 'info-block $1')
                .replace(/ /g, '-')
                .replace(/\s*$/g, '');

            // Next add the ID attribute so it can be later directed.
            $(this).attr('id',_infoIDlink);

            $('.chapter-contents')
                .find('.toc-info-contents')
                .append(
                    '<p class="generic-info-header">' +
                        '<a href="#' + _infoIDlink + '">' +
                        _infoHeader +
                        '</a>' +
                        '</p>');
        });

    }

    if (!util__describeViewState("Max-Computer"))
    {
        $(".chapter-contents").insertAfter('.crosslinks-top')
    }{
    }
   
}


/** 
 * Enable/disable the viewing of the current page Table of contents.
 *
 *
 * @return 
 */
function menu__toggleCurrentPageTOC() {

    // First determine the current state of the primary TOC.
    const otpState = $('.chapter-contents').css('display');
        
        
        if (otpState == 'none') {
            $(".chapter-contents")
                .stop()
                .animate({width: 'toggle', opacity: 'toggle' }, 'slow');
        } else {
            $(".chapter-contents")
                .stop()
                .animate({width: 'toggle', opacity: 'toggle' }, 'slow');

        }
}




/** 
 * Automatically removes the primary TOC from view if display does not support
 * it.
 *
 *
 * @return 
 */
function menu__hideTOCforProperView () {

    if (util__describeViewState("Tablet")) {

        $("nav.wide")
            .stop()
            .hide('slow');
        $('.crosslinks-bottom').css('width', '100%')

    } else {

        $("nav.wide")
            .stop()
            .show('slow');
        $('.crosslinks-bottom').css('width', '100%')
    }
}


/** 
 * Refresh Page if content is stuck.
 *
 *
 * @return 
 */
function menu__refreshPage () {
    window.location.reload();
}

/** 
 * Removes EMPTY paragraphs which were auto-generated
 *
 *
 * @return 
 */
function filter__removeEmptyParagraphs () {

        $("p").each(function(){
            var $this = $(this);
            if($this.text().trim() === '' && $this.contents().length == 0) {
                $this.remove();
            }
        });
}


/** 
 * Generates and the enables/disables help menu. A simple if/else is needed to
 * check whether the navigation button exists. If so don't add else, parse the
 * variables @keyboardHelpMenu to generate the list with all the values.
 *
 *
 * @return A Help Menu.
 */
function ShowHelpMenu() {

    if( $('.keyboard').length ) {
    } else {
        
        $('page').append('<nav class="keyboard"><b>Navigation</b></nav>');

        $.each(keyboardHelpMenu, function(index, element) {
            $('.keyboard')
                .append("<div class='keyinformation'><kbd class='pf-trigger-key'>" +
                        index +   "</kbd><span>" +
                        element + "</span></div>" );
        });
    }
    
    const helpState =
          document.getElementsByClassName('keyboard')[0].style.display;

    if ( helpState == 'none') {
        $(".keyboard")
         .animate({width: 'toggle', opacity: 'toggle' }, 'slow');
    } else {
        $(".keyboard")
         .animate({width: 'toggle', opacity: 'toggle' }, 'slow');
    }
}

function navigate__gotoNextChapter() {

    var hreflink = $('.crosslinks-top').children().eq(0).find('a').attr('href');

    if (typeof hreflink == 'undefined') {
        window
            .alert("Reached end of WebBook. There are no more chapters to continue...");        
    } else {
        window.location.href = hreflink
    }
}

function navigate__gotoPrevChapter() {
    
    var hreflink = $('.crosslinks-top').children().eq(1).find('a').attr('href');

    if (typeof hreflink == 'undefined') {
        window.alert("Reached beginning of WebBook. There are no more chapters to go back...");
    } else {
        window.location.href = hreflink
    }
}

function navigate__gotoTopOfPage () {
    document.body.scrollTop =
        document.documentElement.scrollTop = 0;
}

function navigate__toBottomOfPage () {
    window.scrollTo(0, document.body.scrollHeight);
}

function navigate__gotoIndexPage () {

    if (document.URL.includes('index.html')) {
        window.alert("You are already on Entry Point.");
    } else {    
        window.location.href = entryPoint;
    }
}


function navigate__gotoChapterPage() {

    if ($('h2').length < 1) {

        var hreflink = $('.crosslinks-top').children().eq(2).find('a').attr('href');
     
        window.location.href = hreflink
    } else {
        window.alert("You are already on a Chapter page. Nowhere to go!");
    }
}


// Display Hiders --------------------------------------------------------------

// Here we create a simple function to hide exercises and other relevant boxes
// as they are not immediately relevant to the reader.

let reader_mode = false;

function view__reader() {
    

    if ($("nav.wide").first().css('top') == "50px") {
    
        $("nav.wide").animate({top: '0'});
        $("nav.wide").animate({height: '100vh'});
    } else {

         $("nav.wide").animate({top: '50px'});
        $("nav.wide").animate({height: 'calc(100vh - 50px)'});

    }

    $(".mode-line").fadeToggle();
    $(".crosslinks-bottom").fadeToggle();
}


function HideMyBody(selected_button) {

    var qs = selected_button.parentElement.nextElementSibling;
    
    $(qs).stop().slideToggle(1000, "swing", function () {});
}


// Code Higlighting ------------------------------------------------------------

document.addEventListener('DOMContentLoaded', (event) => {

    // Here we make sure all the leading and trailing whitespaces are removed.
    $('pre').find('code').each(function(){
        $(this).text('\n' + $(this)
                     .text().replace(/^\s+|\s+$/g, ''));
    });
    
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.addPlugin(new CopyButtonPlugin());
        hljs.highlightElement(block);
    });
});



// Next we need to sort out some header information on the TOC as there is a
// slight delay between the chapter information processed by TeX and what is
// written.
function FixMyChapterHeaderInTOC () {

        let chapter_value = document.
            querySelectorAll('.chapterHead')[0]
            .innerText.split('\n').at(-1);
        
    document.querySelectorAll('.header-chapter')[0].innerText = chapter_value;    
}


document.addEventListener('DOMContentLoaded', (event) => {

     if (typeof document.querySelectorAll('.chapterHead')[0] === 'undefined') {
    } else {
    FixMyChapterHeaderInTOC ()
    };
});


/** 
 * Determine which colour is to be used when presenting content. In the event a
 * domain cant be picked, default it to `--org-science'.
 *
 *
 * @return 
 */
function filter__colourDomainPicker () {

    // Determine the name of the lecture/project to determine its domain
    var currentDomain = $('.header-lecture-name').text()

    switch (true) {

    case (electroScience.includes(currentDomain)):

        $(':root').css("--chosen-science", "var(--electro-science)")

        break;

    case (fundamentalScience.includes(currentDomain)):

        $(':root').css("--chosen-science", "var(--fundamental-science)")

        break;

   case (roboticScience.includes(currentDomain)):

        $(':root').css("--chosen-science", "var(--robotic-science)")

        break;

    case (aiScience.includes(currentDomain)):

        $(':root').css("--chosen-science", "var(--ai-science)")

        break;

    case (computerScience.includes(currentDomain)):

        $(':root').css("--chosen-science", "var(--computer-science)")

        break;

    default:

        $(':root').css("--chosen-science", "var(--org-science)")

        break;
        
    }    
}

// document.addEventListener('DOMContentLoaded', function() {
    
//     var currentDomain = document.
//         getElementsByClassName('header-lecture-name')[0].innerHTML;


//     if (electroScience.includes(currentDomain)) {
//         document.documentElement.style
//             .setProperty("--chosen-science",
//                          "var(--electro-science)");
//         return;
//     }

//     if (fundamentalScience.includes(currentDomain)) {
//         document.documentElement.style
//             .setProperty("--chosen-science",
//                          "var(--fundamental-science)");
//         return;
//     }

//     if (roboticScience.includes(currentDomain)) {
//         document.documentElement.style
//             .setProperty("--chosen-science",
//                          "var(--robotic-science)");
//         return;
//     }

//     if (computerScience.includes(currentDomain)) {
//         document.documentElement.style
//             .setProperty("--chosen-science",
//                          "var(--computer-science)");
//         return;
//     }

//     if (aiScience.includes(currentDomain)) {
//         document.documentElement.style
//             .setProperty("--chosen-science",
//                          "var(--ai-science)");
//         return;
        
//     } else {

//         document.documentElement.style
//             .setProperty("--chosen-science",
//                          "var(--org-science)");

//         $('.lecture-materials').hide()

//         if ( $('.header-lecture-name').text().includes("Thesis") ) {

//             document.querySelectorAll('.chapterToc .title a')[0]
//                 .innerText = "Welcome to ThesisBook"
            
//             $('.header-webBook').text("ThesisBook")
//             $('.nav-comments').hide()
//             $('.author-notes').hide()
//             $('.pdf-icon').hide()

//         }

//         if ( $('.header-lecture-name').text().includes("mcidoc") ) {

//             document.querySelectorAll('.chapterToc .title a')[0]
//                 .innerText = "Welcome to mciDoc"
            
//             $('.header-webBook').text("mciDoc Documentation")
//             $('.nav-comments').hide()
//             $('.author-notes').hide()
//             $('.pdf-icon').hide()

//         }
        

//     }

    
    
// });



// Remove PDF Link on Chapter References page ----------------------------------







/** 
 * Seach across all `tabular' tables and find the rows which are empty. Then
 * remove them. This function is used as ParSnip has problems converting LaTeX
 * tables last rows.
 *
 * @return 
 */
function removeEmptyRows() {
    $('.tabular tr').each(
        function () {
            if (!$.trim($(this).text()))
            {$(this).hide()}
        })   
}

/** 
 * Inserts alternating row colors. This is done as JS is used to remove empty
 * rows and this messes the coloring done by statics pages.
 *
 *
 * @return 
 */
function alternatingRowColors() {

    $(document).ready(function(){
        $("tr:odd").css({
            "background-color":"var(--table-row-color)"});
    });

}

/** 
 * Looks at the content folder to retrive the lecture structure page and
 * displays with proper formatting. This is bound to key for easy navigation.
 *
 *
 * @return 
 */
function menu__showLectureStructure () {

    // We do a simple check to make sure the same call doesn't happen twice.
    if ($('.lecture-structure').length == 0) {

        $('article').attr('id', 'blur-transition');
        
        $('body')
            .append('<div class="lecture-structure" style="display:none;opacity=0.0"></div>');

        $('.crosslinks-bottom').hide();
        $('article').addClass("blur"); 
        $('.lecture-structure').stop()
            .animate({width: 'toggle', opacity: 'toggle' }, 'slow');  
        
        $('.lecture-structure').promise().done(function() {
            $.ajax({
                url:     'content/lecture-structure.html',
                type:    'GET',
                
                success: function(data){
                    $('.lecture-structure').html($(data));

                    // Remove the header information from the website
                    $('.lecture-structure')
                        .find('meta, style, script, title').remove();
           
                    // Remove the header as it is not needed.
                    $('.lecture-structure')
                        .find('h1').remove()

                
                    // Redefine headers so they don't look to big and have the
                    // effect of a `section' header rather than a `chapter'
                    // header.
                    $('.lecture-structure')
                        .find('h2').each(function() {
                            $(this)
                                .replaceWith('<div class="lecture-structure-header"><h3>' +
                                             $(this).html() +
                                             '</div></h3>')                                
                        });

                    
                    // Remove some attributes from table to make them more like
                    // the tables of webBook.
                     $('.lecture-structure')
                        .find('table').each(function() {
                            $(this).removeAttr('border');
                            $(this).removeAttr('cellpadding');
                            $(this).removeAttr('rules');
                            $(this).removeAttr('frame');
                            $(this).removeAttr('cellspacing');
                        });                                  
                }
            });
        });

    } else {

        $('.lecture-structure').stop()
            .animate({width: 'toggle'}, 'slow');
        $('article').removeClass("blur");
        $('body').find('.lecture-structure').remove();
        $('.crosslinks-bottom')
                .animate({height: 'toggle', opacity: 'toggle' }, 'slow');
        
        
        
    }
    // Now we do our standard cleanup process to tidy the information
    // content within the div.

}

function menu__createDetailTOC () {

    $('article').append("<div class='reference-page'><div class='detail-toc'></nav></div>");  
     
    $.ajax({
        url:     'content/toc-detail.html',
        type:    'GET',
        
        success: function(data){
            $('.reference-page').find('.detail-toc').html($(data));}});
}


function menu__toggleDetailTOC() {

    // First determine the current state of the primary TOC.
    const otpState = $('.reference-page').css('display');
    
    if (otpState == 'none') {
        $(".reference-page")
            .stop()
            .animate({height: 'toggle', opacity: 'toggle' }, 'slow');
    } else {
        $(".reference-page")
            .stop()
            .animate({height: 'toggle', opacity: 'toggle' }, 'slow');

    }

    
}

function menu__CreateIndexSearch () {

    $('html').append('<div class="index-search"></div>')

    $.ajax({
                url:     'info_block.db',
                type:    'GET',
        
        success: function(data){
            $('.index-search').html($(data));
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.addPlugin(new CopyButtonPlugin());
            hljs.highlightElement(block);
        });
        }
    });

    

}

/** 
 * Fixes the problem where the citations within margin comments whould shoot to
 * the side of the margin. Now they would be put below the margin comment.
 *
 *
 * @return 
 */
function FixSideMarginDerivatives () {

    $(".sidenote")
        .find('.cite-detail')
        .css({
            'position' : 'fixed',            
            'top'   : 'unset',
            'bottom' : '50px',
            'right' : '20px',
        })
};



/** 
 * Looks the `code' in documentation to retrieve the necessary documentation and
 * present the user with the information on the page
 *
 * @param string to be searched.
 *
 * @return the website in a window
 */
function FindReference (code) {

    $('article').append("<div class='reference-page'></div>");  

    $.each(DocumentationSites, function(index, element) {
        $.ajax({
            url: DocumentationSites[index] + code + '.html',
            type:'GET',
            success: function(data){
                // $('.documentation').html($(data).find('section').html());

                $('.reference-page')
                    .append('<iframe src="'+
                            DocumentationSites[index] + code + '.html' +
                            '" title="description"></iframe>');  
                
            },
            error: function(data){
                
            },
        });
    });
}


function SearchDocumentation () {

    $('article').append("<div class='search-box'>" +
                        "<b>Experimental</b>" +
                        "<p>Please enter code for documentation</p>" +
                        "<form id='target'>" + 
                        "<input type='text' id='code-query' value='Hello there'>" +
                        "<button onclick='getSearchTerm()'>Get Value</button>" +
                        "</form></div>");
}

function getSearchTerm () {
    FindReference($('#code-query').val());
}


/** 
 * Finds the header information of a link in the crosslinks.
 *
 * @param cls name of the class of header element (i.e., '.nav-next')
 *
 * @return 
 */
function menu__getNavLinkInfo (cls) {

        var thisForm = $('.crosslinks-top').find(cls).parents().first();

        var result = '';

        /*
          Here we try to parse all website links in the given link and try to
          determin any header information present. Then we edit the retrieved
          text and do some cleaning on it to use as a link information on the
          page.
        */
        
        $.ajax({
            url:     $(thisForm).attr("href"),
            type:    'GET',
            
            success: function(data){
                util__updateModeline('Visit: ' + $(data).find('h2, h3')
                                         .first()
                               .contents().text())},
            
            error: function(data){
                util__updateModeline("Error: I couldn't find the link. Sorry :(")
            },
        });

        return result
}

function UpdateCrosslinks () {


    
    /* First we have to hide all the unnecessary header information */
    $('.crosslinks-top').find('a').each(function (el) {

        /* FIX: That error occur because this is referring to the ajax object
           and not on the DOM element, to solve this you can do something like
           this: */
        var thisForm = this;

        /*
          Here we try to parse all website links in the given link and try to
          determin any header information present. Then we edit the retrieved
          text and do some cleaning on it to use as a link information on the
          page.
        */
        
        $.ajax({
            url:     $(thisForm).attr("href"),
            type:    'GET',
            success: function(data){
                $(thisForm).wrap('<div></div>');

                $(thisForm)
                    .parent()
                    .append('<p>' +
                            $(data).find('h2, h3')
                            .first()
                            .contents().text()
                            .replace(/^\s*/g, '')
                            .replace(/^[0-9]\.[0-9]\s*/g, '')
                            .replace(/^Chapter\s*([0-9]*)\s*/g, 'Ch. $1  ') +
                            '</p>');
                
            },
            error: function(data){
                $(thisForm).remove()
            },
        });
        
    });

    /* QUICK FIX: Remove the invisible link in the footer */
    $('.crosslinks-bottom').find('a').last().remove()
    

     /* Once the changes have been done we need to rearrange the links so
           it looks more usable */
    
    $('.crosslinks-top').append($('.crosslinks-top').find('a').first())
    $('.crosslinks-bottom').append($('.crosslinks-bottom').find('a').first())

}



function filter__removeLineswithinFloats () {


    var TableFilterListClass = [
        '.threeparttable',
        '.float'
    ]
    
    for (const element of TableFilterListClass) {
        $(element)
            .contents()
            .filter(function(){
                return this.nodeType === 3 && this.nodeValue.trim() !== '';
            }).remove();

    }
}




function menu__createTableOfFigures () {

    $('article').append('<div class="documentation"></div>');  
    
    $('.figure').each(function(){


        $('.documentation').append($(this));
        
    });

}


/** 
 * Looks at nav.wide and if it sees an appendix enrty, adds an appendix chapter
 * header preceeding it.
 *
 *
 * @return 
 */
function menu__addAppendixHeaderToNav () {

    $('nav.wide')
        .find('.toc')
        .find('.number')
        .each(function() {

        });
    
}


/** 
 * Fix the index page tab header text wit the actual text in the `h2' tag. If
 * `h2' is not available then use `h3' instead as failsafe.
 *
 *
 * @return 
 */
function filter__fixIndexTabHeader () {

    var string_headerText = $('h2, h3').first().text()
    
    $('title').first().text(string_headerText)

}


/** 
 * Checks specific divs and if these divs don't have paragraph tags, then it
 * adds them.
 *
 *
 * @return 
 */
function filter__fixMissingParagraphs () {

    // List of all possible glitched divs to check as class
    const array_problemDivs = ['.knowledge', '.warning', '.information'];

    for (const element of array_problemDivs) {
        
        $(element).each(function () {

            // Check if <p> exists within given class
            var bool_pCheck = $(this).find('p').length

            if (bool_pCheck == 0) {

                $(this).wrapInner('<p></p>') 

            }
        });

    }


}

function filter__repositionCaptioninMargin () {

    $('.sidenote')
        .find('.figure')
        .find('.caption')
        .each(function () {
            $(this).appendTo($(this).parent())
        });
}


function filter__removeUnnecessaryTOCs () {

    $('.chapter')
        .find('.subsectionTOCS')
        .remove();
}

function filter__readjustMarginImages () {

    var marginImages    = $('.sidenote').find('.sidenote-image').parent();
    var sideImages      = $('.sidenote').find('.figure').parent();

    var allMarginImages = marginImages.add(sideImages)

    var collidecheck = [false];

    while (collidecheck.includes(false)) {

        var collidecheck = [];
        
        for (var i=0; i < allMarginImages.length - 1; i++) {

            // First we determine which elements are touching.
            if(util__isColliding(allMarginImages.eq(i),
                                 allMarginImages.eq(i+1)) == true) {

                var _tmp = parseInt(allMarginImages[i + 1].offsetTop, 10);

                allMarginImages[i + 1].style.top =  _tmp + 40 + 'px';

                var marginImages    = $('.sidenote').find('.sidenote-image').parent();
                var sideImages      = $('.sidenote').find('.figure').parent();

                var allMarginImages = marginImages.add(sideImages)

                collidecheck.push(false);
                
            } else {

                collidecheck.push(true);

            };          
        }
    }


}



function anim__highlightSideNoteImage () {

    $('.margin, .margin-comment, .acronym, .cite').hover(
        function(){
         
            // We make sure to first make all other `.sidenote' to have
            // transparency.
            $('.margin').not(this).find('.sidenote').stop().animate({"opacity":"0.15"});
            $('.sidenote').find('.figure').stop().animate({"opacity":"0.15"});
            
        },
        function(){

            $('.margin').not(this).find('.sidenote').stop().animate({"opacity":"1.0"});
            $('.sidenote').find('.figure').stop().animate({"opacity":"1.0"});
            
        })

}

function modeline__showLinkInformation () {


    for (var key in ModeLineSelector){

        let value = ModeLineSelector[key];
        
        $(key).hover(function(){
                util__updateModeline(value)},
                   function(){
                       util__updateModeline('')
                   })
    }

}

function modeline__generateModeMenuList(json){

    // First retrieve the first depth list which will store the important
    // elements
    var mainMenu = Object.keys(moodMenu)

    // We then create the primary menu which will be displate in the mode-line.
    for (var i = 0; i < mainMenu.length; i++) {
        
        $('.button-group')
            .append(
                '<div class="dropdown">' +
                    '<button class="dropbtn" id="btn-' + mainMenu[i] + '">' +
                    mainMenu[i] +
                    '</button>' +
                    '<div class="dropdown-content">' +
                    '</div>' +
                    '</div>');

        var subList = Object.keys(moodMenu[Object.keys(moodMenu)[i]][0])
        
        for (var ii = 0; ii < subList.length; ii++) {

            if (subList[ii].includes("Sep-") ) {

                $('.button-group')
                    .find('#btn-' + mainMenu[i])
                    .next('.dropdown-content')
                    .append('<hr>')
                        
                    
            } else {
                
                $('.button-group')
                    .find('#btn-' + mainMenu[i])
                    .next('.dropdown-content')
                    .append('<span class="menu-element">' +
                            '<a onclick="' +
                            moodMenu[Object.keys(moodMenu)[i]][0][subList[ii]][0].command +
                            '">'  +
                            subList[ii] +
                            '</a>' +
                            '<kbd>' +
                            moodMenu[Object.keys(moodMenu)[i]][0][subList[ii]][0].key +
                            '</kbd>' +
                            '<br>');            
            }
        }
    }
}




document.addEventListener('DOMContentLoaded', function() {

    if ( $('.section-header').text().includes("Chapter References") ) {

        $('.bi-file-pdf').hide()
        
    };


    menu__makeCurrentPageTOC();

    //$.when(removeEmptyRows()).then(alternatingRowColors());

    FixSideMarginDerivatives();
    
    modeline__showLinkInformation();

    filter__removeLineswithinFloats();


    // Remove empty paragraphs
    filter__removeEmptyParagraphs();
    
    filter__repositionCaptioninMargin();
        
    

    filter__removeUnnecessaryTOCs();

    filter__fixIndexTabHeader();

    // Add paragraph tags to divs which are missing them `information' for
    // example.
    filter__fixMissingParagraphs();

    modeline__generateModeMenuList(moodMenu);



    // anim__highlightSideNoteImage ();

    menu__createDetailTOC () 
    
    
});

// RESIZING FUNCTIONS ----------------------------------------------------------


$(window).resize(function() {
    
    menu__hideTOCforProperView ();
    menu__makeCurrentPageTOC();

    // Update the user on which view mode they are viewing their content on
    menu__describeState();

    if (util__describeViewState("Max-Computer")
        && bool_marginImageCheck == false) {
        
        filter__readjustMarginImages();
        bool_marginImageCheck = true;
        
    }
    
});


// DOM-LOADED FUNCTIONS --------------------------------------------------------

$(document).ready(function () {

    // Determine the colour to be used for the topic.
    filter__colourDomainPicker();

    // Update the user on which view mode they are viewing their content on
    menu__describeState();

    // Remove the TOC if it is displayed in an unsupported view
    menu__hideTOCforProperView ();

    
    if (util__describeViewState("Max-Computer")
        && bool_marginImageCheck == false) {
        
        filter__readjustMarginImages();
        bool_marginImageCheck = true;
        
    }
});


// Keyboard Event Control ------------------------------------------------------

// The following keyboard control add numerous keyboard shortcuts to useful
// functions for easy navigation and quick information searching. We need to
// make sure `pagefind' window is not currently active as it causes problem with
// navigation.

document.addEventListener("keypress", function(event) {

    switch (event.key) {

    case "t":
        menu__toggleTOC();

        break;

     case "w":
        view__reader();

        break;

    case "n":
        navigate__gotoNextChapter();
         break;

    case "p":
        navigate__gotoPrevChapter();
         break;

    case "b":
        window.scrollTo(0, document.body.scrollHeight);
         break;

    case "u":
        document.body.scrollTop = document.documentElement.scrollTop = 0;
         break;

    case "d":
        navigate__gotoChapterPage();
         break;

    case "l":
        menu__showLectureStructure();
        break;

    case ",":
        menu__toggleDetailTOC();
        break;

    case ".":
        if (util__describeViewState("Max-Computer")){
            menu__toggleCurrentPageTOC();
        }
        break;

    case "i":
        window.location.href = entryPoint;
        break;

    case "r":
        menu__refreshPage()
        break;
        
    }
    
});

// -----------------------------------------------------------------------------
// flatjs.js ends here.
// 
// 
