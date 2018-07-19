'use strict';
(function() {
    // Section related variables
    var verticalScroll = []; 
    var sections = [];
    //------- Load In Variables -------
    var scrollIcon = document.getElementsByClassName('ScrollIcon');
    var Section = document.getElementsByClassName('Section');
    var numberOfSections = Section.length;
    var Top = 0;
    for (var c = 0; c < numberOfSections; c++, Top += 100) {
        verticalScroll.push(scrollIcon[c].style);
        sections.push(Section[c].style);
        sections[c].top = Top + 'vh';
    }
    //------- Add Scroll Functionality -------
        // Chrome, Firefox, IE, Edge
    window.addEventListener('wheel', function(e) { 
        if (e.wheelDelta < 0 || e.deltaY > 0)
            ScrollTo(i + 1); 
        else
            ScrollTo(i - 1);
    });
        // Safari
    window.addEventListener('mousewheel', function(e) { 
        if (e.wheelDelta < 0 || e.deltaY > 0)
            ScrollTo(i + 1); 
        else
            ScrollTo(i - 1);
    });
        // Up/Left arrow + Down/Right arrow functionality
    window.addEventListener('keydown', function(e) { 
        if (e.keyCode === 37 || e.keyCode === 38) 
            ScrollTo(i - 1); 
        else if (e.keyCode === 39 || e.keyCode === 40) 
            ScrollTo(i + 1);
    });
    var i = 0;
    var scriptReady = true;
    function ScrollTo(next) {
        // if script is not ready, do nothing because transition hasn't finished
        if (scriptReady) {
            scriptReady = false;
            //next has to be between 0 and (numberOfSections - 1)
            if (next <= 0) {
                next = 0;
            } else if (next >= numberOfSections) {
                next = numberOfSections - 1;
            }
            // Animate vertical scroll
            if (next != i) {
                verticalScroll[i].backgroundColor = 'orange';
                verticalScroll[i].opacity = '0.4';
                verticalScroll[next].backgroundColor = 'red';
                verticalScroll[next].opacity = '1';
                SectionOut(i + 1);
            }
            // Move sections
            var scrollAmount = (i - next) * 100;
            for (var c = 0; c < numberOfSections; c++) {
                var Top = parseInt(sections[c].top) + scrollAmount;
                sections[c].top = Top + 'vh';
                sections[c].transition = '0.4s';
            }
            SectionIn(next + 1);
            setTimeout(function() { 
                for (var c = 0; c < numberOfSections; c++) {
                    sections[c].transition = '0s';
                }
            }, 400);
            setTimeout(function() { 
                scriptReady = true 
            }, 400);
            i = next;
        }
    }
    // SECTION SPECIFIC SCRIPTS
    // S1 - Fade in section 1 and add S1button functionality
    setTimeout(function() {
        document.getElementById('VerticalScroll').style.opacity = '1';
    },200);
    setTimeout(function() {
        document.getElementById('LarryWu').style.opacity = '1'
    },200);  
    var S1Buttons = document.getElementsByClassName('S1Buttons');
    for (var c = 0; c < S1Buttons.length; c++) {
        (function(c) { 
            S1Buttons[c].addEventListener('click', function() { 
                ScrollTo(c + 1); 
            });
            setTimeout(function() { 
                S1Buttons[c].style.opacity = '0.5';
                S1Buttons[c].style.top = '70vh';
                S1Buttons[c].addEventListener('mouseover', function() {
                    S1Buttons[c].style.opacity = '1';
                });
                S1Buttons[c].addEventListener('mouseout', function() {
                    S1Buttons[c].style.opacity = '0.5';
                });
            }, 400);
        })(c);
    }
    // S4 - Set skill bar image positions
    var skillBarImages = document.getElementsByClassName('SkillBarImage'); 
    var Left = 0;
    for (var c = 0; c < skillBarImages.length; c++, Left += 20) {
        skillBarImages[c].style.left = Left + '%';
    }
    // S4 - Add skill bar tilt movement
    var skillBar = document.getElementById('SkillBar').style;
    window.addEventListener('mousemove', function(e) {
        if (i === 2) {
            var Cx = window.innerWidth/2,
                Cy = window.innerHeight/2,
                MouseX = e.pageX,
                MouseY = e.pageY;
            var VectorX = MouseX - Cx,
                VectorY = -(MouseY - Cy);
            var RotateX = VectorY/Cx,
                RotateY = VectorX/Cy,
                Deg = Math.sqrt(Math.pow(VectorX,2) + Math.pow(VectorY,2))/Math.sqrt(Math.pow(Cx,2) + Math.pow(Cy,2)) * 45; 
            skillBar.transform = 'rotate3d(' + RotateX + ',' + RotateY + ',' + '0,'+ Deg + 'deg)'; 
            var Shadow = -(VectorX/Math.abs(VectorX)*0.3) + "vmin " + (VectorY/Math.abs(VectorY)*0.3) + "vmin " + "3px " + "3px " + "red";
            skillBar.boxShadow = Shadow;
        }
    });
    // Section Transition Scripts
    var Timeouts = []; // stores all timeouts in SectionIn(), clear this in SectionOut()
    function SectionIn (i) {
        var Title = document.getElementById('S' + i + 'Title');
        if (Title) 
            Title.style.opacity = '1';
        var Text = document.getElementsByClassName('S' + i + 'Elem');
        var delayTime = 200;
        for (var j = 0; j < Text.length; j++) {
            (function() {
                var TextStyle = Text[j].style;
                Timeouts.push(setTimeout(function() { TextStyle.opacity = '1'; }, delayTime));
            })();
            delayTime += 400;
        }
    }
    function SectionOut(i) {
        var Title = document.getElementById('S' + i + 'Title');
        if (Title)
            Title.style.opacity = '0';
        var Text = document.getElementsByClassName('S' + i + 'Elem');
        for (var j = 0; j < Text.length; j++) {
            (function() {
                Text[j].style.opacity = '0';
                clearTimeout(Timeouts[j]); 
            })();
        }
        Timeouts.length = 0;
    }
})();