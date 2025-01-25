// eventBoard_mode = {"presence","absence"}
eventBoard_mode = "presence";
// rank_mode = {"fixed","random"}
rank_mode = "fixed"
// score_mode = {"normal","streak"}
score_mode = "normal";

select_modes = {eventBoard_mode: eventBoard_mode, rank_mode: rank_mode,score_mode: score_mode};

const current_eventBoard_mode = document.getElementById("current-eventBoard_mode");
const current_rank_mode = document.getElementById("current-rank_mode");
const current_score_mode = document.getElementById("current-score_mode");

const selected = {
    "background": "linear-gradient(#42888d,#67a2a7,#42888d)",
    "color": "rgb(221, 255, 134)",
    "box-shadow": "none"
}

const cancel = {
    "background": "linear-gradient(#69dae2,#91eaf0,#69dae2)",
    "color": "#000",
    "box-shadow": "0.5px 1.5px 2px rgba(0, 0, 0, 0.6)"
}

$(function(){
    if(eventBoard_mode == "presence"){
        $("#presence").css(selected);
    }
    if(eventBoard_mode == "absence"){
        $("#absence").css(selected);
    }
    if(rank_mode == "fixed"){
        $("#fixed").css(selected);
    }
    if(rank_mode == "random"){
        $("#random").css(selected);
    }
    if(score_mode == "normal"){
        $("#normal").css(selected);
    }
    if(score_mode == "streak"){
        $("#streak").css(selected);
    }
})

$("#presence").click(() => {
    $("#presence").css(selected);
    $("#absence").css(cancel);
    select_modes.eventBoard_mode = "presence";
});
$("#absence").click(() => {
    $("#presence").css(cancel);
    $("#absence").css(selected);
    select_modes.eventBoard_mode = "absence";
});
$("#fixed").click(() => {
    $("#fixed").css(selected);
    $("#random").css(cancel);
    select_modes.rank_mode = "fixed";
});
$("#random").click(() => {
    $("#fixed").css(cancel);
    $("#random").css(selected);
    select_modes.rank_mode = "random";
});
$("#normal").click(() => {
    $("#normal").css(selected);
    $("#streak").css(cancel);
    select_modes.score_mode = "normal";
});
$("#streak").click(() => {
    $("#normal").css(cancel);
    $("#streak").css(selected);
    select_modes.score_mode = "streak";
});

$(".retry-button").click(() => {
    if(eventBoards[2].used == false){
        var result = window.confirm('スコアが0に戻ります。設定を反映してリトライしますか？');
    }
    if(result){
        eventBoard_mode = select_modes.eventBoard_mode;
        rank_mode = select_modes.rank_mode;
        score_mode = select_modes.score_mode;

        if(eventBoard_mode == "presence"){current_eventBoard_mode.textContent = "特殊ボタン：あり"}
        if(eventBoard_mode == "absence"){current_eventBoard_mode.textContent = "特殊ボタン：なし"}
        if(rank_mode == "fixed"){current_rank_mode.textContent = "ランク：固定"}
        if(rank_mode == "random"){current_rank_mode.textContent = "ランク：ランダム"}
        if(score_mode == "normal"){current_score_mode.textContent = "スコア：ノーマル"}
        if(score_mode == "streak"){current_score_mode.textContent = "スコア：連勝"}

        board_putElm();
        board_putItem();
        $(".board").css("filter","brightness(1)");
        $("#myBoard-set .myBoard").css({"box-shadow":"none", "cursor":"default"});
        $(".myBoard-flex:not(:last-child) .myBoard").css("box-shadow","1px 1px 1px rgba(0, 0, 0, 0.6)");
        score = 0;
        scoreFluctuation();
        myClassText_put();
        window.scroll({top: document.getElementById("main-content").getBoundingClientRect().top + (window.scrollY - 60), behavior:"smooth"});
    }
})
