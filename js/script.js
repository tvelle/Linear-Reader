var textInput = document.querySelector("#textInput");
var wordForWord = document.querySelector("#wordForWord");
var punctuation = document.querySelector("#punctuation");
var fullSentence = document.querySelector("#fullSentence");
var readText = document.querySelector("#readText");
var warning = document.querySelector(".warning");
var inputSection = document.querySelector("#inputSection");
var readingSection = document.querySelector("#readingSection");
var fullScreen = document.querySelector("html");
var verseByVerse = document.querySelector("#verseByVerse");
var textBlock;
var lastBlock;
var i;

function cutText(){
    var text = textInput.value;
    var text2 = text.replace(/\n/g,"\<br\> ");
    ;
    if (wordForWord.checked == true) {
        // verwijdering van leestekens opgelost met 'positive lookahead'
        textBlock = text2.split(/(?<= )/);
    } else if (fullSentence.checked == true){
        textBlock = text2.split(/(?<=[.?!])/);
    } else if (punctuation.checked == true) {
        textBlock = text2.split(/(?<=[.,?!:;])/);
    } else {
        textBlock = text2.split(/(?=<br>)/);
    };
    console.log(textBlock)
    printText();
};

// Start to read textInput in another tab
function printText(){
    i = 0;    
    readText.style.color = "black";
    readText = document.querySelector("#readText");
    lastBlock = textBlock[i];
    readText.innerHTML = lastBlock;
    changeView(); 
    fullScreen.requestFullscreen();
};

var warning = document.querySelector(".warning");
var inputSection = document.querySelector("#inputSection");
var readingSection = document.querySelector("#readingSection");
function checkInputText(){
    if (textInput.value === "") {
        warning.style.display = "block";
    } else {
        cutText();
        warning.style.display = "none";
    };
};

// Add another textBlock to your text
function printListNext(){
    i += 1
    readText.style.color = "grey";
    readText.innerHTML = textBlock.slice(0,i-1).join("") + "<span id='lastBlock' style='color:black;'>" + textBlock.slice(i-1,i) + "</span>";
    var lastBlockScroll = document.querySelector("#lastBlock");
    lastBlockScroll.scrollIntoView();
};
// Remove the last textBlock of your text
function printListPrevious(){
    i -= 1;
    lastBlock = textBlock[i];
    readText.style.color = "grey";
    readText.innerHTML = textBlock.slice(0,i-1).join("") + "<span style='color:black;'>" + textBlock.slice(i-1,i) + "</span>";
    var lastBlockScroll = document.querySelector("#lastBlock");
    lastBlockScroll.scrollIntoView();
    
};

function reset(){
    inputSection.style.display = "block";
    readingSection.style.display = "none";
    i = 0;
    lastBlock = textBlock[i];
    readText.innerHTML = "";
    textInput.value = "";
};

function goBack(){
    document.exitFullscreen();
    inputSection.style.display = "block";
    readingSection.style.display = "none";
}
// To use the arrows to read
document.onkeyup = function(e) {
    var key = e.which || e.keyCode;
    if (key == '37' && readingSection.style.display !== "none") {
        // Left
        printListPrevious();
    } else if (key == '39' && readingSection.style.display !== "none"){
        // Right
        printListNext();
    } else if (key == '13' && inputSection.style.display !== "none"){
        // Enter
        checkInputText();
    };
};

function changeView(){
    if (inputSection.style.display === "none") {
        inputSection.style.display = "block";
        readingSection.style.display = "none";
    } else {
        inputSection.style.display = "none";
        readingSection.style.display = "block";
    } 
};
