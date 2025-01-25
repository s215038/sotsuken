const myClass = [{score_normal: 0, score_streak: 0, className: "ビギナー"},{score_normal: 16, score_streak: 3, className: "ノーマルクラス"},{score_normal: 26, score_streak: 6, className: "ハイクラス"},{score_normal: 41, score_streak: 9, className: "スーパークラス"},{score_normal: 56, score_streak: 12, className: "ハイパークラス"},{score_normal: 76, score_streak: 16, className: "エキスパート"},{score_normal: 100, score_streak: 20, className: "プロフェッショナル"}];

const hands = ["cho","pa","gu"];
const board_back_img = "url(./item/back.png)";
const myBoardId_9_img = ["url(./item/handchange-btn1.png)","url(./item/handchange-btn2.png)","url(./item/handchange-btn3.png)","url(./item/handchange-btn4.png)"];
const myBoardId_10_img = "url(./item/rankup-btn.png)";
const myBoardId_11_img = "url(./item/vs-btn.png)";

let cpuBoards = new Array(3);
let cpuBoards_string = ["#cpuBoardId_0","#cpuBoardId_1","#cpuBoardId_2"];

let setCpuBoard;

let selectedCpuBoard;

let myBoards = new Array(9);
let myBoards_string = ["#myBoardId_0","#myBoardId_1","#myBoardId_2","#myBoardId_3","#myBoardId_4","#myBoardId_5","#myBoardId_6","#myBoardId_7","#myBoardId_8"];

let eventBoards = new Array(3);
let eventBoards_string = ["#myBoardId_9","#myBoardId_10","#myBoardId_11"];

let setMyBoards = new Array(3);
let setMyBoards_string = ["#setMyBoard_0","#setMyBoard_1","#setMyBoard_2"];
let setMyBoard_0_rank;
let setMyBoard_0_hand; let setMyBoard_1_hand;

const shadowPoint = "1px 1px 1px rgba(0, 0, 0, 0.6)";


const judgeText_cpu = document.getElementById("judgeText_cpu");
const judgeText_m = [document.getElementById("judgeText_m0"), document.getElementById("judgeText_m1"), document.getElementById("judgeText_m2")];
const judgeTexts = {win:"<div id='text_win'>win</div>",draw:"<div id='text_draw'>draw</div>",lose:"<div id='text_lose'>lose</div>"};

let self_win = false;
let self_lose = false;

const scoreText = document.getElementById("scoreText");
let score = 0;
scoreText.innerHTML = "<span style='font-style: italic;'>score:</span> "+score;

const myClassText = document.getElementById("myClassText");

