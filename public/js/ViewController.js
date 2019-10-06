"use strict";
/* globals io */

class ViewController {

    constructor() {

        this.prompts =
        [
            "Out of these five choices, which one interests you the most?",
            "Good job! Pick Another!",
            "Here's another one!",
            "Keep 'em coming y'all!",
            "Here we go again!",
            "So which one do you like?",
            "I'm impressed! Here's another one!",
            "You're good at this! Go again!",
            "Almost there! Pick again!",
            "Last One!"
        ];        

        this.welcomeScreen = $("#welcomeScreen");
        this.loginScreen = $("#loginScreen");
        this.signupScreen = $("#signupScreen");
        this.startLoginBTN = $("#startLoginBTN");
        this.startSignupBTN = $("#startSignupBTN");
        this.nameLogin = $("#nameLogin");
        this.passwordLogin = $("#passwordLogin");
        this.loginBTN = $("#loginBTN");
        this.nameSignup = $("#nameSignup");
        this.passwordSignup = $("#passwordSignup");
        this.signupBTN = $("#signupBTN");
        this.questions = $("#questions");
        this.questionSlides = $("#questionSlides");
        this.chatPortal = $("#chatPortal");
        this.chatRooms = $("#chatRooms");
        this.chatSession = $("#chatSession");

        this.loginResponse = null;
        this.user = null;
        this.userId = null;

        this.roomSelections = new Map();
        this.selectionClicks = 0;

        this.socket = io(`/delight/chat`);
        this.currentRoom = null;
        this.currentRoomId = null;

        this.startBackgroundImages();

        this.assignListeners();
    }

    startBackgroundImages() {

        $().fullClip({
            images:
                [
                    "../img/blue.jpg",
                    "../img/green.jpg",
                    "../img/orange.jpg",
                    "../img/pink.jpg",
                    "../img/white.jpg",
                    "../img/yellow.jpg"
                ],
            transitionTime: 2500,
            wait: 10000,
        });
    }

    assignListeners() {

        this.startLoginBTN.one("click", () => {

            this.startLogin();
        });

        this.startSignupBTN.one("click", () => {

            this.startSignup();
        });
    }

    startLogin() {

        this.welcomeScreen.fadeOut(1000).promise().then(() => {

            this.loginScreen.removeClass("hidden").promise().then(() => {

                this.nameLogin.focus();

                this.loginScreen.fadeTo(1000, 1.0);

                this.loginBTN.on("click", (event) => {

                    this.login(event);
                });
            });
        });
    }

    startSignup() {

        this.welcomeScreen.fadeOut(1000).promise().then(() => {

            this.signupScreen.removeClass("hidden").promise().then(() => {

                this.nameSignup.focus();

                this.signupScreen.fadeTo(1000, 1.0);

                this.signupBTN.on("click", (event) => {

                    this.signup(event);
                });
            });
        });
    }

    login(event) {

        const name = this.nameLogin.val().trim();
        const password = this.passwordLogin.val().trim();

        if (this.isInputValid(name, password, event)) {

            event.preventDefault();

            const creds = {
                name,
                password,
                isSignUp: false
            };

            const ajaxConfig ={
                type: "POST",
                data: creds
            };

            $.ajax("/api/delight/login", ajaxConfig).then((response) => {
                
                this.nameLogin.val("");
                this.passwordLogin.val("");

                this.loginResponse = response;
                this.user = response.user;
                this.userId = response.userId;

                this.loginScreen.fadeOut(1000).promise().then(() => {
                   
                    this.startQuestions();
                });

            }).fail(() => {
               
                alert("Bad USER NAME or PASSWORD, try again.");
            });
        }
    }

    signup(event) {

        const name = this.nameSignup.val().trim();
        const password = this.passwordSignup.val().trim();

        if (this.isInputValid(name, password, event)) {

            event.preventDefault();

            const creds = {
                name,
                password,
                isSignUp: true
            };

            const ajaxConfig ={
                type: "POST",
                data: creds
            };

            $.ajax("/api/delight/login", ajaxConfig).then((response) => {
                
                this.nameSignup.val("");
                this.passwordSignup.val("");

                this.loginResponse = response;
                this.user = response.user;
                this.userId = response.userId;

                this.signupScreen.fadeOut(1000).promise().then(() => {
                   
                    this.startQuestions();
                });

            }).fail(() => {
               
                alert("USER NAME already taken.");
            });
        }
    }

    isInputValid(name, password, event) {

        if (name.length < 6) {

            event.preventDefault();

            alert("USER NAME must be at least 6 characters.");

            return false;
        }

        if (password.length < 6) {

            event.preventDefault();

            alert("PASSWORD must be at least 6 characters.");

            return false;
        }

        return true;
    }

