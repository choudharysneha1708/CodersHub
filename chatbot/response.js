function getBotResponse(input) {
    //rock paper scissors
    if (input == "fine!can you help me with this question") {
        return "Sure, which question?";
    } else if (input == "can you suggest me a course?") {
        return "Yes, you can try our new for web development";
    } else if (input == "what are the prerequisites?") {
        return "HTML and CSS";
    }

    // Simple responses
    if (input == "Hello") {
        return "Hello there!";
    } else if (input == "goodbye") {
        return "Talk to you later!";
    }else if(input == "Thankyou"){
        return "Welcome"
    }
     else {
        return "Try asking something else!";
    }
}