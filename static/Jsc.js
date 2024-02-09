function myfunction() {
    let grid = new Array(9).fill(0).map(() => new Array(9).fill(0))
    let index = 0;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            temp = i +''+j;
            grid[i][j] = parseInt(document.getElementById(temp).value);
            index++;
        }
    }

    const replaced_grid = grid.map(row => row.map(val => val === null ? 0 : val));
    console.log(replaced_grid);

    const s = JSON.stringify(replaced_grid);

    $.ajax({
        url:"http://127.0.0.1:5000/test",
        type:"POST",
        contentType: "application/json",
        data: s,
        success: function(response) {
            const solution = response.solution;
            console.log('Hello World');
            console.log(solution);
            index = 0;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    temp = i +''+j;
                    document.getElementById(temp).value = solution[i][j];
                    index++;
                }
            }
        }
    });
}
