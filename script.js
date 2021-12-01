
document.addEventListener('keydown', function(event) {
    movement(event.key)
});




function motion(start_box, i, j, x, y, mov) {

    next_box = document.getElementById(toCoordinate(i+x, j+y))
    box = document.getElementById(toCoordinate(i, j))


    if (!exists(next_box)) {

        if (start_box.id !== box.id) {
            box.innerHTML = start_box.innerHTML
            start_box.innerHTML = null
            return mov
        } else {
            return mov
        }

    }

    if (!isEmpty(next_box)) {

        if (next_box.innerHTML === start_box.innerHTML) {
            next_box.innerHTML = (parseInt(start_box.innerHTML)*2).toString()
            start_box.innerHTML = null
            return mov

        } else {

            if (start_box.innerHTML !== box.innerHTML) {
                box.innerHTML = start_box.innerHTML
                start_box.innerHTML = null
                return mov
            } else {
                return mov
            }


        }

    }


    return motion(start_box, i + x, j + y, x, y, mov+1)

}




function motionDirection(x, y) {

    somme = 0

    for (let i = dep(x); i != arr(x); i = i + incr(x)) {


        for (let j = dep(y); j != arr(y); j = j + incr(y)) {

            box = document.getElementById(toCoordinate(i, j))

            if (!isEmpty(box)) {

                somme += motion(box, i, j, x, y, 0)
            }
            
            

        }

    }
    if (somme !== 0) {
        randomSpawn(1)
    }
}


function movement(key) {



    if (key === 'z') {
        motionDirection(0, -1)
    } else if (key === 'q') {
        motionDirection(-1, 0)
    } else if (key === 's') {
        motionDirection(0, 1)
    } else if (key === 'd') {
        motionDirection(1, 0)
    }
    colorGrid()
}



function randomSpawn(n) {

    validbox = valid()


    for (let i = 0; i < n; i++) {

        if (random(2) === 0) {
            value = 2
        } else {
            value = 4
        }

        try {
            document.getElementById(validbox[random(validbox.length)]).innerHTML = value
        } catch {
            alert("Vous avez perdu")
        }
        

    }
    colorGrid()
}

function colorGrid() {


    var colors = {"2": "#EEE4DA", "4": "#ECE0C9", "8": "#F5AE77", "16": "#EC8D52", "32": "#F67D60", "64": "#E95938", "128": "#F5D86A", "256": "#F5D86A", "512": "#F5D86A", "1024": "#F5D86A", "2048": "#F5D86A"}

    for (let x = 0; x <= 3; x++ ) {

        for (let y = 0; y <= 3; y++ ) {

            var box = document.getElementById(toCoordinate(x, y))

            if (isEmpty(box)) {
                box.style.background = "#CCC0B2"
            } else {
                box.style.background = colors[box.innerHTML] 
            }
        
        }

    }

}

//Fonction utilitaire

function toCoordinate (x, y) {

    return x.toString() + y.toString()

}

function random(n) {
    return Math.floor(Math.random() * n)
}

function isEmpty(element) {

    return (element.innerHTML == 0)

}

function exists(element) {

    return element != null
}
  

function dep(n) {

    if (n === 0) {
        return 0
    }
    return 1.5*n+1.5

}

function arr(n) {

    if (n === 0) {
        return 4
    }
    return -2.5*n+1.5
}

function incr(n) {

    if (n === 0) {
        return 1
    }
    return -n
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function valid() {

    var validbox = Array()

    for (let x = 0; x <= 3; x++ ) {

        for (let y = 0; y <= 3; y++ ) {

            box = document.getElementById(toCoordinate(x, y))

            if (isEmpty(box)) {
                validbox.unshift(box.id)
                    
            }
        }
    }
    return validbox
}