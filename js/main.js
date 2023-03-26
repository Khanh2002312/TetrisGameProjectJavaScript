let row = 20;
let col = 10;
let t_shape = [[1, 1], [1, 2], [1, 3], [2, 2]];
let l_shape = [[2, 1], [2, 2], [2, 3], [1, 3]];
let j_shape = [[1, 1], [1, 2], [1, 3], [2, 3]];
let i_shape = [[1, 1], [1, 2], [1, 3], [1, 4]];
let o_shape = [[1, 1], [1, 2], [2, 1], [2, 2]];
let s_shape = [[1, 3], [1, 2], [2, 2], [2, 1]];
let z_shape = [[1, 1], [1, 2], [2, 2], [2, 3]];
let tetrominos = [t_shape, o_shape, l_shape, j_shape, i_shape, s_shape, z_shape]
let tetroBackground = ['t_shape', 'o_shape', 'l_shape', 'j_shape', 'i_shape', 's_shape', 'z_shape']
let randomBlock;
let blockColor;
let blockImage;
let moveX = 4;
let moveY = 0;
let moveLeft = true;
let moveRight = true;
let color = ['red', 'antiquewhite', 'deepskyblue', 'cyan', 'salmon', 'yellow', 'orange']
let rotate = 1;
let copy = [[], [], [], []];
let count = 1;
let index;
let currentIndex;
let nextIndex;
let score = 0;
let scoreDiv = document.getElementById('score');
let runB, drawB, check1, check2, check3, check4, check5, runCoverInterval, randomRemoveInterval;
let pause = 0;
let cover = document.getElementsByClassName('cover')[0];
let cover2 = document.getElementsByClassName('cover2')[0];
let miniCover = document.getElementsByClassName('coverMini')[0];
let level = 1;
let coverPosition = 575;
let coverHeight = 30;
let speed = 800;
let modal = document.querySelector('.levelModal');
let modalContent = document.querySelector('.modalContent');
let gameBoard = document.getElementById('game');
let sound = true;
let musicCondition = true;
let musicToggle = true;
let music = new Audio('./music/theme.mp3');

// nhạc nền
function playBackgroundSound() {
    music.volume = 0.1;
    music.play();
    music.loop = true;
}

// âm thanh khi click một button
function playButtonClick() {
    if (sound) {
        var audio = new Audio('./music/buton click.wav');
        audio.volume = 0.3;
        audio.play();
    }
}

// âm thanh khi xoay
function playRotateSound() {
    if (sound) {
        var audio = new Audio('./music/rotate.mp3');
        audio.volume = 0.3;
        audio.play();
    }
}

