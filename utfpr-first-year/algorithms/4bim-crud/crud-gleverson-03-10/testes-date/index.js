function dateTest()
{
    let dataArray;
    let data = document.getElementById("dateInput");

    // [0] = yy, [1] = mm, [2] = dd
    dataArray = data.value.split("-");

    console.log(data.value);
    final = dataArray.reverse();

    console.log(final);
}