function board_putElm(){
    cpuBoards[0] = {used:false, id:0, rank: Math.floor(Math.random()*(3)+1), hand:hands[Math.floor(Math.random()*(3))]};
    cpuBoards[1] = {used:false, id:1, rank: Math.floor(Math.random()*(3)+1), hand:hands[Math.floor(Math.random()*(3))]};
    cpuBoards[2] = {used:false, id:2, rank: Math.floor(Math.random()*(3)+1), hand:hands[Math.floor(Math.random()*(3))]};

    setCpuBoard = {id: null, rank: null, hand: null};
    judgeText_cpu.innerHTML = "<br>";
    
    if(rank_mode == "fixed"){
        myBoards[0] = {used:false, id:0, rank:3, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[1] = {used:false, id:1, rank:3, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[2] = {used:false, id:2, rank:2, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[3] = {used:false, id:3, rank:2, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[4] = {used:false, id:4, rank:1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[5] = {used:false, id:5, rank:1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[6] = {used:false, id:6, rank:1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[7] = {used:false, id:7, rank:1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[8] = {used:false, id:8, rank:1, hand:hands[Math.floor(Math.random()*(3))]};
    }
    if(rank_mode == "random"){
        myBoards[0] = {used:false, id:0, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[1] = {used:false, id:1, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[2] = {used:false, id:2, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[3] = {used:false, id:3, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[4] = {used:false, id:4, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[5] = {used:false, id:5, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[6] = {used:false, id:6, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[7] = {used:false, id:7, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
        myBoards[8] = {used:false, id:8, rank:Math.floor(Math.random()*(3))+1, hand:hands[Math.floor(Math.random()*(3))]};
    }

    eventBoards[0] = {board_number: Math.floor(Math.random()*(4)) ,used:false, unavailable:false};
    eventBoards[1] = {used:false, unavailable:false};
    eventBoards[2] = {used:false};
    if(eventBoard_mode == "absence"){
        eventBoards[0].unavailable = true;
        eventBoards[1].unavailable = true;
    }

    setMyBoards[0] = {used:false, id: null, rank: null, rankUp: 0, hand: null, hand_change: null};
    judgeText_m[0].innerHTML = "<br>";
    setMyBoards[1] = {used:false, id: null, rank: null, hand: null, hand_change: null};
    judgeText_m[1].innerHTML = "<br>";
    setMyBoards[2] = {used:false, id: null, rank: null, hand: null, hand_change: null};
    judgeText_m[2].innerHTML = "<br>";

}

function setCpuBoard_put(){
    let cpuBoard_id = Math.floor(Math.random()*(3));
    while(cpuBoards[cpuBoard_id].used == true){
        cpuBoard_id = Math.floor(Math.random()*(3));
    }

    setCpuBoard.id = cpuBoards[cpuBoard_id].id;
    setCpuBoard.rank = cpuBoards[cpuBoard_id].rank;
    setCpuBoard.hand = cpuBoards[cpuBoard_id].hand; 
    $("#setCpuBoard").css("background-image",board_attach(setCpuBoard.rank, setCpuBoard.hand));
}

function setBoard_rankChange(){
    setMyBoards[0].rank = setMyBoard_0_rank + setMyBoards[0].rankUp;
    board_putItem();
}

function hand_change_w(hand){
    switch(hand){
        case "cho": return "gu";
        case "pa": return "cho";
        case "gu": return "pa";
    }
}
function hand_change_l(hand){
    switch(hand){
        case "cho": return "pa";
        case "pa": return "gu";
        case "gu": return "cho";
    }
}
function setBoard_handChange(){
    if(setMyBoards[0].hand_change != null){
        setMyBoards[0].hand = setMyBoards[0].hand_change;
    } else {
        setMyBoards[0].hand = setMyBoard_0_hand;
    }

    if(setMyBoards[1].hand_change != null){
        setMyBoards[1].hand = setMyBoards[1].hand_change;
    } else {
        setMyBoards[1].hand = setMyBoard_1_hand;
    }

    board_putItem();
}

function board_attach(rank, hand){
    if(rank == null | hand == null){return ""}
    if(rank == 1 & hand == "cho"){return "url(./item/choboard_1.png)"}
    if(rank == 1 & hand == "pa"){return "url(./item/paboard_1.png)"}
    if(rank == 1 & hand == "gu"){return "url(./item/guboard_1.png)"}
    if(rank == 2 & hand == "cho"){return "url(./item/choboard_2.png)"}
    if(rank == 2 & hand == "pa"){return "url(./item/paboard_2.png)"}
    if(rank == 2 & hand == "gu"){return "url(./item/guboard_2.png)"}
    if(rank == 3 & hand == "cho"){return "url(./item/choboard_3.png)"}
    if(rank == 3 & hand == "pa"){return "url(./item/paboard_3.png)"}
    if(rank == 3 & hand == "gu"){return "url(./item/guboard_3.png)"}
}


function board_putItem(){ 
        $("#cpuBoardId_0").css("background-image",board_attach(cpuBoards[0].rank, cpuBoards[0].hand));
        $("#cpuBoardId_1").css("background-image",board_attach(cpuBoards[1].rank, cpuBoards[1].hand));
        $("#cpuBoardId_2").css("background-image",board_attach(cpuBoards[2].rank, cpuBoards[2].hand));

        if(setCpuBoard.rank == null | setCpuBoard.hand == null){$("#setCpuBoard").css("background-image", board_back_img);}
        else {$("#setCpuBoard").css("background-image",board_attach(setCpuBoard.rank, setCpuBoard.hand));}

        $("#setMyBoard_0").css("background-image",board_attach(setMyBoards[0].rank, setMyBoards[0].hand));
        $("#setMyBoard_1").css("background-image",board_attach(setMyBoards[1].rank, setMyBoards[1].hand));
        $("#setMyBoard_2").css("background-image",board_attach(setMyBoards[2].rank, setMyBoards[2].hand));
    
        $("#myBoardId_0").css("background-image",board_attach(myBoards[0].rank, myBoards[0].hand));
        $("#myBoardId_1").css("background-image",board_attach(myBoards[1].rank, myBoards[1].hand));
        $("#myBoardId_2").css("background-image",board_attach(myBoards[2].rank, myBoards[2].hand));
        $("#myBoardId_3").css("background-image",board_attach(myBoards[3].rank, myBoards[3].hand));
        $("#myBoardId_4").css("background-image",board_attach(myBoards[4].rank, myBoards[4].hand));
        $("#myBoardId_5").css("background-image",board_attach(myBoards[5].rank, myBoards[5].hand));
        $("#myBoardId_6").css("background-image",board_attach(myBoards[6].rank, myBoards[6].hand));
        $("#myBoardId_7").css("background-image",board_attach(myBoards[7].rank, myBoards[7].hand));
        $("#myBoardId_8").css("background-image",board_attach(myBoards[8].rank, myBoards[8].hand));
        
        if(eventBoard_mode == "presence"){
            $("#myBoardId_9").css({"background-image":myBoardId_9_img[eventBoards[0].board_number], "border":"none"});
            $("#myBoardId_10").css({"background-image":myBoardId_10_img, "border":"none"});
        } else if(eventBoard_mode == "absence"){
            $("#myBoardId_9").css({"background-image":"none", "border":"solid 0.5px #7f7f7f"});
            $("#myBoardId_10").css({"background-image":"none", "border":"solid 0.5px #7f7f7f"});
        }
        $("#myBoardId_11").css("background-image",myBoardId_11_img);
}

$(function board_click(){
    
    $("#myBoardId_0").click(() => {click_action("#myBoardId_0", myBoards[0].used, myBoards[0].id, myBoards[0].rank, myBoards[0].hand)});
    $("#myBoardId_1").click(() => {click_action("#myBoardId_1", myBoards[1].used, myBoards[1].id, myBoards[1].rank, myBoards[1].hand)});
    $("#myBoardId_2").click(() => {click_action("#myBoardId_2", myBoards[2].used, myBoards[2].id, myBoards[2].rank, myBoards[2].hand)});
    $("#myBoardId_3").click(() => {click_action("#myBoardId_3", myBoards[3].used, myBoards[3].id, myBoards[3].rank, myBoards[3].hand)});
    $("#myBoardId_4").click(() => {click_action("#myBoardId_4", myBoards[4].used, myBoards[4].id, myBoards[4].rank, myBoards[4].hand)});
    $("#myBoardId_5").click(() => {click_action("#myBoardId_5", myBoards[5].used, myBoards[5].id, myBoards[5].rank, myBoards[5].hand)});
    $("#myBoardId_6").click(() => {click_action("#myBoardId_6", myBoards[6].used, myBoards[6].id, myBoards[6].rank, myBoards[6].hand)});
    $("#myBoardId_7").click(() => {click_action("#myBoardId_7", myBoards[7].used, myBoards[7].id, myBoards[7].rank, myBoards[7].hand)});
    $("#myBoardId_8").click(() => {click_action("#myBoardId_8", myBoards[8].used, myBoards[8].id, myBoards[8].rank, myBoards[8].hand)});
    
    $("#myBoardId_9").click(() => {if(eventBoard_mode == "presence"){click_action("#myBoardId_9", eventBoards[0].used, eventBoards[0].board_number, null, null)}});
    $("#myBoardId_10").click(() => {if(eventBoard_mode == "presence"){click_action("#myBoardId_10", eventBoards[1].used, null, null, null)}});
    $("#myBoardId_11").click(() => {click_action("#myBoardId_11", eventBoards[2].used, null, null, null)});

    $("#setMyBoard_0").click(() => {if(setMyBoards[0].id != null){click_action("#setMyBoard_0", setMyBoards[0].used, setMyBoards[0].id, null, null)}})
    $("#setMyBoard_1").click(() => {if(setMyBoards[1].id != null){click_action("#setMyBoard_1", setMyBoards[1].used, setMyBoards[1].id, null, null)}})
    $("#setMyBoard_2").click(() => {if(setMyBoards[2].id != null){click_action("#setMyBoard_2", setMyBoards[2].used, setMyBoards[2].id, null, null)}})

    function click_action(clickBoard_string, used, clickBoard_id, clickBoard_rank, clickBoard_hand){
        
        
            if(used == false & myBoards_string.includes(clickBoard_string)){
                for(let i = 0; i < setMyBoards.length; i++){
                    if(setMyBoards[i].id == null){
                        myBoards[clickBoard_id].used = true;
                        setMyBoards[i].id = clickBoard_id;
                        setMyBoards[i].rank = clickBoard_rank;
                        setMyBoards[i].hand = clickBoard_hand;
                        $(setMyBoards_string[i]).css({"box-shadow":shadowPoint, "cursor":"pointer"});
                        $(clickBoard_string).css("filter","brightness(0.6)");
                        $(clickBoard_string).css("box-shadow","none");
                        break;
                    }
                }
                board_putItem();
            }
            if(used == false & setMyBoards_string.includes(clickBoard_string)){
                if(clickBoard_string == "#setMyBoard_0"){
                    setMyBoards[0].id = null;
                    setMyBoards[0].rank = null;
                    setMyBoards[0].hand = null;
                    $(setMyBoards_string[0]).css({"box-shadow":"none", "cursor":"default"});
                    if(eventBoards[0].used == true & eventBoards[0].unavailable == false){
                        eventBoards[0].used = false;
                        if(score_mode == "normal"){score += 2; scoreFluctuation();}
                        $("#myBoardId_9").css("filter","brightness(1)");
                        setMyBoards[0].hand_change = null;
                        setMyBoards[1].hand_change = null;
                        if(eventBoards[1].used == false | eventBoards[1].unavailable == true){
                            setBoard_handChange();
                        }
                    }
                    if(eventBoards[1].used == true & eventBoards[1].unavailable == false){
                        eventBoards[1].used = false;
                        if(score_mode == "normal"){score += 3; scoreFluctuation();}
                        $("#myBoardId_10").css("filter","brightness(1)");
                        setMyBoards[0].rankUp = 0;
                        setBoard_rankChange();
                    }
                }
                if(clickBoard_string == "#setMyBoard_1"){
                    setMyBoards[1].id = null;
                    setMyBoards[1].rank = null;
                    setMyBoards[1].hand = null;
                    $(setMyBoards_string[1]).css({"box-shadow":"none", "cursor":"default"});
                    if(eventBoards[0].board_number == 1 | eventBoards[0].board_number == 3){
                        if(eventBoards[0].used == true & eventBoards[0].unavailable == false){
                            eventBoards[0].used = false;
                            if(score_mode == "normal"){score += 2; scoreFluctuation();}
                            $("#myBoardId_9").css("filter","brightness(1)");
                            setMyBoards[0].hand_change = null;
                            setMyBoards[1].hand_change = null;
                            setBoard_handChange();
                        }
                    }
                }
                if(clickBoard_string == "#setMyBoard_2"){
                    setMyBoards[2].id = null;
                    setMyBoards[2].rank = null;
                    setMyBoards[2].hand = null;
                    $(setMyBoards_string[2]).css({"box-shadow":"none", "cursor":"default"});
                }
                $(myBoards_string[clickBoard_id]).css("filter","brightness(1)");
                $(myBoards_string[clickBoard_id]).css("box-shadow",shadowPoint);
                myBoards[clickBoard_id].used = false;
                board_putItem();
            }
            if(used == false & eventBoards_string.includes(clickBoard_string)){

                if(clickBoard_string == "#myBoardId_9" & eventBoards[0].unavailable == false & eventBoards[2].used == false){
                    if(setMyBoards[0].id != null & eventBoards[0].board_number == 0){
                        setMyBoards[0].hand_change = hand_change_w(setMyBoards[0].hand);
                        if(score_mode == "normal" & score >= 2){
                            score -= 2; scoreFluctuation();
                            eventBoard0_common();
                        }
                        if(score_mode == "streak"){
                            eventBoard0_common();
                        }
                        else {red_flash(clickBoard_string, myBoardId_9_img[clickBoard_id]);}
                    }
                    else if(setMyBoards[0].id != null & setMyBoards[1].id != null & eventBoards[0].board_number == 1){
                        setMyBoards[0].hand_change = hand_change_w(setMyBoards[0].hand);
                        setMyBoards[1].hand_change = hand_change_w(setMyBoards[1].hand);
                        if(score_mode == "normal" & score >= 2){
                            score -= 2; scoreFluctuation();
                            eventBoard0_common();
                        }
                        if(score_mode == "streak"){
                            eventBoard0_common();
                        }
                        else {red_flash(clickBoard_string, myBoardId_9_img[clickBoard_id]);}
                    }
                    else if(setMyBoards[0].id != null & eventBoards[0].board_number == 2){
                        setMyBoards[0].hand_change = hand_change_l(setMyBoards[0].hand);
                        if(score_mode == "normal" & score >= 2){
                            score -= 2; scoreFluctuation();
                            eventBoard0_common();
                        }
                        if(score_mode == "streak"){
                            eventBoard0_common();
                        }
                        else {red_flash(clickBoard_string, myBoardId_9_img[clickBoard_id]);}
                    }
                    else if(setMyBoards[0].id != null & setMyBoards[1].id != null & eventBoards[0].board_number == 3){
                        setMyBoards[0].hand_change = hand_change_l(setMyBoards[0].hand);
                        setMyBoards[1].hand_change = hand_change_l(setMyBoards[1].hand);
                        if(score_mode == "normal" & score >= 2){
                            score -= 2; scoreFluctuation();
                            eventBoard0_common();
                        }
                        if(score_mode == "streak"){
                            eventBoard0_common();
                        }
                        else {red_flash(clickBoard_string, myBoardId_9_img[clickBoard_id]);}
                    }
                    else {
                        red_flash(clickBoard_string, myBoardId_9_img[clickBoard_id]);
                    }
                    function eventBoard0_common(){
                        eventBoards[0].used = true;
                        setMyBoard_0_hand = setMyBoards[0].hand; setMyBoard_1_hand = setMyBoards[1].hand;
                        $(clickBoard_string).css("filter","brightness(0.6)");
                        setBoard_handChange();
                    }
                }

                if(clickBoard_string == "#myBoardId_10" & eventBoards[1].unavailable == false & eventBoards[2].used == false){
                    if(setMyBoards[0].id != null & setMyBoards[0].rank <= 2){
                        if(score_mode == "normal" & score >= 3){
                            score -= 3; scoreFluctuation();
                            eventBoard1_common();
                        }
                        if(score_mode == "streak"){
                            eventBoard1_common();
                        }
                        else {red_flash(clickBoard_string, myBoardId_10_img);}
                    }
                    else {
                        red_flash(clickBoard_string, myBoardId_10_img);
                    }
                    function eventBoard1_common(){
                        eventBoards[1].used = true;
                        setMyBoard_0_rank = setMyBoards[0].rank;
                        setMyBoards[0].rankUp = 1;
                        $(clickBoard_string).css("filter","brightness(0.6)");
                        setBoard_rankChange();
                    }
                }

                if(clickBoard_string == "#myBoardId_11"){
                    if(setMyBoards[0].id != null & setMyBoards[1].id != null & setMyBoards[2].id != null & eventBoards[2].used == false){
                        eventBoards[2].used = true;
                        $(clickBoard_string).css("filter","brightness(0.6)");
                        $("#myBoard-set .myBoard").css({"box-shadow":"none", "cursor":"default"});
                        board_match();
                    }
                    else {
                        red_flash(clickBoard_string, myBoardId_11_img);
                    }
                }

            } 
    
    };
});

function board_match(){
    for(let i = 0; i < setMyBoards.length; i++){
        setMyBoards[i].used = true;
    }
    
    setCpuBoard_put();

    cpuBoards[setCpuBoard.id].used = true;

    setTimeout(() => {
        judgeText_cpu.innerHTML = judgeTexts.draw;
        judgeText_m[1].innerHTML = judgeTexts.draw;
        
            for(let i = 0; i < setMyBoards.length; i++){
                if(setMyBoards[i].rank >= setCpuBoard.rank){
                    if(setMyBoards[i].hand == hands[0] & setCpuBoard.hand == hands[1] || setMyBoards[i].hand == hands[1] & setCpuBoard.hand == hands[2] || setMyBoards[i].hand == hands[2] & setCpuBoard.hand == hands[0]){
                        judgeText_m[1].innerHTML = "<br>";
                        judgeText_cpu.innerHTML = judgeTexts.lose;
                        judgeText_m[i].innerHTML = judgeTexts.win;
                        self_win = true;
                        break; 
                    }
                }
            }
            if(self_win == false){
                for(let i = 0; i < setMyBoards.length; i++){
                    if(setMyBoards[i].rank <= setCpuBoard.rank){
                        if(setMyBoards[i].hand == hands[0] & setCpuBoard.hand == hands[2] || setMyBoards[i].hand == hands[1] & setCpuBoard.hand == hands[0] || setMyBoards[i].hand == hands[2] & setCpuBoard.hand == hands[1]){
                            judgeText_m[1].innerHTML = "<br>";
                            judgeText_cpu.innerHTML = judgeTexts.win;
                            judgeText_m[i].innerHTML = judgeTexts.lose;
                            self_lose = true;
                            break;
                        }
                    }
                }
            }
    }, 1500);

    setTimeout(() => {$(cpuBoards_string[setCpuBoard.id]).css("filter","brightness(0.6)"); scoreFluctuation(), next_preparation()},4000);
}

function scoreFluctuation(){
    if(score_mode == "normal"){
        if(self_win == true){
            if(setCpuBoard.rank == 3){score += 5;}
            if(setCpuBoard.rank == 2){score += 3;}
            if(setCpuBoard.rank == 1){score += 2;}
        }
        if(self_lose == true){
            if(setCpuBoard.rank == 3){score -= 2;}
            if(setCpuBoard.rank == 2){score -= 3;}
            if(setCpuBoard.rank == 1){score -= 5;}
        }
    }
    if(score_mode == "streak"){
        if(self_win == true){
            score += 1;
        }
        if(self_lose == true){
            score = 0;
        }
    }

    if(score < 0){score = 0;}
    scoreText.innerHTML = "<span style='font-style: italic;'>score:</span> "+score;
}

function myClassText_put(){
    if(score_mode == "normal"){
        for(let i = myClass.length-1; i >= 0; i--){
            if(score >= myClass[i].score_normal){
                if(i == myClass.length-1){
                    myClassText.innerHTML = `${myClass[i].className} (${myClass[i].score_normal} - )`;
                }
                else{
                    myClassText.innerHTML = `${myClass[i].className} (${myClass[i].score_normal} - ${myClass[i+1].score_normal - 1})`;
                }
                break;
            }
        }
    }

    if(score_mode == "streak"){
        for(let i = myClass.length-1; i >= 0; i--){
            if(score >= myClass[i].score_streak){
                if(i == myClass.length-1){
                    myClassText.innerHTML = `${myClass[i].className} (${myClass[i].score_streak} - )`;
                }
                else{
                    myClassText.innerHTML = `${myClass[i].className} (${myClass[i].score_streak} - ${myClass[i+1].score_streak - 1})`;
                }
                break;
            }
        }
    }
}

function next_preparation(){
    if(myBoards.every((element) => element.used == true)){
        
        new Promise((resolve) => {
            judgeText_cpu.innerHTML = "<br>"; judgeText_m[0].innerHTML = "<br>"; judgeText_m[1].innerHTML = "<br>"; judgeText_m[2].innerHTML = "<br>";
            $("#cpuBoard-set .board, #myBoard-set .board").css("background-image", ""); $(".board").css("box-shadow", "none");
            setTimeout(() => {reset_animation("computer", 0, 2);}, 500);
            setTimeout(() => {reset_animation("player", 0, 2);}, 1000);
            setTimeout(() => {reset_animation("player", 3, 5);}, 1500);
            setTimeout(() => {reset_animation("player", 6, 8);}, 2000);
            setTimeout(() => {resolve();}, 2500);

            function reset_animation(holder, num_f, num_l){
                if(holder == "computer"){
                    for(let i = num_f; i <= num_l; i++){
                        $(cpuBoards_string[i]).css("filter","brightness(1)");
                        $(cpuBoards_string[i]).css("background-image", board_back_img);
                    }
                }
                if(holder == "player"){
                    for(let i = num_f; i <= num_l; i++){
                        $(myBoards_string[i]).css("filter","brightness(1)");
                        $(myBoards_string[i]).css("background-image", board_back_img);
                    }
                }
            }
        }).then(() => {
            $(".myBoard-flex:not(:last-child) .myBoard").css("box-shadow",shadowPoint);
            $("#myBoardId_9, #myBoardId_10").css("filter","brightness(1)");
            board_putElm();
            next_preparation_common();
        });
        
    } else {
        setCpuBoard = {id: null, rank: null, hand: null};
        judgeText_cpu.innerHTML = "<br>";
        setMyBoards[0] = {used:false, id: null, rank: null, rankUp: 0, hand: null, hand_change: null};
        judgeText_m[0].innerHTML = "<br>";
        setMyBoards[1] = {used:false, id: null, rank: null, hand: null, hand_change: null};
        judgeText_m[1].innerHTML = "<br>";
        setMyBoards[2] = {used:false, id: null, rank: null, hand: null};
        judgeText_m[2].innerHTML = "<br>";
        eventBoards[2] = {used:false};
        next_preparation_common();
    }

    function next_preparation_common(){
        self_win = false;
        self_lose = false;
        if(eventBoards[0].used == true){eventBoards[0].unavailable = true;}
        if(eventBoards[1].used == true){eventBoards[1].unavailable = true;}
        $("#myBoardId_11").css("filter","brightness(1)");
        $("#myBoard-set .myBoard").css("box-shadow","none");
        myClassText_put();
        board_putItem();
    }
}

board_putElm();
board_putItem();
myClassText_put();

function red_flash(board_string, board_image){
    $(board_string).css({"background-image":"none", "background-color":"#ff2b13"});
    setTimeout(() => {$(board_string).css({"background-image":board_image, "background-color":"rgba(0,0,0,0)"});},50);
}