// nhạc game over
function playGameOver() {
    if (musicCondition) {
        var audio = new Audio('./music/gameOver.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}

// âm thanh khi xóa dòng
function playLineClear() {
    if (sound) {
        var audio = new Audio('./music/lineClear.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}

// âm thanh khi di chuyển trái phải
function playMoveSound() {
    if (sound) {
        var audio = new Audio('./music/move.mp3');
        audio.volume = 0.2;
        audio.play();
    }
}

// nhạc hoàn thành level
function playNextLevel() {
    if (musicCondition) {
        var audio = new Audio('./music/nextLevel.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}

// âm thanh khi chạm
function playPieceLanded() {
    if (sound) {
        var audio = new Audio('./music/pieceLanded.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}

// chỉnh tille và nút cho modal gameover
function modalGameover() {
    document.getElementsByClassName('titleModal')[0].innerHTML = '<h1>GAME OVER!</h1>\n' +
        '                    <div class="buttonContainer">\n' +
        '                        <button onclick="againGameover()" type="button" class="btn btn-danger"\n' +
        '                                style="border: 10px solid #a4333e;">\n' +
        '                            AGAIN\n' +
        '                        </button>\n' +
        '                        <button onclick="menuButton()" type="button" class="btn btn-success"\n' +
        '                                style="border: 10px solid #3aff67;">\n' +
        '                            MAIN MENU\n' +
        '                        </button>\n' +
        '\n' +
        '                    </div>';
}

// chỉnh tille và nút cho modal win

function modalWin() {
    document.getElementsByClassName('titleModal')[0].innerHTML = '<h1>YOU WIN</h1>\n' +
        '                    <div class="buttonContainer">\n' +
        '                        <button onclick="again()" type="button" class="btn btn-danger"\n' +
        '                                style="border: 10px solid #a4333e;">\n' +
        '                            AGAIN\n' +
        '                        </button>\n' +
        '                        <button onclick="nextLevel()" type="button" class="btn btn-success"\n' +
        '                                style="border: 10px solid #3aff67;">\n' +
        '                            NEXT\n' +
        '                        </button>\n' +
        '\n' +
        '                    </div>';
}

// chỉnh tille và nút cho modal hoàn thành trò chơi

function modalFinish() {
    document.getElementsByClassName('titleModal')[0].innerHTML = '<h1 style="font-size: 28px">YOU FINISHED THE GAME!</h1>\n' +
        '                    <div class="buttonContainer">\n' +
        '                        <button onclick="again()" type="button" class="btn btn-danger"\n' +
        '                                style="border: 10px solid #a4333e;">\n' +
        '                            AGAIN\n' +
        '                        </button>\n' +
        '                        <button onclick="menuButton()" type="button" class="btn btn-success"\n' +
        '                                style="border: 10px solid #3aff67;">\n' +
        '                            MAIN MENU\n' +
        '                        </button>\n' +
        '\n' +
        '                    </div>';
}
window.onload
$(document).ready(function () {
    currentIndex = parseInt(Math.random() * 7);
    nextIndex = parseInt(Math.random() * 7);
    miniMonitor();
    randomBlock = tetrominos[currentIndex];
    index = tetrominos.indexOf(randomBlock);
    blockImage = tetroBackground[index];
    blockColor = color[index];
    for (let i = 0; i < 4; i++) {
        drawNext(tetrominos[nextIndex][i][0], tetrominos[nextIndex][i][1])
    }
    scoreDiv.innerHTML = score;

})

function gameLoop() {

    drawB = setInterval(function () {
        drawBlock(randomBlock);
    }, 1);
    runB = setInterval(run, speed);
    check5 = setInterval(doubleCheck, 1);
    check1 = setInterval(checkCollision, 1);
    check2 = setInterval(checkCollisionBlock, 1);
    check3 = setInterval(function () {
        checkWallAndHitBlock(randomBlock);
    }, 1);
    check4 = setInterval(checkLine, 1);

}

// vẽ bảng chơi
function drawBoard() {
    for (let i = 0; i < row; i++) {
        var r = document.createElement('div');
        r.classList.add('row');
        for (let j = 0; j < col; j++) {
            var cell = document.createElement('div');
            cell.classList.add('cell', 'cell-' + (i + 1) + '-' + (j + 1));
            r.appendChild(cell);
        }
        document.getElementById('game').appendChild(r);
    }
}

// vẽ màn hình nhỏ dự đoán khối tiếp theo
function miniMonitor() {
    for (let i = 0; i < 4; i++) {
        var r = document.createElement('div');

        r.classList.add('miniRow');
        for (let j = 0; j < 6; j++) {
            var cell = document.createElement('div');
            cell.classList.add('miniCell', 'miniCell-' + (i + 1) + '-' + (j + 1));
            r.appendChild(cell);
        }
        document.getElementById('miniMonitor').appendChild(r);
    }
}

function draw(x, y) {
    document.getElementsByClassName('cell-' + (x) + '-' + (y))[0].classList.add('tetromino');
}

function drawNext(x, y) {
    document.getElementsByClassName('miniCell-' + (x + 1) + '-' + (y + 1))[0].style.backgroundImage = 'url("./img/' + tetroBackground[nextIndex] + '.jpg")';
    document.getElementsByClassName('miniCell-' + (x + 1) + '-' + (y + 1))[0].style.backgroundColor = color[nextIndex];

}

// vẽ khối tiếp theo trên màn hình nhỏ
function drawNextBlock() {
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 7; j++) {
            document.getElementsByClassName('miniCell-' + i + '-' + j)[0].style.backgroundImage = '';
            document.getElementsByClassName('miniCell-' + i + '-' + j)[0].style.backgroundColor = '';
        }
    }
    for (let i = 0; i < 4; i++) {
        drawNext(tetrominos[nextIndex][i][0], tetrominos[nextIndex][i][1])
    }
}

// vẽ khối
function drawBlock(shape) {
    if (checkCollision(randomBlock) || checkCollisionBlock(randomBlock)) {
        return;
    } else {
        for (let i = 1; i <= row; i++) {
            for (let j = 1; j <= col; j++) {
                document.getElementsByClassName('cell-' + (i) + '-' + (j))[0].style.backgroundColor = '';
                document.getElementsByClassName('cell-' + (i) + '-' + (j))[0].style.backgroundImage = '';
                document.getElementsByClassName('cell-' + (i) + '-' + (j))[0].classList.remove('tetromino');
            }
        }
        for (let i = 0; i < shape.length; i++) {
            checkLine();
            draw(shape[i][0] + moveY, shape[i][1] + moveX);
        }
        for (let i = 0; i < shape.length; i++) {
            document.getElementsByClassName('tetromino')[i].style.backgroundImage = 'url("./img/' + blockImage + '.jpg")';
            document.getElementsByClassName('tetromino')[i].style.backgroundColor = blockColor;

        }
    }
}

// di chuyển khối từ trên xuống
function run() {
    if (checkCollision(randomBlock) || checkCollisionBlock(randomBlock)) {
        return;
    } else {
        moveY++;
    }
}

// kiểm tra đụng lề dưới cùng
function checkCollision() {
    if (randomBlock[0][0] + moveY + 1 > row + 1 || randomBlock[1][0] + moveY + 1 > row + 1 || randomBlock[2][0] + moveY + 1 > row + 1 || randomBlock[3][0] + moveY + 1 > row + 1) {
        for (let i = 0; i < randomBlock.length; i++) {
            document.getElementsByClassName('cell-' + (randomBlock[i][0] + moveY - 1) + '-' + (randomBlock[i][1] + moveX))[0].classList.replace('tetromino', 'checked');
            document.getElementsByClassName('cell-' + (randomBlock[i][0] + moveY - 1) + '-' + (randomBlock[i][1] + moveX))[0].classList.add('checked' + blockColor);
        }
        checkGameover();
        playPieceLanded();
        reset();
    }
}

// kiểm tra đụng với block khác và dừng
function checkCollisionBlock() {
    for (let i = 0; i < randomBlock.length; i++) {
        if (document.getElementsByClassName('cell-' + (randomBlock[i][0] + moveY) + '-' + (randomBlock[i][1] + moveX))[0].classList.contains('checked')) {
            for (let j = 0; j < randomBlock.length; j++) {
                document.getElementsByClassName('cell-' + (randomBlock[j][0] + moveY - 1) + '-' + (randomBlock[j][1] + moveX))[0].classList.replace('tetromino', 'checked');
                document.getElementsByClassName('cell-' + (randomBlock[j][0] + moveY - 1) + '-' + (randomBlock[j][1] + moveX))[0].classList.add('checked' + blockColor);
            }
            checkGameover();

            playPieceLanded();
            reset();

        }
    }
}

// reset khối về tọa độ ban đầu
function resetShape() {
    t_shape = [[1, 1], [1, 2], [1, 3], [2, 2]];
    l_shape = [[2, 1], [2, 2], [2, 3], [1, 3]];
    j_shape = [[1, 1], [1, 2], [1, 3], [2, 3]];
    i_shape = [[1, 1], [1, 2], [1, 3], [1, 4]];
    o_shape = [[1, 1], [1, 2], [2, 1], [2, 2]];
    s_shape = [[1, 3], [1, 2], [2, 2], [2, 1]];
    z_shape = [[1, 1], [1, 2], [2, 2], [2, 3]];
    tetrominos = [t_shape, o_shape, l_shape, j_shape, i_shape, s_shape, z_shape];
}

// reset mọi trạng thái về ban đầu
function reset() {
    resetShape();
    currentIndex = nextIndex;
    moveY = 0;
    moveX = 4;
    moveRight = true;
    moveLeft = true;
    randomBlock = tetrominos[currentIndex];
    rotate = 1;
    count = 1;
    copy = [[], [], [], []];
    index = tetrominos.indexOf(randomBlock);
    blockImage = tetroBackground[index];
    blockColor = color[index];
    nextIndex = parseInt(Math.random() * 7);
    drawNextBlock();

}

// check line và xóa dòng khi lấp đầy một hàng đồng thời cộng điểm
function checkLine() {
    for (let i = row; i > 0; i--) {
        let countChecked = 0;
        for (let j = 1; j <= col; j++) {
            if (document.getElementsByClassName('cell-' + (i) + '-' + (j))[0].classList.contains('checked')) {
                countChecked++;
            }
        }
        if (countChecked == col) {
            score += 10;
            playLineClear();
            scoreDiv.innerHTML = score;
            checkLevel();
            for (let j = 1; j <= col; j++) {
                document.getElementsByClassName('cell-' + (i) + '-' + (j))[0].classList.remove('checked');
                for (let k = 0; k < color.length; k++) {
                    document.getElementsByClassName('cell-' + (i) + '-' + (j))[0].classList.remove('checked' + color[k]);
                }
            }
            for (let j = i - 1; j > 0; j--) {
                for (let k = 1; k <= col; k++) {
                    if (document.getElementsByClassName('cell-' + (j) + '-' + (k))[0].classList.contains('checked')) {
                        document.getElementsByClassName('cell-' + (j + 1) + '-' + (k))[0].classList.add('checked');
                        document.getElementsByClassName('cell-' + (j) + '-' + (k))[0].classList.remove('checked');
                        for (let l = 0; l < color.length; l++) {
                            if (document.getElementsByClassName('cell-' + (j) + '-' + (k))[0].classList.contains('checked' + color[l])) {
                                document.getElementsByClassName('cell-' + (j + 1) + '-' + (k))[0].classList.add('checked' + color[l]);
                                document.getElementsByClassName('cell-' + (j) + '-' + (k))[0].classList.remove('checked' + color[l]);
                            }

                        }
                    }
                }
            }

        }

    }
}

// kiểm tra đụng tường và đụng khối khác  (khi đang di chuyển theo trục X)
function checkWallAndHitBlock(shape) {
    moveLeft = true;
    moveRight = true;
    for (let i = 0; i < shape.length; i++) {
        if (shape[i][1] + moveX + 1 > col) {
            moveRight = false;
            if (document.getElementsByClassName('cell-' + (shape[i][0] + moveY) + '-' + (shape[i][1] + moveX - 1))[0].classList.contains('checked')) {
                moveLeft = false;
            }
        } else if (document.getElementsByClassName('cell-' + (shape[i][0] + moveY) + '-' + (shape[i][1] + moveX + 1))[0].classList.contains('checked')) {
            moveRight = false;
        }
        if (shape[i][1] + moveX - 1 < 1) {
            moveLeft = false;
            if (document.getElementsByClassName('cell-' + (shape[i][0] + moveY) + '-' + (shape[i][1] + moveX + 1))[0].classList.contains('checked')) {
                moveRight = false;
            }
        } else if (document.getElementsByClassName('cell-' + (shape[i][0] + moveY) + '-' + (shape[i][1] + moveX - 1))[0].classList.contains('checked')) {
            moveLeft = false;
        }


    }
}

// kiểm tra khi xoay (xoay có đụng tường không?, có đụng vào khối khác không?)
function checkRotate(shape) {
    let result = true;

    for (let i = 0; i < shape.length; i++) {
        if (shape[i][1] + moveX > col || shape[i][1] + moveX < 1 || shape[i][0] + moveY < 1) {
            result = false;
        } else {
            if (document.getElementsByClassName('cell-' + (shape[i][0] + moveY) + '-' + (shape[i][1] + moveX))[0].classList.contains('checked') || document.getElementsByClassName('cell-' + (shape[i][0] + moveY) + '-' + (shape[i][1] + moveX))[0].classList.contains('checked')) {
                result = false;
            }
        }
    }
    return result;
}

// hoán đổi 2 giá trị
function swap(x, y) {
    const temp = x;
    x = y;
    y = temp;
    return [x, y];
}

// xoay khối
function rotateBlock() {
    for (let i = 0; i < 4; i++) {
        copy[i] = randomBlock[i];
    }
    for (let i = 0; i < randomBlock.length - 2; i++) {
        if (randomBlock[i][0] == randomBlock[i + 1][0] || randomBlock[i][1] == randomBlock[i + 1][1]) {
            count++;
        }
    }
    if (randomBlock == tetrominos[5] || randomBlock == tetrominos[6]) {
        count = 2;
    }
    if (randomBlock == tetrominos[1]) {
        rotate = 0;
    }
    if (randomBlock == tetrominos[4]) {
        count = 4;
    }
    switch (rotate) {
        case 1:
            if (count == 2) {
                copy[0] = [copy[1][0] - 1, copy[1][1]];
                if (randomBlock == tetrominos[6]) {
                    copy[2] = [copy[1][0], copy[1][1] - 1];
                }
                if (randomBlock == tetrominos[5]) {
                    copy[2] = [copy[1][0], copy[1][1] + 1];
                }
                copy[3] = [copy[2][0] + 1, copy[2][1]];
                if (checkRotate(copy)) {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = copy[i];
                    }
                    playRotateSound();
                } else {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = randomBlock[i];
                    }
                    rotate -= 1;
                }
            }
            if (count == 3) {
                copy[0] = [copy[1][0] - 1, copy[1][1]];
                copy[2] = [copy[1][0] + 1, copy[1][1]];
                if (randomBlock == tetrominos[0]) {
                    copy[3] = [copy[1][0], copy[1][1] - 1];
                } else if (randomBlock == tetrominos[2]) {
                    copy[3] = [copy[2][0], copy[2][1] + 1];
                } else if (randomBlock == tetrominos[3]) {
                    copy[3] = [copy[2][0], copy[2][1] - 1];
                }
                if (checkRotate(copy)) {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = copy[i];
                    }
                    playRotateSound();
                } else {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = randomBlock[i];
                    }
                    rotate -= 1;
                }
            }
            if (count == 4) {
                for (let i = 1; i < 4; i++) {
                    copy[i] = swap(copy[i][0], copy[i][1]);
                }
                if (checkRotate(copy)) {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = copy[i];
                    }
                    playRotateSound();
                } else {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = randomBlock[i];
                    }
                    rotate -= 1;
                }
            }
            break;
        case 2:
            if (count == 2) {
                resetShape();
                if (checkRotate(tetrominos[index])) {
                    randomBlock = tetrominos[index];
                    playRotateSound();
                    rotate = 0;
                } else {
                    randomBlock = tetrominos[index];
                    randomBlock[0] = [copy[1][0] - 1, copy[1][1]];
                    if (randomBlock == tetrominos[6]) {
                        randomBlock[2] = [copy[1][0], copy[1][1] - 1];
                    }
                    if (randomBlock == tetrominos[5]) {
                        randomBlock[2] = [copy[1][0], copy[1][1] + 1];
                    }
                    randomBlock[3] = [copy[2][0] + 1, copy[2][1]];
                    rotate -= 1;
                }
            }
            if (count == 3) {
                resetShape();
                if (checkRotate(tetrominos[index])) {
                    randomBlock = tetrominos[index];
                    playRotateSound();
                    if (randomBlock == tetrominos[0]) {
                        randomBlock[3] = [randomBlock[1][0] - 1, randomBlock[1][1]];
                    } else if (randomBlock == tetrominos[2]) {
                        randomBlock[3] = [randomBlock[0][0] + 1, randomBlock[0][1]];
                    } else if (randomBlock == tetrominos[3]) {
                        randomBlock[3] = [randomBlock[0][0] - 1, randomBlock[0][1]];
                    }
                } else {
                    randomBlock = tetrominos[index];
                    randomBlock[0] = [randomBlock[1][0] - 1, randomBlock[1][1]];
                    randomBlock[2] = [randomBlock[1][0] + 1, randomBlock[1][1]];
                    if (randomBlock == tetrominos[0]) {
                        randomBlock[3] = [randomBlock[1][0], randomBlock[1][1] - 1];
                    } else if (randomBlock == tetrominos[2]) {
                        randomBlock[3] = [randomBlock[2][0], randomBlock[2][1] + 1];
                    } else if (randomBlock == tetrominos[3]) {
                        randomBlock[3] = [randomBlock[2][0], randomBlock[2][1] - 1];
                    }
                    rotate -= 1;
                }
            }
            if (count == 4) {
                for (let i = 1; i < 4; i++) {
                    copy[i] = swap(copy[i][0], copy[i][1]);
                }
                if (checkRotate(copy)) {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = copy[i];
                        rotate = 0;
                    }
                    playRotateSound();
                } else {
                    for (let i = 0; i < 4; i++) {
                        randomBlock[i] = randomBlock[i];
                    }
                    rotate -= 1;
                }
            }
            break;
        case 3:
            resetShape();
            copy = tetrominos[index];
            copy[0] = [copy[1][0] - 1, copy[1][1]];
            copy[2] = [copy[1][0] + 1, copy[1][1]];
            if (copy == tetrominos[0]) {
                copy[3] = [copy[1][0], copy[1][1] + 1];
            } else if (copy == tetrominos[2]) {
                copy[3] = [copy[0][0], copy[0][1] - 1];
            } else if (copy == tetrominos[3]) {
                copy[3] = [copy[0][0], copy[0][1] + 1];
            }
            if (checkRotate(copy)) {
                for (let i = 0; i < 4; i++) {
                    randomBlock[i] = copy[i];
                }
                playRotateSound();
            } else {
                resetShape();
                randomBlock = tetrominos[index];
                if (randomBlock == tetrominos[0]) {
                    randomBlock[3] = [randomBlock[1][0] - 1, randomBlock[1][1]];
                } else if (randomBlock == tetrominos[2]) {
                    randomBlock[3] = [randomBlock[0][0] + 1, randomBlock[0][1]];
                } else if (randomBlock == tetrominos[3]) {
                    randomBlock[3] = [randomBlock[0][0] - 1, randomBlock[0][1]];
                }
                rotate -= 1;
            }
            break;
        case 4:
            resetShape();
            if (checkRotate(tetrominos[index])) {
                randomBlock = tetrominos[index];
                playRotateSound();
            } else {
                randomBlock = tetrominos[index];
                randomBlock[0] = [randomBlock[1][0] - 1, randomBlock[1][1]];
                randomBlock[2] = [randomBlock[1][0] + 1, randomBlock[1][1]];
                if (randomBlock == tetrominos[0]) {
                    randomBlock[3] = [randomBlock[1][0], randomBlock[1][1] + 1];
                } else if (randomBlock == tetrominos[2]) {
                    randomBlock[3] = [randomBlock[0][0], randomBlock[0][1] - 1];
                } else if (randomBlock == tetrominos[3]) {
                    randomBlock[3] = [randomBlock[0][0], randomBlock[0][1] + 1];
                }
                rotate -= 1;
            }
            break;
    }
    count = 1;
}

// kiểm tra lần nữa nơi nào thiếu class checked thì thêm vào
function doubleCheck() {
    for (let i = 1; i < row + 1; i++) {
        for (let j = 1; j < col + 1; j++) {
            for (let k = 0; k < color.length; k++) {
                if (document.getElementsByClassName('cell-' + i + '-' + j)[0].classList.contains('checked' + color[k])) {
                    if (!document.getElementsByClassName('cell-' + i + '-' + j)[0].classList.contains('checked')) {
                        document.getElementsByClassName('cell-' + i + '-' + j)[0].classList.add('checked');
                    }
                }
            }
        }
    }
}

// dọn bảng chơi xóa tất cả các block trên bảng
function clean() {
    for (let i = 1; i < row + 1; i++) {
        for (let j = 1; j < col + 1; j++) {
            document.getElementsByClassName('cell-' + i + '-' + j)[0].classList.remove('checked');
            for (let k = 0; k < color.length; k++) {
                document.getElementsByClassName('cell-' + i + '-' + j)[0].classList.remove('checked' + color[k]);
            }
        }
    }
    score = 0;
    scoreDiv.innerHTML = score;
    if (level < 5) {
        coverPosition = 605 - coverHeight;
        cover.style.marginTop = coverPosition + 'px';
    } else {
        coverPosition = 530 - coverHeight;
        cover.style.marginTop = coverPosition + 'px';
    }

}

// function nút chơi lại cho modal gameover
function againGameover() {
    playButtonClick();
    clearAllInterval();
    hideModal();
    clean();
    reset();
    gameLoop();
    switch (level) {
        case 3:
            runCoverInterval = setInterval(runCover, 4000);
            break;
        case 4:
            randomRemoveInterval = setInterval(randomRemove, 5000);
            break;
        case 6:
            runCoverInterval = setInterval(runCover, 2000);
            randomRemoveInterval = setInterval(randomRemove, 10000);
            break;
    }


}

// kiểm tra game over
function checkGameover() {
    let j = 2;
    if (nextIndex == 4) {
        j = 1;
    }
    if (document.getElementsByClassName('cell-' + j + '-' + 5)[0].classList.contains('checked') ||
        document.getElementsByClassName('cell-' + j + '-' + 6)[0].classList.contains('checked') ||
        document.getElementsByClassName('cell-' + j + '-' + 7)[0].classList.contains('checked') ||
        document.getElementsByClassName('cell-' + j + '-' + 8)[0].classList.contains('checked')
    ) {
        playGameOver();
        clearAllInterval();
        modalGameover();
        showModal();
    }
}

// gắn event di chuyển cho các nút bấm
document.addEventListener('keydown', function (event) {
    if (pause != 1) {
        if (event.keyCode === 37) {
            // Left arrow key pressed
            if (moveLeft == true) {
                moveX -= 1
                playMoveSound();
            }

        } else if (event.keyCode === 38) {
            // Up arrow key pressed
            rotateBlock();

            if (rotate >= 4) {
                rotate = 1;
            } else {
                rotate++;
            }

        } else if (event.keyCode === 39) {
            // Right arrow key pressed

            if (moveRight == true) {
                moveX += 1;
                playMoveSound();
            }

        } else if (event.keyCode === 40) {
            // Down arrow key pressed
            if (document.getElementsByClassName('mainMenu')[0].style.display != 'flex') {
                run(randomBlock);
            }
        }
    }

});

// function cho nút bắt đầu
function playButton() {
    playButtonClick();
    drawBoard();
    document.getElementsByClassName('mainMenu')[0].style.display = 'none';
    document.getElementsByClassName('gameBoard')[0].style.display = 'block';
    document.getElementById('level').innerHTML = level;
    gameLoop();

}

// function cho nút tạm dừng
function pauseButton() {
    playButtonClick();
    if (pause == 0) {
        pause = 1;
        clearInterval(runB);
        clearInterval(runCoverInterval);
        clearInterval(randomRemoveInterval);
        document.getElementsByClassName('btn-pause')[0].innerHTML = '<i class="fa-solid fa-play"></i> RESUME';
    } else if (pause == 1) {
        pause = 0;
        runB = setInterval(run, speed);
        switch (level) {
            case 3:
                runCoverInterval = setInterval(runCover, 4000);
                break;
            case 4:
                randomRemoveInterval = setInterval(randomRemove, 5000);
                break;
            case 6:
                runCoverInterval = setInterval(runCover, 2000);
                randomRemoveInterval = setInterval(randomRemove, 10000);
                break;
        }
        document.getElementsByClassName('btn-pause')[0].innerHTML = '<i class="fa-solid fa-pause"></i> PAUSE';
    }

}

// clear tất cả các interval đang chạy
function clearAllInterval() {
    clearInterval(runB);
    clearInterval(drawB);
    clearInterval(check1);
    clearInterval(check2);
    clearInterval(check3);
    clearInterval(check4);
    clearInterval(check5);
    clearInterval(runCoverInterval);
    clearInterval(randomRemoveInterval);
}

// function cho nút menu
function menuButton() {
    playButtonClick();
    hideModal();
    clearAllInterval();
    clean();
    reset();
    pause = 0;
    modalWin();
    level = 1;
    speed = 800;
    cover.style.display = 'none';
    cover2.style.display = 'none';
    miniCover.style.display = 'none';
    coverPosition = 575;
    coverHeight = 30;

    document.getElementsByClassName('buttonContainerLevel')[0].style.display = 'none';
    document.getElementsByClassName('buttonContainer')[0].style.display = 'flex';
    document.getElementsByClassName('btn-pause')[0].innerHTML = '<i class="fa-solid fa-pause"></i> PAUSE';
    document.getElementsByClassName('mainMenu')[0].style.display = 'flex';
    document.getElementsByClassName('gameBoard')[0].style.display = 'none';
    removeBoard();
    resize20Row();
}

// function cho nút chọn cấp độ
function levelButton() {
    playButtonClick();
    document.getElementsByClassName('buttonContainer')[0].style.display = 'none';
    document.getElementsByClassName('buttonContainerLevel')[0].style.display = 'flex';
}

// function cho nút điều chỉnh âm thanh
function optionButton() {
    playButtonClick();
    document.getElementsByClassName('buttonContainer')[0].style.display = 'none';
    document.getElementsByClassName('buttonContainerOption')[0].style.display = 'flex';
}

// function cho nút âm nhạc
function musicOption() {
    playButtonClick();
    let musicButton = document.getElementById('music');
    if (musicToggle) {
        music.pause();
        musicToggle = false;
        musicCondition = false;
        musicButton.innerHTML = 'MUSIC: OFF';
    } else {
        music.currentTime = 0;
        music.play();
        musicToggle = true;
        musicCondition = true;
        musicButton.innerHTML = 'MUSIC: ON';

    }
}

// function cho nút hiệu ứng âm thanh
function soundOption() {
    playButtonClick();
    let soundButton = document.getElementById('sound');
    if (sound == true) {
        soundButton.innerHTML = 'SOUND: OFF';
        sound = false;
    } else {
        soundButton.innerHTML = 'SOUND: ON';
        sound = true;
    }
}

// function cho nút trở về trong khi chọn level
function backButton() {
    playButtonClick();

    document.getElementsByClassName('buttonContainerLevel')[0].style.display = 'none';
    document.getElementsByClassName('buttonContainerOption')[0].style.display = 'none';
    document.getElementsByClassName('buttonContainer')[0].style.display = 'flex';

}

// kiểm tra nếu đủ điểm thì show modal để chuyển level or chơi lại
function checkLevel() {
    if (level < 3) {
        if (score == 100) {
            playNextLevel();
            clearAllInterval();
            level += 1;
            modalWin();
            showModal();
        }
    } else if (level == 3 || level == 4) {
        if (score == 150) {
            playNextLevel();
            clearAllInterval();
            level += 1;
            modalWin();
            showModal();

        }
    } else if (level == 5) {
        if (score == 200) {
            playNextLevel();
            clearAllInterval();
            level += 1;
            modalWin();
            showModal();

        }
    } else if (level == 6) {
        if (score == 200) {
            playNextLevel();
            clearAllInterval();
            level += 1;
            modalFinish();
            showModal();

        }
    }

}

// hiện modal
function showModal() {
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modalContent.style.visibility = 'visible';
    modalContent.style.transform = 'scale(1)';
    modalContent.style.opacity = '1';
}

// ẩn modal
function hideModal() {
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
    modalContent.style.visibility = 'hidden';
    modalContent.style.transform = 'scale(.5)';
    modalContent.style.opacity = '0';
}

// function cho nút chơi lại
function again() {
    playButtonClick();
    clearAllInterval();
    hideModal();
    if (level <= 7) {
        level -= 1;
    }
    clean();
    reset();
    pause = 0;
    gameLoop();
    switch (level) {
        case 3:
            runCoverInterval = setInterval(runCover, 4000);
            break;
        case 4:
            randomRemoveInterval = setInterval(randomRemove, 5000);
            break;
        case 6:
            runCoverInterval = setInterval(runCover, 2000);
            randomRemoveInterval = setInterval(randomRemove, 10000);
            break;
    }
}

// function chuyển sang level mới
function nextLevel() {
    clearAllInterval();
    hideModal();
    clean();
    reset();
    pause = 0;
    cover.style.display = 'none';
    cover2.style.display = 'none';
    coverPosition = 575;
    removeBoard();
    switch (level) {
        case 2:
            level2();
            break;
        case 3:
            level3();
            break;
        case 4:
            level4();
            break;
        case 5:
            level5();
            break;
        case 6:
            level6();
            break;

    }
}

// function chạy màn che
function runCover() {
    if (level > 3) {
        if (cover.style.marginTop == (30 * 8 + 80) + 'px') {
            coverPosition = 530 - coverHeight;
        } else {
            coverPosition -= 30;
        }
    } else {
        if (cover.style.marginTop == (30 * 13 + 5) + 'px') {
            coverPosition = 605 - coverHeight;
        } else {
            coverPosition -= 30;
        }
    }

    cover.style.marginTop = coverPosition + 'px';
}

// hiện màn che
function showCover(coverName, coverHeightNum, CoverPosition) {
    coverName.style.display = 'block';
    coverName.style.height = coverHeightNum + 'px';
    coverName.style.marginTop = CoverPosition + 'px';
}

// chuyển bảng chơi còn 15 hàng
function resize15Row() {
    row = 15;
    gameBoard.style.height = '450px';
    gameBoard.style.marginTop = '75px';
}

// chuyển màn chơi về lại 20 hàng
function resize20Row() {
    row = 20;
    gameBoard.style.height = '600px';
    gameBoard.style.marginTop = '0';
}

// xóa bảng
function removeBoard() {
    gameBoard.innerHTML = '';
}

// random xóa một ô nào đó trong bảng
function randomRemove() {
    let checkedArr = [];
    let checkIndex = 0;
    for (let i = 1; i < row + 1; i++) {
        for (let j = 1; j < col + 1; j++) {
            if (document.getElementsByClassName('cell-' + i + '-' + j)[0].classList.contains('checked')) {
                checkedArr[checkIndex] = [i, j];
                checkIndex++;
            }
        }
    }
    let randomRemoveIndex = [parseInt(Math.random() * (checkIndex - 1))];
    document.getElementsByClassName('cell-' + checkedArr[randomRemoveIndex][0] + '-' + checkedArr[randomRemoveIndex][1])[0].classList.remove('checked');
    for (let i = 0; i < color.length; i++) {
        document.getElementsByClassName('cell-' + checkedArr[randomRemoveIndex][0] + '-' + checkedArr[randomRemoveIndex][1])[0].classList.remove('checked' + color[i]);
    }
}

// level 2
function level2() {
    level = 2;
    speed = 600;
    coverHeight = 120;
    coverPosition = 605 - coverHeight;
    playButton();
    showCover(cover, coverHeight, coverPosition);
    cover.style.animation = 'fadeLowLevel 7s linear forwards infinite';
    miniCover.style.display = 'none';
}

// level 3
function level3() {
    level = 3;
    speed = 600;
    coverHeight = 150;
    coverPosition = 605 - coverHeight
    playButton();
    showCover(cover, coverHeight, coverPosition);
    cover.style.animation = 'fadeLowLevel 7s linear forwards infinite';
    miniCover.style.display = 'none';
    runCoverInterval = setInterval(runCover, 4000);

}

// level 4
function level4() {
    level = 4;
    speed = 400;
    coverHeight = 120;
    coverPosition = 605 - coverHeight;
    playButton();
    showCover(cover, coverHeight, coverPosition);
    showCover(cover2, coverHeight, coverPosition - (coverHeight * 3));
    cover.style.animation = 'fadeLowLevel 3s linear forwards infinite';
    cover2.style.animation = 'fadeLowLevel 3s linear forwards infinite';
    miniCover.style.display = 'block';
    randomRemoveInterval = setInterval(randomRemove, 5000);
}

// level 5
function level5() {
    resize15Row();
    level = 5;
    speed = 250;
    coverHeight = 120;
    coverPosition = 530 - coverHeight;
    playButton();
    showCover(cover, coverHeight, coverPosition);
    showCover(cover2, coverHeight, coverPosition - (coverHeight * 2));
    cover.style.animation = 'fadeinout 3s linear forwards infinite';
    cover2.style.animation = 'fadeinout 3s linear forwards infinite';
    miniCover.style.display = 'block';

}

// level 6
function level6() {
    resize15Row();
    level = 6;
    speed = 200;
    coverHeight = 120;
    coverPosition = 530 - coverHeight;
    playButton();
    showCover(cover, coverHeight, coverPosition);
    showCover(cover2, coverHeight, coverPosition - coverHeight * 2 - 30);
    cover.style.animation = 'fadeinout 3s linear forwards infinite';
    cover2.style.animation = 'fadeinout 3s linear forwards infinite';
    runCoverInterval = setInterval(runCover, 2000);
    miniCover.style.display = 'block';
    randomRemoveInterval = setInterval(randomRemove, 10000);

}