    startQuestions() {

        let promptCounter = 0;

        for (const interestGroup of this.loginResponse.interestsRooms) {

            const wrapperDiv = $("<div>");

            const promptElem = $("<div>").addClass("prompt").text(this.prompts[promptCounter]);

            wrapperDiv.append(promptElem);

            for (const interest of interestGroup) {

                const interestBtn = $("<button>").addClass("BTN nextSlideBTN")
                                                 .attr("data-room", interest.room)
                                                 .attr("data-roomId", interest.roomId)
                                                 .attr("style", "outline: none;")
                                                 .text(interest.interest);

                wrapperDiv.append(interestBtn);
            }

            this.questionSlides.append(wrapperDiv);

            promptCounter++;
        }

        $("#centeredScreen").removeClass("hidden");

        this.questions.removeClass("hidden").promise().then(() => {

            this.questions.fadeTo(1000, 1.0);

            $(".single-item").slick({ dots: true, prevArrow: false }).promise().then(() => {

                $(".slick-next").attr("style", "display: none;");  //hide forward arrow

                $(".nextSlideBTN").on("click", (event) => {
           
                    this.selectionClicks++;
  
                    const dataset = event.currentTarget.dataset;

                    const room   = dataset.room;
                    const roomId = dataset.roomid;
                    
                    if (!this.roomSelections.has(room)) {

                        this.roomSelections.set(room, roomId);
                    }

                    if (this.selectionClicks === 10) {
   
                        $(".nextSlideBTN").off();

                        this.enterChatPortal();
                    }
                    else {

                        $(".slick-next").click();
                    }
                });
            });
        });
    }

    enterChatPortal() {

        this.questions.fadeOut(1000).promise().then(() => {
           
            this.chatPortal.removeClass("hidden");

            this.chatPortal.fadeTo(1000, 1.0);
        });

        for (const room of this.roomSelections.entries()) {

            const chatRoomBtn = $("<button>").addClass("BTN chatRoomBTN")
                                             .attr("data-room", room[0])
                                             .attr("data-roomId", room[1])
                                             .attr("style", "outline: none;")
                                             .text(room[0]);

            this.chatRooms.append(chatRoomBtn);
        }

        $("#submitBtn").click((event) => {

            event.preventDefault();

            const message = $("#message").val().trim();

            this.socket.emit(this.currentRoom, this.getUserMsg(message, false));

            $("#message").val("");

            return false;
        });

        $(".chatRoomBTN").click((event) => {
           
            const dataset = event.currentTarget.dataset;

            const room   = dataset.room;
            const roomId = dataset.roomid;

            this.joinRoom(room, roomId);
        });
    }

    joinRoom(newRoom, newRoomId) {

        if (this.currentRoom !== null) {

            this.socket.off(this.currentRoom);

            this.socket.emit(this.currentRoom, this.getUserMsg("left chat room ", true));

            $("#messages").empty();
        }

        this.currentRoom = newRoom;
        this.currentRoomId = newRoomId;

        this.getMessageHistory().then(() => {
           
            const messagesHeight = $("#messages")[0].scrollHeight;
            const messagesLength = $("#messages > li").length;
    
            if (messagesLength === 100) {
    
                $("#messages > li:first").remove();
            }
            
            $("#messages").scrollTop(messagesHeight);
    
            this.socket.emit(this.currentRoom, this.getUserMsg("joined chat room ", true));
    
            $("#message").focus();

            this.socket.on(this.currentRoom, (msg) => {

                const nameElem = $("<span>").addClass("name").text(msg.name);
    
                const timeElem = $("<span>").addClass("time").text(msg.time);
    
                const msgElemWrapper = $("<div>");  
                    
                const msgElem = $("<span>").addClass("msg").text(msg.message);
    
                msgElemWrapper.append(msgElem);
    
                if (msg.isJoinLeave === true) {
    
                    const roomElem = $("<span>").addClass("room").text(`#${msg.room}`);
    
                    msgElemWrapper.append(roomElem);
                }
    
                const messageElem = $("<li>").append(nameElem).append(timeElem).append(msgElemWrapper)
                                             .attr("style", "opacity: 0.0; position: relative; left: 100%; background: lightgreen;");
    
                $("#messages").append(messageElem);
    
                messageElem.animate({ left: "0%", opacity: "1.0", }, 500).promise().then(() => {
                   
                    setTimeout(() => {
                        
                        messageElem.attr("style", "");
    
                    }, 1000);
                });
    
                const messagesHeight = $("#messages")[0].scrollHeight;
                const messagesLength = $("#messages > li").length;
    
                if (messagesLength === 100) {
    
                    $("#messages > li:first").remove();
                }
    
                $("#messages").scrollTop(messagesHeight);
            });
        });
    }

    getUserMsg(msg, isJoinLeave) {

        const userMsg = {
            roomId: this.currentRoomId,
            userId: this.userId,
            message: msg,
            name: this.user,
            time: new Date().toLocaleTimeString(),
            isJoinLeave,
            room: this.currentRoom
        };

        return userMsg;
    }

    getMessageHistory() {

        return new Promise((resolve, reject) => {
            
            const ajaxConfig ={
                type: "GET"
            };
    
            $.ajax(`/api/delight/messages/${this.currentRoomId}`, ajaxConfig).then((response) => {
                
                for (const msg of response) {
               
                    const nameElem = $("<span>").addClass("name").text(msg.name);
    
                    const timeElem = $("<span>").addClass("time").text(msg.time);
        
                    const msgElemWrapper = $("<div>");  
                        
                    const msgElem = $("<span>").addClass("msg").text(msg.message);
        
                    msgElemWrapper.append(msgElem);
    
                    const messageElem = $("<li>").append(nameElem).append(timeElem).append(msgElemWrapper);
    
                    $("#messages").append(messageElem);
                }
    
                resolve();

            }).fail((error) => {
               
                console.log(error);

                resolve();  //not getting message history is acceptable to just move on, thus on reject
            });
        });
    }
}   