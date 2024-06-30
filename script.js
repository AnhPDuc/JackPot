
var container = document.getElementById("jackpot");
function NumberTable() {

}
function getNumberTable() {
}
function RandomAll() {

}
function createMultiveTable() { }
class TableJack {
    getNumber() { }
    getLuckyNumber() { }
    getRandom() { }
    createTable() { }
    createTableLucky() { }
    createRandomNumber() { }
    createLine() { }
    getRandomNoLoop() { }
    constructor(STT) {
        this.STT = STT
        this.tagTable = document.createElement("table");
        this.tagTable.classList.add('jackpot')
        this.createRandomNumber();
        this.createTable(14, 5);
        this.createLine();
        this.createTableLucky(5, 5);

        container.appendChild(this.tagTable);
        this.arr = new Set()//Lưu trữ mảng 5 số đầu tiên
        this.Number_Lucky = 1//Lưu trữ số cuối cùng
        this.elements = document.querySelectorAll(".button");//Tất cả các button
        //console.log(elements)
        this.element_Lucky = document.querySelectorAll(".Lucky_button");//Tất cả các button
        //console.log(element_Lucky)
        this.default_color = this.elements[0].style.backgroundColor//Lấy màu mặc định
        this.choose_color = "red"//Màu cho ô được chọn
    }


    createTable(countRow, countColumn) {
        for (var i = 0; i < countRow; i++) {
            var tagRow = document.createElement("tr");
            for (var j = 0; j < countColumn; j++) {
                var tagColumn = document.createElement("td");
                var tagButton = document.createElement("button");
                let isNumber = i * 5 + j + 1
                tagButton.textContent = isNumber
                tagButton.classList.add('button')
                tagButton.onclick = () => {
                    this.getNumber(isNumber)
                }
                tagColumn.appendChild(tagButton);
                tagRow.appendChild(tagColumn);
            }
            this.tagTable.appendChild(tagRow);
        }
    }
    createTableLucky(countRow, countColumn) {
        for (var i = 0; i < countRow; i++) {
            var tagRow = document.createElement("tr");
            for (var j = 0; j < countColumn; j++) {
                var tagColumn = document.createElement("td");
                var tagButton = document.createElement("button");
                let isNumber = i * 5 + j + 1
                tagButton.textContent = isNumber
                tagButton.classList.add('Lucky_button')
                tagButton.onclick = () => {
                    this.getLuckyNumber(isNumber)
                }
                tagColumn.appendChild(tagButton);
                tagRow.appendChild(tagColumn);
            }
            this.tagTable.appendChild(tagRow);
        }
    }
    createRandomNumber() {
        var tagRow = document.createElement("tr");
        var tagColumn = document.createElement("td");
        tagColumn.colSpan = 5
        var tagButton = document.createElement("button");
        tagButton.textContent = "RandomNumber"
        tagButton.classList.add('random_button')
        tagButton.onclick = () => {
            this.getRandom()
        }
        tagColumn.appendChild(tagButton);
        tagRow.appendChild(tagColumn);
        this.tagTable.appendChild(tagRow);
    }
    createLine() {
        var tagRow = document.createElement("tr");
        var tagColumn = document.createElement("td");
        tagColumn.colSpan = 5
        tagColumn.classList.add('line')
        tagRow.appendChild(tagColumn);
        this.tagTable.appendChild(tagRow);
    }



    Paint(position) {//Tô màu
        this.elements[position + this.STT * 70].style.backgroundColor = this.choose_color;
    }
    RemoveColor(position) {//Xóa màu
        this.elements[position + this.STT * 70].style.backgroundColor = this.default_color;
    }
    getNumber(isNumber) {//Hàm chọn số theo ý
        this.arr.add(isNumber);//Thêm số được chọn
        this.Paint(isNumber - 1);//Tô màu số được chọn
        if (this.arr.size > 5) {
            let frist_number = this.arr.values().next().value;//Lấy giá trị số đầu tiên
            this.RemoveColor(frist_number - 1)//Xóa màu số đầu tiên
            this.arr.delete(frist_number)//Xóa số đầu tiên khỏi mảng
        }
        console.log(this.arr)
    }
    getLuckyNumber(isNumber) {
        this.element_Lucky[this.Number_Lucky - 1 + this.STT * 25].style.backgroundColor = this.default_color;
        this.Number_Lucky = isNumber;
        this.element_Lucky[this.Number_Lucky - 1 + this.STT * 25].style.backgroundColor = this.choose_color;
    }
    getRandomNoLoop() {
        for (let value of this.arr) {
            this.RemoveColor(value - 1);
        }
        this.arr.clear()
        while (this.arr.size < 5) {
            let randomNumber = Math.floor(Math.random() * (70)) + 1;
            if (!this.arr.has(randomNumber)) {

                this.arr.add(randomNumber);
                this.Paint(randomNumber - 1)
            }
        }

        this.element_Lucky[this.Number_Lucky - 1 + this.STT * 25].style.backgroundColor = this.default_color;
        this.Number_Lucky = Math.floor(Math.random() * (25)) + 1;
        this.element_Lucky[this.Number_Lucky - 1 + this.STT * 25].style.backgroundColor = this.choose_color;
        //console.log(arr)
    }
    getRandom() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.getRandomNoLoop();
            }, 25 * i);
        }
    }

}

var Table = [];
var NowNumberTable = 0;
getNumberTable(3);

function createMultiveTable() {
    var Mul = document.getElementById("Mul");
    if (isNaN(Mul.value) || Mul.value < NowNumberTable)
        return;
    if (Mul.value > 1000) {
        alert("Số lượng quá lớn");
        return;
    }
    getNumberTable(Mul.value);
}
function getNumberTable(NumberTable) {
    while (NowNumberTable > NumberTable) {
        container.removeChild(container.lastChild);
        NowNumberTable -= 1;
    }
    while (NowNumberTable < NumberTable) {
        Table[NowNumberTable] = new TableJack(NowNumberTable);
        NowNumberTable += 1;
    }
}
function RandomAll() {
    for (let value of Table) {
        value.getRandom();
    }
}